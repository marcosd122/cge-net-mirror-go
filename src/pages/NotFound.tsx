
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gov-blue mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">Página não encontrada</p>
          <p className="text-lg text-gray-500 max-w-md mx-auto mb-8">
            A página que você está procurando não existe ou foi removida.
          </p>
          <Button asChild className="bg-gov-blue hover:bg-gov-blue-dark">
            <Link to="/">Voltar para a Página Inicial</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
