import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Cpu, Shield, Palette } from "lucide-react";

const BackgroundRemoverFAQSection = () => {
  const faqs = [
    {
      question: "Is this background remover free?",
      answer:
        "Yes, our AI background remover is 100% free to use. There are no hidden fees, no signup required, and no limits on the number of images you can process. Use it as many times as you need!",
    },
    {
      question: "Does it support JPG and PNG?",
      answer:
        "Yes, our tool supports all common image formats including JPG, JPEG, PNG, and WebP. You can also download your processed images in any of these formats based on your needs.",
    },
    {
      question: "Will the image quality remain high?",
      answer:
        "Our AI-powered background remover maintains high image quality while precisely removing backgrounds. The output is optimized for both web and print use, preserving details and edges.",
    },
    {
      question: "Are my images stored?",
      answer:
        "No, all processing happens directly in your browser using AI. Your images are never uploaded to our servers, ensuring complete privacy and security. Once you close the page, all data is gone.",
    },
    {
      question: "Can I add a new background?",
      answer:
        "Yes! After removing the background, you can add a solid color background (white, black, or any custom color of your choice) or keep it transparent for use in design projects.",
    },
    {
      question: "How does the AI background remover work?",
      answer:
        "Our tool uses advanced machine learning models that run directly in your browser. The AI analyzes your image to identify the subject and separates it from the background with precision.",
    },
  ];

  const relatedTools = [
    { to: "/compress-image", label: "Image Compressor" },
    { to: "/jpg-to-pdf", label: "JPG to PDF" },
    { to: "/pdf-to-jpg", label: "PDF to JPG" },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Use Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6 text-center">
            Why Use Our AI Background Remover?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced machine learning precisely detects and removes backgrounds automatically.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens in your browser. Your images never leave your device.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Customizable</h3>
              <p className="text-sm text-muted-foreground">
                Add custom backgrounds, choose output formats, and download in high quality.
              </p>
            </div>
          </div>
        </div>

        {/* How To Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6 text-center">
            How to Remove Image Background?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                1
              </div>
              <h3 className="font-semibold text-foreground mb-2">Upload Image</h3>
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to select a JPG, PNG, or WebP image.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                2
              </div>
              <h3 className="font-semibold text-foreground mb-2">Remove Background</h3>
              <p className="text-sm text-muted-foreground">
                Click the button and let our AI remove the background instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                3
              </div>
              <h3 className="font-semibold text-foreground mb-2">Download</h3>
              <p className="text-sm text-muted-foreground">
                Choose your background and format, then download your image.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              FAQs
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-card"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Related Tools */}
        <div>
          <h2 className="text-xl font-display font-bold text-foreground mb-6 text-center">
            Related Tools
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
              >
                <span className="text-sm font-medium text-foreground">{tool.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundRemoverFAQSection;
