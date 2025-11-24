import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  hasFiles: boolean;
}

const FileUpload = ({ onFilesSelected, hasFiles }: FileUploadProps) => {
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
  );
};

export default FileUpload;
