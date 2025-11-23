import { Home, Search, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Home className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Cedric House Planning</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/house-plans" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            House Plans
          </Link>
          <Link to="/built-homes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Built Homes
          </Link>
          <Link to="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Heart className="h-5 w-5" />
          </Button>
          <Link to="/get-quote">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Get FREE Quote Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
