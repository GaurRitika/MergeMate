import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackgroundRemoverHeroSection from "@/components/BackgroundRemoverHeroSection";
import BackgroundRemoverFileUpload from "@/components/BackgroundRemoverFileUpload";
import BackgroundRemoverFAQSection from "@/components/BackgroundRemoverFAQSection";

const BackgroundRemover = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <BackgroundRemoverHeroSection />
        <BackgroundRemoverFileUpload />
        <BackgroundRemoverFAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default BackgroundRemover;
