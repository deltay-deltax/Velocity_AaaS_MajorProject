const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display text-lg font-bold">
          <span className="gradient-text">Velocity</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 Velocity. Built with ❤️ in India.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
