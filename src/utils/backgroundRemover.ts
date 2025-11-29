import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to always download models
env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_IMAGE_DIMENSION = 1024;

export type BackgroundColor = 'transparent' | 'white' | 'black' | 'custom';
export type OutputFormat = 'png' | 'jpg' | 'webp';

export interface ProcessedImage {
  originalUrl: string;
  processedUrl: string;
  processedBlob: Blob;
  originalSize: number;
  processedSize: number;
  width: number;
  height: number;
}

let segmenterInstance: any = null;

export const loadSegmenter = async (onProgress?: (progress: number) => void) => {
  if (segmenterInstance) {
    onProgress?.(100);
    return segmenterInstance;
  }
  
  onProgress?.(10);
  
  try {
    segmenterInstance = await pipeline(
      'image-segmentation',
      'Xenova/segformer-b0-finetuned-ade-512-512',
      {
        device: 'webgpu',
        progress_callback: (data: any) => {
          if (data.progress) {
            onProgress?.(Math.min(90, 10 + data.progress * 0.8));
          }
        }
      }
    );
  } catch (e) {
    // Fallback to CPU if WebGPU not available
    segmenterInstance = await pipeline(
      'image-segmentation',
      'Xenova/segformer-b0-finetuned-ade-512-512',
      {
        progress_callback: (data: any) => {
          if (data.progress) {
            onProgress?.(Math.min(90, 10 + data.progress * 0.8));
          }
        }
      }
    );
  }
  
  onProgress?.(100);
  return segmenterInstance;
};

function resizeImageIfNeeded(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement
): { width: number; height: number; wasResized: boolean } {
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  let wasResized = false;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }
    wasResized = true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);
  
  return { width, height, wasResized };
}

export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const removeBackground = async (
  imageElement: HTMLImageElement,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  try {
    onProgress?.(5);
    
    const segmenter = await loadSegmenter((p) => onProgress?.(5 + p * 0.4));
    
    onProgress?.(50);
    
    // Convert HTMLImageElement to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize image if needed and draw it to canvas
    resizeImageIfNeeded(canvas, ctx, imageElement);
    
    onProgress?.(55);
    
    // Get image data as base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    onProgress?.(60);
    
    // Process the image with the segmentation model
    const result = await segmenter(imageData);
    
    onProgress?.(80);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    // Create a new canvas for the masked image
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw original image
    outputCtx.drawImage(canvas, 0, 0);
    
    // Apply the mask
    const outputImageData = outputCtx.getImageData(
      0, 0,
      outputCanvas.width,
      outputCanvas.height
    );
    const data = outputImageData.data;
    
    // Apply inverted mask to alpha channel
    for (let i = 0; i < result[0].mask.data.length; i++) {
      // Invert the mask value (1 - value) to keep the subject instead of the background
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    
    onProgress?.(95);
    
    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          onProgress?.(100);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export const applyBackground = async (
  transparentBlob: Blob,
  backgroundColor: BackgroundColor,
  customColor?: string,
  backgroundImage?: string
): Promise<Blob> => {
  const img = new Image();
  const url = URL.createObjectURL(transparentBlob);
  
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load processed image'));
    img.src = url;
  });
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Could not get canvas context');
  
  // Apply background
  if (backgroundImage) {
    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      bgImg.onload = () => resolve();
      bgImg.onerror = () => reject(new Error('Failed to load background image'));
      bgImg.src = backgroundImage;
    });
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  } else if (backgroundColor !== 'transparent') {
    let fillColor = 'white';
    if (backgroundColor === 'black') fillColor = '#000000';
    else if (backgroundColor === 'white') fillColor = '#FFFFFF';
    else if (backgroundColor === 'custom' && customColor) fillColor = customColor;
    
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // Draw the transparent image on top
  ctx.drawImage(img, 0, 0);
  
  URL.revokeObjectURL(url);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      },
      backgroundColor === 'transparent' ? 'image/png' : 'image/png',
      1.0
    );
  });
};

export const convertToFormat = async (
  blob: Blob,
  format: OutputFormat,
  hasTransparency: boolean
): Promise<Blob> => {
  const img = new Image();
  const url = URL.createObjectURL(blob);
  
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Could not get canvas context');
  
  // For JPG, add white background since it doesn't support transparency
  if (format === 'jpg' && hasTransparency) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  ctx.drawImage(img, 0, 0);
  URL.revokeObjectURL(url);
  
  const mimeTypes: Record<OutputFormat, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    webp: 'image/webp'
  };
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to convert format'));
      },
      mimeTypes[format],
      format === 'jpg' ? 0.9 : 1.0
    );
  });
};

export const downloadImage = (blob: Blob, filename: string, format: OutputFormat): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_no_bg.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
};
