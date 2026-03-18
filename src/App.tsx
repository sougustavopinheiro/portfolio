import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (projectId: string) => {
    setActiveModal(projectId);
    document.body.classList.add('modal-open');
    window.history.pushState({ modalId: projectId }, '', `#${projectId}`);
  };

  const executeCloseModal = () => {
    setActiveModal(null);
    document.body.classList.remove('modal-open');
  };

  const requestCloseModal = () => {
    if (activeModal) {
      if (window.history.state && window.history.state.modalId) {
        window.history.back();
      } else {
        executeCloseModal();
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (activeModal) {
        executeCloseModal();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        requestCloseModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      requestCloseModal();
    }
  };

  return (
    <div className="scroll-smooth">
      {/* menu de navegação */}
      <nav className="fixed w-full bg-lightbg/90 backdrop-blur-md z-40 border-b border-dark/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="font-heading font-bold text-xl tracking-tight text-dark">Gustavo Pinheiro</a>
            <div className="hidden md:flex space-x-8">
              <a href="#sobre" className="text-dark/70 hover:text-brand transition-colors font-medium">Sobre mim</a>
              <a href="#projetos" className="text-dark/70 hover:text-brand transition-colors font-medium">Projetos</a>
              <a href="#contato" className="text-dark/70 hover:text-brand transition-colors font-medium">Contato</a>
            </div>
            <a href="#projetos" className="md:hidden bg-brand text-white px-4 py-2 rounded-full text-sm font-medium">Ver Projetos</a>
          </div>
        </div>
      </nav>

      {/* introdução */}
      <section className="pt-28 pb-20 md:pt-32 md:pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-dark leading-tight mb-6">
            Traduzindo complexidade em <span className="text-brand">experiências com propósito.</span>
          </h1>
          <p className="text-lg md:text-xl text-dark/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Sou <strong className="text-dark font-semibold">UX Researcher & Service Designer</strong> em formação pela ESDI/UERJ. Com um background único na Música e sólida vivência em Marketing e Comercial, aplico empatia, pensamento analítico e facilitação para projetar serviços e interfaces que funcionam de verdade.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#projetos" className="bg-dark text-white px-8 py-4 rounded-full font-medium hover:bg-dark/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto text-center">
              Explorar Estudos de Caso
            </a>
            <a href="#contato" className="bg-white text-dark border border-dark/10 px-8 py-4 rounded-full font-medium hover:bg-lightbg transition-all w-full sm:w-auto text-center shadow-sm">
              Vamos conversar
            </a>
          </div>
        </div>
      </section>

      {/* listagem de projetos */}
      <section id="projetos" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">Projetos em Destaque</h2>
            <p className="text-dark/70 max-w-2xl">
              Uma seleção dos meus principais desafios focados em Design de Serviço, UX Research e Design Thinking. Nesses projetos de equipe, atuei liderando a organização, a pesquisa e a estratégia do serviço.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* case: globoplay */}
            <article className="flex flex-col bg-lightbg rounded-2xl border border-dark/5 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => openModal('modal-globoplay')}>
              <div className="h-64 overflow-hidden relative shrink-0">
                <img src="https://ik.imagekit.io/gpakiiz1/projeto%20globoplay.jpg" alt="Mockup Globoplay" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <span className="bg-dark/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">UX Research</span>
                  <span className="bg-dark/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">Service Design</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-dark mb-3 group-hover:text-brand transition-colors">Globoplay: Ecossistema de Streaming</h3>
                  <p className="text-dark/70 mb-6 line-clamp-3">Mapeamento da jornada do usuário e estruturação do Blueprint de serviço focado na experiência mobile, identificando dores de navegação e oportunidades de melhoria com base em dados quantitativos e qualitativos.</p>
                </div>
                <span className="text-brand font-medium flex items-center gap-2">
                  Ler estudo de caso completo
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </div>
            </article>

            {/* case: kopenhagen */}
            <article className="flex flex-col bg-lightbg rounded-2xl border border-dark/5 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => openModal('modal-kopenhagen')}>
              <div className="h-64 overflow-hidden relative shrink-0">
                <img src="https://ik.imagekit.io/gpakiiz1/projeto%20kopenhagen.jpg" alt="Lojas Kopenhagen" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <span className="bg-dark/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">Service Design</span>
                  <span className="bg-dark/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">Auditoria UX</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-dark mb-3 group-hover:text-brand transition-colors">Kopenhagen: Análise de Serviços Premium</h3>
                  <p className="text-dark/70 mb-6 line-clamp-3">Aplicação da ferramenta "Flor de Serviços" para analisar a jornada de atendimento em lojas físicas. Identificação de inconsistências entre franquias e análise de pontos de contato físico e digital.</p>
                </div>
                <span className="text-brand font-medium flex items-center gap-2">
                  Ler estudo de caso completo
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </div>
            </article>

            {/* case: inesdi */}
            <article className="flex flex-col bg-lightbg rounded-2xl border border-dark/5 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => openModal('modal-workshop')}>
              <div className="h-64 overflow-hidden relative shrink-0">
                <img src="https://ik.imagekit.io/gpakiiz1/workshop%20festival%20da%20matem%C3%A1tica.jpg" alt="Workshop de Ideação" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <span className="bg-dark/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">Facilitação</span>
                  <span className="bg-dark/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">Design Thinking</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-dark mb-3 group-hover:text-brand transition-colors">InESDI: Workshop de Ideação</h3>
                  <p className="text-dark/70 mb-6 line-clamp-3">Planejamento e condução de um workshop de Design Thinking para idealização de um Festival de Música. Facilitação de dinâmicas de empatia, ideação e priorização (Mínimo Conceito Viável).</p>
                </div>
                <span className="text-brand font-medium flex items-center gap-2">
                  Ler estudo de caso completo
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </div>
            </article>

            {/* case: mixer mondial */}
            <article className="flex flex-col bg-lightbg rounded-2xl border border-dark/5 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => openModal('modal-mixer')}>
              <div className="h-64 overflow-hidden relative shrink-0">
                <img src="https://ik.imagekit.io/gpakiiz1/projeto%20mixer.jpg" alt="Mixer Mondial Testes" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <span className="bg-dark/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">Ergonomia & UX</span>
                  <span className="bg-dark/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">Testes de Usabilidade</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-dark mb-3 group-hover:text-brand transition-colors">Ergonomia e Interação: Estudo Mixer Mondial</h3>
                  <p className="text-dark/70 mb-6 line-clamp-3">Pesquisa de uso e testes ergonômicos físicos para resolver dores dos usuários durante a interação com o produto, equilibrando normativas de segurança industriais com conforto humano.</p>
                </div>
                <span className="text-brand font-medium flex items-center gap-2">
                  Ler estudo de caso completo
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* sobre mim e skills */}
      <section id="sobre" className="py-20 bg-lightbg border-t border-dark/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/5] bg-dark/10 rounded-2xl overflow-hidden relative shadow-lg">
                <img src="https://ik.imagekit.io/gpakiiz1/gustavo%20pinheiro%20perfil.jpg" alt="Gustavo Pinheiro" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-6">Da partitura e da linha de frente aos fluxos de serviço.</h2>
              <div className="space-y-4 text-dark/70 text-lg">
                <p>
                  Minha jornada não é linear e vejo isso como minha maior força. Formado inicialmente em Licenciatura em Música, desenvolvi facilidade de <strong>comunicação e didática</strong> através de anos lecionando.
                </p>
                <p>
                  Além disso, já atuei como SDR e Closer em Vendas, chegando a Coordenador de Marketing em um Curso Preparatório. Aprendi na prática a <strong>identificar fricções</strong> reais entre o que o serviço promete e o que o cliente de fato experimenta.
                </p>
                <p>
                  Hoje, estudando Design na ESDI e atuando voluntariamente na InESDI (Incubadora de Empresas da ESDI), direciono todas essas habilidades para resolver problemas complexos, <strong>trabalhando em equipe, colocando o humano em primeiro lugar e guiando decisões orientadas a dados.</strong>
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-dark mb-3">Hard Skills</h4>
                  <ul className="space-y-2 text-dark/70">
                    <li>• Service Design & Blueprint</li>
                    <li>• UX Research (Quali/Quanti)</li>
                    <li>• Jornada do Usuário</li>
                    <li>• Facilitação de Workshops</li>
                    <li>• Figma & Prototipação</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-3">Soft Skills</h4>
                  <ul className="space-y-2 text-dark/70">
                    <li>• Gestão de Projetos (Agile)</li>
                    <li>• Liderança e Organização</li>
                    <li>• Visão Comercial / Marketing</li>
                    <li>• Comunicação e Didática</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* rodapé e contatos */}
      <section id="contato" className="py-20 bg-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Vamos construir algo juntos?</h2>
          <p className="text-white/70 mb-10 text-lg">Estou aberto a oportunidades de estágio em UX, Service Design e Gestão de Projetos criativos.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 flex-wrap">
            <a href="mailto:gtpinheiro@gmail.com" className="flex justify-center items-center gap-2 bg-brand text-white px-6 py-3 rounded-full font-medium hover:bg-brand-dark transition-colors w-full sm:w-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              gtpinheiro@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/gustavopinheiro-rj/" target="_blank" rel="noreferrer" className="flex justify-center items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors w-full sm:w-auto">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <a href="https://wa.me/5521983218167?text=Ol%C3%A1%2C%20acabei%20de%20ver%20seu%20portf%C3%B3lio%21" target="_blank" rel="noreferrer" className="flex justify-center items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors w-full sm:w-auto">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0c-6.627 0-12 5.373-12 12 0 2.621.854 5.041 2.302 7.009l-1.571 5.485 5.629-1.472c1.928 1.258 4.226 1.984 6.64 1.984 6.627 0 12-5.373 12-12s-5.373-12-12-12zm6.273 17.203c-.26.73-1.488 1.404-2.072 1.465-.548.058-1.25.148-3.551-.76-2.8-1.099-4.577-4.008-4.716-4.195-.14-.187-1.127-1.5-1.127-2.863 0-1.362.709-2.035.962-2.308.24-.26.541-.326.721-.326.179 0 .36.002.518.009.167.008.39-.065.61.47.228.556.782 1.91.85 2.051.069.141.114.305.023.486-.091.18-.139.291-.274.446-.14.155-.291.332-.416.458-.14.139-.286.29-.126.566.159.274.709 1.171 1.524 1.899.645.575 1.401.815 1.691.956.29.141.458.118.631-.082.173-.2.748-.867.949-1.166.201-.298.401-.25.663-.153.262.098 1.654.779 1.936.919.282.141.47.234.538.365.069.131.069.757-.191 1.487z"/></svg>
              WhatsApp
            </a>
          </div>
          
          <p className="mt-16 text-white/50 text-sm">© 2026 Gustavo Pinheiro.</p>
        </div>
      </section>

      {/* modais com os estudos de caso completos */}
      {activeModal && (
        <div id="modal-overlay" className="fixed inset-0 bg-dark/95 backdrop-blur-sm z-50 flex justify-center items-start pt-4 sm:pt-10 px-2 sm:px-4 overflow-y-auto" onClick={handleOverlayClick}>
          
          <button onClick={requestCloseModal} className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-white hover:bg-lightbg text-dark rounded-full p-2 sm:p-3 shadow-lg transition-colors z-[60]" aria-label="Fechar">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div id="modal-content" className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative mb-20 fade-in" onClick={(e) => e.stopPropagation()}>
            
            {/* modal: globoplay */}
            {activeModal === 'modal-globoplay' && (
              <div className="project-content">
                <div className="h-48 sm:h-64 rounded-t-2xl overflow-hidden relative">
                  <img src="https://ik.imagekit.io/gpakiiz1/projeto%20globoplay.jpg" alt="Globoplay Projeto" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="mb-8">
                    <span className="text-brand font-bold tracking-wider text-sm uppercase">Projeto Acadêmico • ESDI</span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark mt-2">Globoplay: Ecossistema de Streaming</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-8 border-b border-dark/10">
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-dark mb-2">O Desafio</h4>
                      <p className="text-dark/70">Compreender a experiência do usuário no aplicativo mobile da Globoplay, mapear os pontos de atrito (pain points) e estruturar processos internos e externos através de métodos de gestão de serviços, visando melhorias na retenção e usabilidade.</p>
                    </div>
                    <div className="bg-brand-light p-6 rounded-xl border border-brand/20">
                      <h4 className="font-bold text-brand-dark mb-2">Meu Papel</h4>
                      <ul className="text-sm text-brand-dark space-y-2">
                        <li>• Organização geral da equipe</li>
                        <li>• Condução da etapa de Design Thinking</li>
                        <li>• Análise e síntese de dados da pesquisa quantitativa/qualitativa</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8 text-dark/80">
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-dark mb-4">Processo e Metodologia</h3>
                      <p className="mb-4">Iniciamos com uma pesquisa baseada em questionários estruturados (Google Forms) para mapear objetivos e frustrações reais dos usuários. Com esses dados em mãos, liderei a interpretação das respostas para construir ferramentas fundamentais do Design de Serviço:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Mapa de Empatia & Personas:</strong> Para tangibilizar quem é o usuário e seu contexto.</li>
                        <li><strong>Jornada do Usuário:</strong> Mapeando desde a descoberta do programa até a avaliação pós-uso.</li>
                        <li><strong>Blueprint de Serviço:</strong> A entrega de maior valor estratégico, onde conectamos a jornada do usuário com as ações de backstage e processos de suporte (Sistemas de buffering, checagem de assinatura, algoritmos de recomendação).</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-dark mb-4">Resultados e Aprendizados</h3>
                      <p>Ao organizar a equipe para focar na correlação entre dados da pesquisa e a montagem do Blueprint, conseguimos evidenciar como gargalos técnicos (processos de suporte) impactam diretamente a linha de interação do usuário final. O projeto reforçou minha habilidade analítica em transformar dados brutos em ferramentas de estratégia.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* modal: kopenhagen */}
            {activeModal === 'modal-kopenhagen' && (
              <div className="project-content">
                <div className="h-48 sm:h-64 rounded-t-2xl overflow-hidden relative">
                  <img src="https://ik.imagekit.io/gpakiiz1/projeto%20kopenhagen.jpg" alt="Kopenhagen Projeto" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="mb-8">
                    <span className="text-brand font-bold tracking-wider text-sm uppercase">Projeto Acadêmico • Análise de Serviços</span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark mt-2">Kopenhagen: Análise de Serviços Premium</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-8 border-b border-dark/10">
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-dark mb-2">O Desafio</h4>
                      <p className="text-dark/70">Analisar o modelo de serviço da marca premium de chocolates Kopenhagen em suas lojas físicas no Rio de Janeiro. O objetivo era auditar a consistência do atendimento, a jornada de compra e os elementos de evidência física propostos pela marca.</p>
                    </div>
                    <div className="bg-brand-light p-6 rounded-xl border border-brand/20">
                      <h4 className="font-bold text-brand-dark mb-2">Meu Papel</h4>
                      <ul className="text-sm text-brand-dark space-y-2">
                        <li>• Planejamento da pesquisa em campo (Cliente Oculto)</li>
                        <li>• Aplicação do framework "Flor de Serviços"</li>
                        <li>• Estruturação dos dados e relatórios da equipe</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8 text-dark/80">
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-dark mb-4">Processo e Metodologia</h3>
                      <p className="mb-4">Para auditar o serviço, utilizamos a metodologia da <strong>Flor de Serviços</strong> (Lovelock et al.), desmembrando a oferta nos serviços suplementares de facilitação e realce (Informação, Recebimento de pedidos, Faturamento, Pagamento, Consulta, Hospitalidade, etc.).</p>
                      <p>Realizamos observações diretas em campo (franquias RJ) para avaliar:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Abordagem e script de atendimento da equipe.</li>
                        <li>Padronização do ambiente físico (mesas, vitrines, fachadas).</li>
                        <li>Fricções na jornada de pagamento.</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-dark mb-4">Resultados e Diagnóstico</h3>
                      <p>Fui responsável por compilar as observações da equipe em um diagnóstico coeso. Identificamos que, embora houvesse forte consistência visual e hospitalidade (oferecimento de água, cordialidade), existiam quebras na fluidez do serviço: inconsistência nos métodos de pagamento entre lojas (algumas usando comanda, outras pagamento direto), o que gerava confusão na etapa final da jornada do cliente.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* modal: inesdi */}
            {activeModal === 'modal-workshop' && (
              <div className="project-content">
                <div className="h-48 sm:h-64 rounded-t-2xl overflow-hidden relative">
                  <img src="https://ik.imagekit.io/gpakiiz1/workshop%20festival%20da%20matem%C3%A1tica.jpg" alt="Workshop InESDI Projeto" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="mb-8">
                    <span className="text-brand font-bold tracking-wider text-sm uppercase">InESDI • Incubadora de Empresas da ESDI</span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark mt-2">Workshop de Ideação: Festival de Música</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-8 border-b border-dark/10">
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-dark mb-2">O Desafio</h4>
                      <p className="text-dark/70">Desenvolver e facilitar um workshop intensivo (sprint) para introduzir equipes na elaboração de um "Mínimo Conceito Viável" para um Festival de Música, guiando-os desde a pesquisa inicial até a ideação e priorização de ideias.</p>
                    </div>
                    <div className="bg-brand-light p-6 rounded-xl border border-brand/20">
                      <h4 className="font-bold text-brand-dark mb-2">Meu Papel</h4>
                      <ul className="text-sm text-brand-dark space-y-2">
                        <li>• Organização e Liderança Geral</li>
                        <li>• Design da Dinâmica e Estrutura do Workshop</li>
                        <li>• Facilitação e mediação dos grupos</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8 text-dark/80">
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-dark mb-4">A Dinâmica Criada</h3>
                      <p className="mb-4">Estruturei o workshop baseado nos pilares do Design Thinking, dividido em 4 etapas cruciais para que os participantes pudessem sair do "zero" para uma proposta de valor clara em poucas horas:</p>
                      <ol className="list-decimal pl-5 space-y-3">
                        <li><strong>Pesquisa, Empatia e Contexto:</strong> Brainstorming divergente (post-its) sobre os elementos fundamentais de festivais existentes.</li>
                        <li><strong>Categorização e Padrões:</strong> Agrupamento por afinidade (Affinity Mapping) para encontrar eixos temáticos.</li>
                        <li><strong>Inspiração e "Toró de Ideias":</strong> Ambiente seguro para geração de múltiplas ideias de nomes, estilos e formatos (ex: Festival Jabuti, Hypalooza).</li>
                        <li><strong>Votação e Mínimo Conceito Viável:</strong> Tomada de decisão coletiva para lapidar a ideia central.</li>
                      </ol>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-dark mb-4">Resultados</h3>
                      <p>A aplicação desta dinâmica validou minha capacidade de planejamento de metodologias ágeis e de mediação de grupos. Minha experiência anterior na docência foi vital para manter o engajamento, garantir que o cronograma fosse cumprido e que as divergências das equipes se transformassem em soluções convergentes e bem desenhadas.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* modal: mixer mondial */}
            {activeModal === 'modal-mixer' && (
              <div className="project-content">
                <div className="h-48 sm:h-64 rounded-t-2xl overflow-hidden relative">
                  <img src="https://ik.imagekit.io/gpakiiz1/projeto%20mixer.jpg" alt="Mixer Mondial Projeto" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="mb-8">
                    <span className="text-brand font-bold tracking-wider text-sm uppercase">Projeto Acadêmico • Ergonomia Física e UX</span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark mt-2">Mixer Mondial: Interação Humano-Produto</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-8 border-b border-dark/10">
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-dark mb-2">O Desafio</h4>
                      <p className="text-dark/70">Analisar a interface física de um eletrodoméstico (Mixer Mondial Pratic) que exige alta carga interativa (força isométrica, vibração, coordenação). O objetivo era identificar conflitos entre normas de segurança industriais (botões difíceis de apertar) e o risco ergonômico para o usuário (L.E.R. / DORT).</p>
                    </div>
                    <div className="bg-brand-light p-6 rounded-xl border border-brand/20">
                      <h4 className="font-bold text-brand-dark mb-2">Meu Papel</h4>
                      <ul className="text-sm text-brand-dark space-y-2">
                        <li>• Organização das rotinas de teste da equipe</li>
                        <li>• Interpretação dos dados de usabilidade e métricas de esforço</li>
                        <li>• Ideação da solução em design de interação</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8 text-dark/80">
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-dark mb-4">Processo de Pesquisa</h3>
                      <p className="mb-4">Não olhamos para o produto apenas como "motor", mas como uma interface que o usuário precisa sustentar. Identificamos que a engenharia de segurança padrão criou um botão propositalmente rígido (função "homem-morto"), o que, aliado à vibração, tornava a experiência punitiva.</p>
                      <p>Organizei a equipe para testar hipóteses usando <strong>Mock-ups volumétricos em escala 1:1</strong>, simulando o peso e o eixo de pega do produto para avaliar fadiga e conforto tátil.</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-dark mb-4">A Solução Projetada</h3>
                      <p>A partir da análise dos dados dos testes, propusemos uma otimização: se um sensor interno de temperatura pudesse proteger o motor de queimas, o botão interativo físico poderia ser redesenhado para ter menos resistência tátil. Assim, garantimos a segurança (desligamento automático) e devolvemos a ergonomia ao usuário final. Um excelente exercício de equilíbrio entre viabilidade técnica, normas legais e User Experience no mundo físico.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8 bg-lightbg border-t border-dark/5 rounded-b-2xl text-center">
              <button onClick={requestCloseModal} className="w-full sm:w-auto bg-dark/10 hover:bg-dark/20 text-dark font-medium px-8 py-3 rounded-full transition-colors">
                Fechar Estudo de Caso
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
