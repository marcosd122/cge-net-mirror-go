
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-slate-50">
        <div className="gov-container py-8">
          <div className="max-w-4xl mx-auto bg-white p-8 shadow-sm rounded-md">
            <h1 className="text-3xl font-bold text-gov-blue mb-6">Aviso de Privacidade</h1>
            
            <section className="mb-6">
              <p className="mb-4">
                A Controladoria Geral do Estado de Rondônia (CGE/RO) considera de extrema relevância os registros eletrônicos e dados pessoais deixados por você ("Usuário") na utilização dos diversos serviços disponíveis neste portal, servindo o presente Aviso de Privacidade ("Aviso") para regular, de forma simples, transparente e objetiva, quais dados e informações serão obtidos, assim como quando e de qual forma eles poderão ser utilizados.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gov-blue mb-3">1. Quais dados são coletados?</h2>
              <p className="mb-3">
                O portal poderá coletar as informações inseridas ativamente pelo Usuário no momento do cadastro e outros dados coletados automaticamente quando da utilização dos portais e serviços, como funcionalidades acessadas, horários de acesso, entre outras informações.
              </p>
              <p className="mb-3">
                As informações coletadas poderão incluir dados pessoais:
              </p>
              <ul className="list-disc pl-8 mb-3 space-y-1">
                <li>Dados cadastrais: nome completo, e-mail, CPF, etc.</li>
                <li>Dados de navegação: endereço IP, localização geográfica, fonte de referência, tipo de navegador, duração da visita e páginas visitadas.</li>
                <li>Cookies: pequenos arquivos enviados pelos portais, salvos nos seus dispositivos, que armazenam as preferências e outras informações, a fim de personalizar sua navegação.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gov-blue mb-3">2. Para que utilizamos os dados?</h2>
              <p className="mb-3">
                Os dados pessoais coletados poderão ser utilizados para as seguintes finalidades:
              </p>
              <ul className="list-disc pl-8 mb-3 space-y-1">
                <li>Identificação e autenticação do Usuário;</li>
                <li>Atendimento de solicitações e dúvidas;</li>
                <li>Cumprimento de obrigações legais e regulatórias;</li>
                <li>Melhoria dos serviços prestados;</li>
                <li>Pesquisas de satisfação;</li>
                <li>Fins estatísticos e de segurança.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gov-blue mb-3">3. Como os dados são armazenados?</h2>
              <p className="mb-3">
                Os dados coletados estarão armazenados em ambiente seguro e controlado. No entanto, é importante que o Usuário tenha ciência de que nenhuma transmissão de informações pela internet possui garantia completa de segurança.
              </p>
              <p>
                Os dados pessoais serão mantidos pelo período necessário para as finalidades apresentadas nos Termos de Uso e Política de Privacidade, respeitando o período de retenção de dados determinado pela legislação aplicável.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gov-blue mb-3">4. Seus direitos como titular dos dados</h2>
              <p className="mb-3">
                Em cumprimento à Lei Geral de Proteção de Dados (Lei nº 13.709/2018), o Usuário pode entrar em contato através dos canais disponibilizados neste portal para:
              </p>
              <ul className="list-disc pl-8 mb-3 space-y-1">
                <li>Confirmar a existência de tratamento de dados pessoais;</li>
                <li>Acessar os seus dados pessoais;</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
                <li>Solicitar a portabilidade dos dados a outro fornecedor de serviço ou produto;</li>
                <li>Revogar o consentimento para o tratamento dos seus dados pessoais.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gov-blue mb-3">5. Alterações no Aviso de Privacidade</h2>
              <p className="mb-3">
                A CGE/RO poderá atualizar este Aviso de Privacidade a qualquer momento, mediante comunicação aos usuários por meio dos canais oficiais.
              </p>
              <p>
                Este Aviso de Privacidade foi atualizado pela última vez em maio de 2025.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
