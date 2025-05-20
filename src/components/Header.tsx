
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";
import { format, isWeekend } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAdmin } from '@/contexts/AdminContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { isAdmin, setIsAdmin } = useAdmin();
  const navigate = useNavigate();
  
  // Format date like "sábado, 17 de maio de 2025"
  const currentDate = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  // Capitalize first letter
  const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/');
  };

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
          
          {/* Current Date (Desktop) */}
          <div className="hidden md:flex items-center mr-4">
            <span className="text-sm font-medium">{formattedDate}</span>
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
          
          {/* Login/User Button */}
          <div className="hidden md:flex items-center gap-2">
            {isAdmin ? (
              <>
                <div className="flex items-center gap-2 mr-2 bg-gov-blue-dark/50 py-1 px-3 rounded">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Administrador</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-gov-blue flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </>
            ) : (
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gov-blue">
                <Link to="/login">Acessar</Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation - Simplified */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <div className="flex justify-between items-center py-2 px-4">
                <span className="text-sm font-medium">{formattedDate}</span>
              </div>
              <Link to="/transparencia" className="py-2 px-4 hover:bg-gov-blue-dark rounded">Transparência</Link>
              <Link to="/servicos" className="py-2 px-4 hover:bg-gov-blue-dark rounded">Serviços</Link>
              {isAdmin ? (
                <>
                  <div className="flex items-center gap-2 py-2 px-4">
                    <User className="h-4 w-4" />
                    <span>Administrador</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mx-4 bg-transparent border-white text-white hover:bg-white hover:text-gov-blue flex items-center justify-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </Button>
                </>
              ) : (
                <Link to="/login" className="py-2 px-4 bg-white text-gov-blue rounded text-center">Acessar</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
