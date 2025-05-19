
import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-gov-blue-dark hover:text-white">
                    Sobre
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-4 w-[200px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/sobre" className="block p-2 hover:bg-muted rounded-md">
                            Quem Somos
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/legislacao" className="block p-2 hover:bg-muted rounded-md">
                            Legislação
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-gov-blue-dark hover:text-white">
                    Serviços
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-4 w-[200px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/documentos" className="block p-2 hover:bg-muted rounded-md">
                            Documentos
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/consultas" className="block p-2 hover:bg-muted rounded-md">
                            Consultas
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/transparencia" className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2",
                    "text-white hover:bg-gov-blue-dark hover:text-white focus:bg-gov-blue-dark"
                  )}>
                    Transparência
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contato" className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2",
                    "text-white hover:bg-gov-blue-dark hover:text-white focus:bg-gov-blue-dark"
                  )}>
                    Contato
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          
          {/* Login Button */}
          <div className="hidden md:block">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gov-blue">
              <Link to="/login">Acessar</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link to="/sobre" className="py-2 px-4 hover:bg-gov-blue-dark rounded">Sobre</Link>
              <Link to="/documentos" className="py-2 px-4 hover:bg-gov-blue-dark rounded">Documentos</Link>
              <Link to="/consultas" className="py-2 px-4 hover:bg-gov-blue-dark rounded">Consultas</Link>
              <Link to="/transparencia" className="py-2 px-4 hover:bg-gov-blue-dark rounded">Transparência</Link>
              <Link to="/contato" className="py-2 px-4 hover:bg-gov-blue-dark rounded">Contato</Link>
              <Link to="/login" className="py-2 px-4 bg-white text-gov-blue rounded text-center">Acessar</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
