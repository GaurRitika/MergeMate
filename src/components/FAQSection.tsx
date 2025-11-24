import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is it really free to merge PDF files?",
    answer: "Yes! Our PDF merger is completely free with no hidden costs, no subscription fees, and no file limits. You can merge as many PDFs as you need, whenever you need.",
  },
  {
    question: "How does the PDF merging process work?",
    answer: "Simply upload your PDF files using drag-and-drop or file selection, arrange them in your desired order, and click 'Merge PDF'. The files are combined locally in your browser using advanced PDF processing technology, ensuring speed and security.",
  },
  {
    question: "Are my PDF files secure and private?",
    answer: "Absolutely! All PDF merging happens directly in your browser. Your files never leave your device or get uploaded to any server. This means complete privacy and security for your sensitive documents.",
  },
  {
    question: "Is there a file size limit for PDF merging?",
    answer: "There's no strict file size limit, but performance depends on your device's capabilities. Modern browsers can handle PDFs up to several hundred megabytes efficiently. For very large files, processing may take a bit longer.",
  },
  {
    question: "Can I reorder my PDFs before merging?",
    answer: "Yes! After uploading your files, you can easily drag and drop them to arrange the order. The final merged PDF will follow the exact sequence you set.",
  },
  {
    question: "What file formats are supported?",
    answer: "Currently, we support PDF files only. If you have documents in other formats (Word, Excel, images), you'll need to convert them to PDF first before merging.",
  },
  {
    question: "Will there be watermarks on my merged PDF?",
    answer: "No watermarks, ever! Your merged PDF will be clean and professional, ready for any use without any branding or markings from our tool.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account needed! You can start merging PDFs immediately without any signup process. We believe in making tools accessible to everyone without barriers.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about merging PDFs online
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 shadow-card"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
