const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Free PDF Merger</h3>
            <p className="text-sm text-muted-foreground">
              The easiest way to merge PDF files online for free. Fast, secure, and no signup required.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Popular Searches</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Merge PDF online free</li>
              <li>Combine PDF files</li>
              <li>PDF joiner tool</li>
              <li>Join PDF documents</li>
              <li>Free PDF merger no watermark</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>No file size limits</li>
              <li>100% secure & private</li>
              <li>No watermarks</li>
              <li>Drag & drop interface</li>
              <li>Works on all devices</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Free PDF Merger. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Keywords: merge pdf online free, combine pdf tool, online pdf joiner, pdf merger, join pdf files
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
