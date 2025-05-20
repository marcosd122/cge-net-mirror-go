
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';
import NewsSection from '@/components/NewsSection';
import WelcomeMessage from '@/components/WelcomeMessage';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="gov-container pt-8">
          <WelcomeMessage />
        </div>
        <ServicesSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
