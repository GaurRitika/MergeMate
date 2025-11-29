import { Eraser, Shield, Zap, Download } from "lucide-react";
import { Helmet } from "react-helmet";

const BackgroundRemoverHeroSection = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this background remover free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our AI background remover is 100% free to use. There are no hidden fees, no signup required, and no limits on the number of images you can process."
        }
      },
      {
        "@type": "Question",
        "name": "Does it support JPG and PNG?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our tool supports all common image formats including JPG, JPEG, PNG, and WebP. You can also download your processed images in any of these formats."
        }
      },
      {
        "@type": "Question",
        "name": "Will the image quality remain high?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI-powered background remover maintains high image quality while precisely removing backgrounds. The output is optimized for both web and print use."
        }
      },
      {
        "@type": "Question",
        "name": "Are my images stored?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, all processing happens directly in your browser using AI. Your images are never uploaded to our servers, ensuring complete privacy and security."
        }
      },
      {
        "@type": "Question",
        "name": "Can I add a new background?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! After removing the background, you can add a solid color background (white, black, or custom color) or keep it transparent for use in design projects."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Background Remover — Free AI Tool to Remove Image Background</title>
        <meta 
          name="description" 
          content="Remove background from images online for free using AI. Fast, secure, and high-quality background remover. Download transparent PNG instantly." 
        />
        <meta name="keywords" content="background remover, remove background online, ai background remover, background eraser, free image background removal, transparent background" />
        <link rel="canonical" href="/remove-background" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Eraser className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Background Remover</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-fade-in-up">
            Remove Background from Images{" "}
            <span className="gradient-text">Online</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Instantly remove backgrounds from photos using AI. 
            100% free, accurate, and secure image background remover.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-accent-foreground" />
              <span>Free Download</span>
            </div>
          </div>

          {/* Breadcrumbs for SEO */}
          <nav className="mt-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.3s' }} aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-2">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li>/</li>
              <li><a href="/" className="hover:text-primary transition-colors">Tools</a></li>
              <li>/</li>
              <li className="text-foreground">Background Remover</li>
            </ol>
          </nav>
        </div>
      </section>
    </>
  );
};

export default BackgroundRemoverHeroSection;
