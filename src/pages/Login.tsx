
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="gov-container">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gov-blue-dark mb-2">Área Restrita</h1>
            <p className="text-gray-600 mb-8">Acesso exclusivo para administradores do sistema</p>
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
