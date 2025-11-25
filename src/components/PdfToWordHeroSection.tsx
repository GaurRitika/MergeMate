import { FileText } from "lucide-react";

const PdfToWordHeroSection = () => {
  return (
    <section className="text-center py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 mb-6">
          <FileText className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 tracking-tight">
          PDF to Word Converter — Free & Accurate
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert PDF to editable Word (.docx) files instantly. 100% free, secure & high-quality conversion.
        </p>
      </div>
    </section>
  );
};

export default PdfToWordHeroSection;
