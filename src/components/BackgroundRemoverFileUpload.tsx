import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Download, Loader2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  isValidImageFile,
  loadImage,
  removeBackground,
  applyBackground,
  convertToFormat,
  downloadImage,
  formatFileSize,
  BackgroundColor,
  OutputFormat,
} from "@/utils/backgroundRemover";

const BackgroundRemoverFileUpload = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>("transparent");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, or WebP image.",
        variant: "destructive",
      });
      return;
    }

    // Clear previous state
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (processedUrl) URL.revokeObjectURL(processedUrl);

    const url = URL.createObjectURL(file);
    setOriginalFile(file);
    setOriginalUrl(url);
    setProcessedUrl(null);
    setProcessedBlob(null);
    setProgress(0);
  }, [originalUrl, processedUrl, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: false,
  });

  const handleRemoveBackground = async () => {
    if (!originalFile || !originalUrl) return;

    setIsProcessing(true);
    setProgress(0);
    setProgressText("Loading AI model...");

    try {
      const img = await loadImage(originalFile);
      
      setProgressText("Removing background...");
      const resultBlob = await removeBackground(img, (p) => {
        setProgress(p);
        if (p < 50) setProgressText("Loading AI model...");
        else if (p < 80) setProgressText("Analyzing image...");
        else setProgressText("Finalizing...");
      });

      const url = URL.createObjectURL(resultBlob);
      setProcessedBlob(resultBlob);
      setProcessedUrl(url);

      toast({
        title: "Background removed!",
        description: "Your image is ready to download.",
      });
    } catch (error) {
      console.error("Error removing background:", error);
      toast({
        title: "Processing failed",
        description: "Failed to remove background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(100);
      setProgressText("");
    }
  };

  const handleDownload = async () => {
    if (!processedBlob || !originalFile) return;

    try {
      let finalBlob = processedBlob;

      // Apply background if not transparent
      if (backgroundColor !== "transparent") {
        finalBlob = await applyBackground(
          processedBlob,
          backgroundColor,
          backgroundColor === "custom" ? customColor : undefined
        );
      }

      // Convert to selected format
      finalBlob = await convertToFormat(
        finalBlob,
        outputFormat,
        backgroundColor === "transparent"
      );

      const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
      downloadImage(finalBlob, baseName, outputFormat);

      toast({
        title: "Download started",
        description: `Your image is being downloaded as ${outputFormat.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to prepare image for download.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (processedUrl) URL.revokeObjectURL(processedUrl);
    setOriginalFile(null);
    setOriginalUrl(null);
    setProcessedUrl(null);
    setProcessedBlob(null);
    setProgress(0);
  };

  const backgroundOptions: { value: BackgroundColor; label: string; color?: string }[] = [
    { value: "transparent", label: "Transparent" },
    { value: "white", label: "White", color: "#ffffff" },
    { value: "black", label: "Black", color: "#000000" },
    { value: "custom", label: "Custom" },
  ];

  const formatOptions: { value: OutputFormat; label: string; desc: string }[] = [
    { value: "png", label: "PNG", desc: "Best for transparency" },
    { value: "jpg", label: "JPG", desc: "Smaller file size" },
    { value: "webp", label: "WebP", desc: "Modern & efficient" },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {!originalFile ? (
          /* Upload Area */
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? "border-primary bg-primary/5 shadow-glow"
                : "border-border hover:border-primary/50 hover:bg-accent/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-primary">
                <Upload className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground mb-1">
                  {isDragActive ? "Drop image here" : "Drag & drop an image here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse • JPG, PNG, WebP supported
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Your files are processed instantly and never stored.
            </p>
          </div>
        ) : (
          /* Processing Area */
          <div className="space-y-8 animate-fade-in">
            {/* Header with Reset */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{originalFile.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(originalFile.size)} • {originalFile.type.split("/")[1].toUpperCase()}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <X className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>

            {/* Image Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Original</h3>
                <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted/50">
                  <img
                    src={originalUrl!}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Processed */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Background Removed</h3>
                <div className="relative aspect-square rounded-xl overflow-hidden border border-border" style={{
                  backgroundImage: processedUrl ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3E%3Crect width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3E%3Crect x=\'10\' width=\'10\' height=\'10\' fill=\'%23e0e0e0\'/%3E%3Crect y=\'10\' width=\'10\' height=\'10\' fill=\'%23e0e0e0\'/%3E%3C/svg%3E")' : undefined,
                  backgroundColor: !processedUrl ? 'hsl(var(--muted))' : undefined
                }}>
                  {processedUrl ? (
                    <img
                      src={processedUrl}
                      alt="Processed"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      {isProcessing ? (
                        <div className="text-center space-y-3">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                          <p className="text-sm">{progressText}</p>
                        </div>
                      ) : (
                        <p className="text-sm">Click "Remove Background" to process</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{progressText}</span>
                  <span className="text-foreground font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Action Button - Remove Background */}
            {!processedUrl && !isProcessing && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleRemoveBackground}
                  className="gradient-primary text-primary-foreground shadow-primary hover:shadow-glow transition-all duration-300"
                >
                  Remove Background
                </Button>
              </div>
            )}

            {/* Options & Download */}
            {processedUrl && (
              <div className="space-y-6 p-6 rounded-xl border border-border bg-card">
                {/* Background Options */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Background</h3>
                  <div className="flex flex-wrap gap-2">
                    {backgroundOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setBackgroundColor(option.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                          backgroundColor === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {option.value === "transparent" ? (
                          <div className="w-5 h-5 rounded border border-border" style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 10 10\'%3E%3Crect width=\'5\' height=\'5\' fill=\'%23ccc\'/%3E%3Crect x=\'5\' y=\'5\' width=\'5\' height=\'5\' fill=\'%23ccc\'/%3E%3C/svg%3E")'
                          }} />
                        ) : option.color ? (
                          <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: option.color }} />
                        ) : (
                          <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: customColor }} />
                        )}
                        <span className="text-sm font-medium">{option.label}</span>
                        {backgroundColor === option.value && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    ))}
                  </div>
                  {backgroundColor === "custom" && (
                    <div className="mt-3 flex items-center gap-3">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border border-border"
                      />
                      <span className="text-sm text-muted-foreground">{customColor}</span>
                    </div>
                  )}
                </div>

                {/* Format Options */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Download Format</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {formatOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setOutputFormat(option.value)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          outputFormat === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-semibold text-foreground">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <Button
                  size="lg"
                  onClick={handleDownload}
                  className="w-full gradient-primary text-primary-foreground shadow-primary hover:shadow-glow transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Image
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BackgroundRemoverFileUpload;
