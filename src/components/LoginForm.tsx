
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an authentication API
    
    if (user && password) {
      toast.info("Função de login não implementada nesta versão de demonstração.", {
        description: "Esta é uma versão de demonstração do portal CGENet.",
      });
    } else {
      toast.error("Por favor preencha todos os campos.", {
        description: "Usuário e senha são obrigatórios.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gov-blue text-white rounded-t-lg">
        <CardTitle className="text-center text-2xl">Área Restrita</CardTitle>
        <CardDescription className="text-white/80 text-center">
          Acesse o sistema com suas credenciais
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user">CPF ou Usuário</Label>
              <Input
                id="user"
                placeholder="Digite seu CPF ou usuário"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link to="/esqueci-senha" className="text-sm text-gov-blue hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-6 bg-gov-blue hover:bg-gov-blue-dark">
            Entrar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center">
        <div className="text-sm text-muted-foreground">
          Não tem cadastro?{" "}
          <Link to="/registrar" className="text-gov-blue hover:underline">
            Cadastre-se
          </Link>
        </div>
        <div>
          <Link to="/suporte" className="text-sm text-gov-blue hover:underline block">
            Suporte Técnico
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
