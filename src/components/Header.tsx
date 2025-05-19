
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-gov-blue text-white shadow-md">
      <div className="gov-container py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold mr-2">CGE</span>
              <span className="text-2xl font-light">NET</span>
            </Link>
            <span className="ml-3 hidden md:inline-block text-sm">
              Portal de Transparência de Rondônia
            </span>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-gov-blue-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Login Button */}
          <div className="hidden md:block">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gov-blue">
              <Link to="/login">Acessar</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation - Simplified */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link to="/transparencia" className="py-2 px-4 hover:bg-gov-blue-dark rounded">Transparência</Link>
              <Link to="/servicos" className="py-2 px-4 hover:bg-gov-blue-dark rounded">Serviços</Link>
              <Link to="/login" className="py-2 px-4 bg-white text-gov-blue rounded text-center">Acessar</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
