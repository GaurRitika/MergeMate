import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";

interface PdfToWordFileUploadProps {
  onFilesSelected: (files: File[]) => void;
  hasFiles: boolean;
}

const PdfToWordFileUpload = ({ onFilesSelected, hasFiles }: PdfToWordFileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === "application/pdf");
    if (pdfFiles.length > 0) {
      onFilesSelected(pdfFiles);
    }
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"]
    },
    multiple: true
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-base bg-card
          ${isDragActive 
            ? "border-primary bg-accent" 
            : "border-border hover:border-primary hover:bg-accent/50"
          }
          ${hasFiles ? "mb-8" : ""}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          {isDragActive ? (
            <>
              <FileText className="w-16 h-16 text-primary mb-4" />
              <p className="text-lg font-medium text-primary">Drop your PDF files here</p>
            </>
          ) : (
            <>
              <Upload className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">
                Drag & drop PDF files here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse from your device
              </p>
              <p className="text-xs text-muted-foreground">
                Supports multiple PDF files
              </p>
            </>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Conversion is fast & secure — files are never stored.
      </p>
    </div>
  );
};

export default PdfToWordFileUpload;
