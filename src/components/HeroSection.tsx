import { FileUp } from "lucide-react";

interface HeroSectionProps {
  onFileSelect: () => void;
}

const HeroSection = ({ onFileSelect }: HeroSectionProps) => {
  return (
    <section className="gradient-hero py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <FileUp className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            Merge PDF Files Online – <br className="hidden sm:block" />
            <span className="text-primary">Free & Secure</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Combine multiple PDF documents into one file instantly. No signup required, 
            completely free, and your files stay private on your device.
          </p>
        </div>
        
        <button
          onClick={onFileSelect}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-xl shadow-primary hover:scale-105 transition-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <FileUp className="w-5 h-5 mr-2" />
          Choose PDF Files
        </button>
        
        <p className="mt-4 text-sm text-muted-foreground">
          No file size limits • No watermarks • 100% secure
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
