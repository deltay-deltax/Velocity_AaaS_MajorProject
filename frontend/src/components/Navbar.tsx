import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "The Magic ", href: "#features" },
    { label: "The Process", href: "#how-it-works" },
    { label: "Plans", href: "#pricing" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          <span className="gradient-text">Velocity</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className="hidden lg:flex border-primary/20 text-primary hover:bg-primary/10 hover:text-primary transition-all">
            <Link to="/onboarding">Strategy Flow</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" className="gradient-bg text-primary-foreground border-0" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <a key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" size="sm" className="flex-1" asChild><Link to="/login">Login</Link></Button>
                <Button size="sm" className="flex-1 gradient-bg text-primary-foreground border-0" asChild><Link to="/signup">Sign Up</Link></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
