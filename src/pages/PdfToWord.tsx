import { useState } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PdfToWordHeroSection from "@/components/PdfToWordHeroSection";
import PdfToWordFileUpload from "@/components/PdfToWordFileUpload";
import PdfToWordFAQSection from "@/components/PdfToWordFAQSection";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, X, AlertCircle } from "lucide-react";
import {
  convertPdfToWord,
  downloadWordFile,
  formatFileSize,
} from "@/utils/pdfToWord";

interface FileItem {
  id: string;
  file: File;
  status: 'pending' | 'converting' | 'completed' | 'error';
  blob?: Blob;
  progress: number;
}

const PdfToWord = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    const newFiles: FileItem[] = selectedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending' as const,
      progress: 0,
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    toast({
      title: "Files added",
      description: `${selectedFiles.length} PDF file(s) ready for conversion`,
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const convertAll = async () => {
    setIsConverting(true);
    const pendingFiles = files.filter(f => f.status === 'pending');

    for (const fileItem of pendingFiles) {
      try {
        // Update status to converting
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'converting' as const, progress: 20 }
            : f
        ));

        // Simulate progress
        await new Promise(resolve => setTimeout(resolve, 500));
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id ? { ...f, progress: 50 } : f
        ));

        // Convert PDF to Word
        const blob = await convertPdfToWord(fileItem.file);

        // Update with completed status
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'completed' as const, blob, progress: 100 }
            : f
        ));

        toast({
          title: "Conversion complete",
          description: `${fileItem.file.name} converted successfully`,
        });
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'error' as const, progress: 0 }
            : f
        ));

        toast({
          title: "Conversion failed",
          description: `Failed to convert ${fileItem.file.name}`,
          variant: "destructive",
        });
      }
    }

    setIsConverting(false);
  };

  const handleDownload = (fileItem: FileItem) => {
    if (fileItem.blob) {
      downloadWordFile(fileItem.blob, fileItem.file.name);
      toast({
        title: "Downloaded",
        description: "Word file downloaded successfully",
      });
    }
  };

  const downloadAll = () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.blob);
    completedFiles.forEach(fileItem => {
      if (fileItem.blob) {
        downloadWordFile(fileItem.blob, fileItem.file.name);
      }
    });

    toast({
      title: "Downloaded",
      description: `${completedFiles.length} file(s) downloaded successfully`,
    });
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to Word Converter",
    "description": "Free online PDF to Word converter for instant conversion",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is PDF to Word conversion free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our PDF to Word converter is 100% free with unlimited conversions. No signup required, no hidden fees, and no watermarks."
        }
      },
      {
        "@type": "Question",
        "name": "Will formatting remain the same after conversion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We strive to preserve the original formatting as much as possible. Text content is always preserved accurately."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files safe during conversion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! All conversions happen directly in your browser. Your files never leave your device and are automatically deleted after processing."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>PDF to Word Converter — Free Online Tool (Instant & Accurate)</title>
        <meta
          name="description"
          content="Convert PDF to Word (.docx) online for free. Fast, secure, and accurate PDF to Word converter — no signup required. Works on mobile and desktop."
        />
        <meta
          name="keywords"
          content="pdf to word, convert pdf to docx, free pdf to word converter, online pdf to word, pdf to word online, pdf to doc converter"
        />
        <meta property="og:title" content="PDF to Word Converter — Free Online Tool" />
        <meta
          property="og:description"
          content="Convert PDF to Word (.docx) instantly with our free online tool. Fast, secure, and accurate conversion."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />

        <main className="flex-1">
          <PdfToWordHeroSection />

          <section className="max-w-4xl mx-auto px-4 pb-16">
            <PdfToWordFileUpload 
              onFilesSelected={handleFilesSelected} 
              hasFiles={files.length > 0} 
            />

            {files.length > 0 && (
              <div className="space-y-6 mt-8">
                <div className="space-y-4">
                  {files.map((fileItem) => (
                    <div
                      key={fileItem.id}
                      className="bg-card border border-border rounded-2xl p-6 shadow-card"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {fileItem.file.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(fileItem.file.size)}
                              </p>
                            </div>
                            {fileItem.status === 'pending' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFile(fileItem.id)}
                                className="flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>

                          {fileItem.status === 'converting' && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Converting to Word...
                              </div>
                              <Progress value={fileItem.progress} className="h-2" />
                            </div>
                          )}

                          {fileItem.status === 'completed' && (
                            <Button
                              onClick={() => handleDownload(fileItem)}
                              size="sm"
                              className="mt-2"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Word File
                            </Button>
                          )}

                          {fileItem.status === 'error' && (
                            <div className="flex items-center gap-2 text-sm text-destructive mt-2">
                              <AlertCircle className="w-4 h-4" />
                              Conversion failed
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  {files.some(f => f.status === 'pending') && (
                    <Button
                      onClick={convertAll}
                      disabled={isConverting}
                      className="flex-1 gradient-primary shadow-primary"
                      size="lg"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Convert to Word
                    </Button>
                  )}

                  {files.some(f => f.status === 'completed') && (
                    <Button
                      onClick={downloadAll}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download All ({files.filter(f => f.status === 'completed').length})
                    </Button>
                  )}
                </div>
              </div>
            )}
          </section>

          <section className="bg-accent/30 py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-center text-foreground mb-4">
                Convert PDF to Word Online
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Transform your PDF documents into editable Word files with our free online converter
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                  <h3 className="font-semibold text-foreground mb-2">Instant Conversion</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert PDF to Word in seconds. No waiting, no queues, just instant results.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                  <h3 className="font-semibold text-foreground mb-2">Fully Editable</h3>
                  <p className="text-sm text-muted-foreground">
                    Get .docx files that can be edited in Word, Google Docs, or any word processor.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                  <h3 className="font-semibold text-foreground mb-2">100% Secure</h3>
                  <p className="text-sm text-muted-foreground">
                    Your files never leave your device. Complete privacy and security guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-center text-foreground mb-4">
                Why Use Our PDF to Word Tool?
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                The easiest way to convert PDF documents to editable Word format
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Free & Unlimited</h3>
                  <p className="text-muted-foreground">
                    Convert as many PDFs as you need without any cost. No subscriptions, no hidden fees, 
                    and no watermarks on your converted files.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">No Signup Required</h3>
                  <p className="text-muted-foreground">
                    Start converting immediately without creating an account. Upload, convert, and 
                    download - it's that simple.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Works Everywhere</h3>
                  <p className="text-muted-foreground">
                    Use our converter on any device - desktop, laptop, tablet, or smartphone. 
                    Works on Windows, Mac, Linux, iOS, and Android.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Privacy Protected</h3>
                  <p className="text-muted-foreground">
                    All conversions happen in your browser. We never upload, store, or access 
                    your documents. Your data stays private.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-muted/30 py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-center text-foreground mb-8">
                How to Convert PDF to Word?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Upload PDF</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your PDF file or click to browse
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Convert</h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Convert to Word" and wait a few seconds
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Download</h3>
                  <p className="text-sm text-muted-foreground">
                    Download your editable Word (.docx) file
                  </p>
                </div>
              </div>
            </div>
          </section>

          <PdfToWordFAQSection />

          <section className="bg-card py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Related PDF Tools
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <a href="/merge-pdf">Merge PDF</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/compress-pdf">Compress PDF</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/split-pdf">Split PDF</a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PdfToWord;
