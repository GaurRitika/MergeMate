import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PdfToWordFAQSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-center text-foreground mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left font-medium">
              Is PDF to Word conversion free?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! Our PDF to Word converter is 100% free with unlimited conversions. 
              No signup required, no hidden fees, and no watermarks on your converted files.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left font-medium">
              Will formatting remain the same after conversion?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We strive to preserve the original formatting as much as possible. However, complex 
              layouts, tables, and graphics may require minor adjustments in Word. Text content 
              is always preserved accurately.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left font-medium">
              Are my files safe during conversion?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Absolutely! All conversions happen directly in your browser. Your files never 
              leave your device and are automatically deleted after processing. We don't store 
              or access any of your documents.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left font-medium">
              Can I convert multiple PDFs at once?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! You can upload and convert multiple PDF files simultaneously. Each file will 
              be converted to its own Word document for easy download.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left font-medium">
              What file format do I get after conversion?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Converted files are in .docx format, which is compatible with Microsoft Word 2007 
              and later, as well as Google Docs, LibreOffice, and most other word processors.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left font-medium">
              Is there a file size limit?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              No! Unlike many online converters, we don't impose file size limits. Convert PDFs 
              of any size directly in your browser with no restrictions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left font-medium">
              Can I edit the Word document after conversion?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! That's the main purpose of converting PDF to Word. The output .docx file is 
              fully editable in any word processor, allowing you to modify text, formatting, 
              and layout as needed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default PdfToWordFAQSection;
