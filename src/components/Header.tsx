import { Home, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Cedric House Planning</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#plans" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            House Plans
          </a>
          <a href="#styles" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Styles
          </a>
          <a href="#services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Services
          </a>
          <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Heart className="h-5 w-5" />
          </Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
