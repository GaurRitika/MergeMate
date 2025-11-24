import { Shield, Zap, Download, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "All files are processed locally in your browser. Nothing is uploaded to any server.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Merge multiple PDFs in seconds. No waiting, no processing delays.",
  },
  {
    icon: Download,
    title: "No Watermark",
    description: "Get clean, professional PDFs without any watermarks or branding.",
  },
  {
    icon: Lock,
    title: "No Signup Required",
    description: "Start merging immediately. No account creation or email required.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Why Choose Our PDF Merger?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The fastest, most secure way to combine PDF files online
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-smooth"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
