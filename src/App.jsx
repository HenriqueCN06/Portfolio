import { motion, useAnimate, stagger, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useMemo, useRef, useState, useEffect } from 'react';
import RibbonGlow from './RibbonGlow';
import LiquidGlassButton from './LiquidGlassButton';
import VariableFontCursorProximity from './VariableFontCursorProximity';

// --- Banco de Dados dos Projetos ---
const PROJECTS_DATA = [
  {
    id: 'stockly',
    title: 'Stockly',
    shortDescription: 'Plataforma SaaS Multi-Tenant para gestão de negócios. Desenvolvida em React Native, combina integração nativa de hardware (câmera) com um poderoso módulo de Inteligência Financeira (BI) processado em tempo real via Supabase.',
    details: 'O Stockly foi idealizado para resolver o caos logístico de pequenas e médias empresas, modernizando o controle de inventário de ponta a ponta. Trata-se de um aplicativo móvel cross-platform construído em React Native, projetado como uma verdadeira plataforma SaaS (Software as a Service).\n\nO grande triunfo técnico deste projeto é a sua arquitetura Multi-Tenant (Multilocatário) estruturada no backend com Supabase (PostgreSQL). Através da implementação estrita de Row Level Security (RLS) e validações JWT, o banco de dados garante que múltiplas lojas gerenciem seus estoques, equipes e históricos de forma absolutamente isolada — assegurando integridade e privacidade total dos dados.\n\nNa camada de front-end, a performance é garantida pelo Zustand orquestrando o estado global da aplicação. A interface se comunica diretamente com o hardware nativo do smartphone, utilizando a câmera para o escaneamento ultrarrápido de códigos de barras (SKUs), facilitando entradas e saídas no armazém.\n\nUm dos maiores destaques de engenharia é o Módulo de Inteligência Financeira (Dashboard BI). Desenvolvi algoritmos que processam o histórico de movimentações em tempo real para calcular métricas de negócio cruciais — como Receita, Lucro Líquido, Ticket Médio e identificação automatizada de picos de venda. Esses dados alimentam gráficos dinâmicos e tooltips interativos nativos no celular, traduzindo o banco relacional em insights estratégicos para tomada de decisão.\n\nToda a lógica de negócios foi construída para escala: desde o registro imutável de fluxo de caixa, até disparos automatizados de notificações para alertar gestores sobre estoques baixos. É a prova prática de forte domínio na integração de Front-end Mobile, Backend as a Service e lógicas de negócios complexas.',
    tags: ['React Native', 'Supabase', 'Zustand'],
    modalTags: ['React Native', 'Expo', 'Supabase (PostgreSQL)', 'Zustand', 'Multi-tenant', 'RLS', 'Segurança de Acesso', 'Mobile SaaS', 'Integração de Hardware Nativo', 'Data Visualization'],
    mediaPlacement: {
      2: '/videos/stockly sample 1.mp4',
      3: '/videos/stockly sample 2.mp4'
    },
    link: 'https://github.com/HenriqueCN06/Projeto-Stockly'
  },
  {
    id: 'pokeheaven',
    title: 'PokeHeaven',
    shortDescription: 'Servidor MMORPG Full-stack de alta complexidade. Envolve engenharia profunda na engine em C++, algoritmos matemáticos de balanceamento, migração para banco relacional MySQL e uma interface autoral projetada em Lua/OpenGL.',
    details: 'O PokeHeaven é o projeto mais desafiador do meu portfólio, exigindo domínio em engenharia de software de ponta a ponta: desde o motor do jogo e lógicas em C++, até banco de dados e UI/UX. Trata-se de um MMORPG (servidor customizado de Pokétibia) onde reescrevi sistemas fundamentais e redesenhei o Client do absoluto zero.\n\nPara garantir uma infraestrutura escalável, migrei o banco de dados original — que utilizava uma estrutura defasada em SQLite de 2012 — para um banco relacional MySQL moderno, permitindo que o projeto operasse em produção hospedado ativamente em uma VPS. Já na etapa de engenharia e desenvolvimento local, estruturei ambientes de compilação específicos e complexos (Dev-C++ para construir a source do servidor e Visual Studio Community para o Client), garantindo um pipeline robusto para as modificações na engine.\n\nNa base do motor do jogo (Engine em C++), desenvolvi sistemas de altíssima complexidade matemática e estrutural, sendo alguns deles:\n\n• Algoritmo de Balanceamento Automático: Criei do zero um sistema dinâmico que calcula o dano total de um Pokémon com base em sua tier de uso. O algoritmo distribui matematicamente esse "orçamento de dano" pelos ataques considerando o poder base e a quantidade de hits, aplicando variações baseadas em status (defensivos recebem e causam menos dano; ofensivos agem como glass cannons).\n• Matriz de Efetividades Elemental: Refiz toda a arquitetura de combate diretamente na source (combat.cpp e monsters.cpp), resolvendo cálculos de fraquezas e resistências que estavam corrompidos no projeto base.\n\nNa camada de Front-end, substituí a interface padrão por uma experiência visual (UI) 100% autoral em Lua e OpenGL. O maior expoente dessa mescla Full-stack é a Nova Pokédex: desenhei uma interface fluida para exibir informações complexas (movimentos, shinies, megas e regionais), amarrada a um sistema de backend que rastreia em tempo real, e salva no MySQL, o número exato de Pokémons vistos e capturados pelo jogador.\n\nÉ um projeto que atesta habilidades avançadas em refatoração de código legado, matemática orientada a game design, modelagem de banco de dados e infraestrutura.',
    tags: ['C++', 'Lua', 'MySQL'],
    modalTags: ['C++', 'Lua', 'MySQL', 'Game Engine', 'Pipeline de Compilação', 'Game Design Math', 'Arquitetura de Redes', 'DevOps / VPS', 'UI / UX', 'OpenGL'],
    mediaPlacement: {
      3: '/videos/pokeheaven sample 1.mp4',
      4: '/videos/pokeheaven sample 2.mp4'
    },
    link: null
  },
  {
    id: 'piw-manager',
    title: 'PIW Manager',
    shortDescription: 'Ferramenta Desktop multi-contas (Multi-boxing) para o Poke Idle World. Construída com Electron, utiliza injeção avançada de DOM em tempo real para orquestrar sessões paralelas e injetar mecânicas de Qualidade de Vida (QoL).',
    details: 'O PIW Manager nasceu da necessidade de aplicar conceitos de Qualidade de Vida (UX/QoL) e automação especificamente para o Poke Idle World, um web game cuja interface carecia de ferramentas nativas de usabilidade avançada. O grande desafio técnico era gerenciar múltiplas contas simultaneamente e modificar o comportamento da interface do jogo sem possuir acesso a uma API oficial.\n\nA solução foi orquestrada construindo um container Desktop robusto utilizando Electron. Por meio do uso avançado de tags <webview>, instanciei janelas de navegador completamente isoladas, permitindo que múltiplas contas operem em paralelo sem conflito de sessão (arquitetura Multi-boxing e Multi-tenant local).\n\nO núcleo tecnológico do projeto reside na Manipulação Extensiva de DOM (DOM Injection). Mapeei toda a estrutura HTML do Poke Idle World e desenvolvi uma suíte de módulos em JavaScript puro injetados em tempo real na página do cliente via webview-preload.js.\n\nMódulos como iv-manager.js e pokedex-filter.js interceptam atributos ocultos no código-fonte do jogo e re-renderizam painéis próprios superpostos, criando sistemas de busca complexos que não existem nativamente. Além disso, a Comunicação Inter-Processos (IPC) permite que um painel mestre envie comandos a todas as abas simultaneamente, atestando forte domínio em Engenharia Reversa de Front-end e arquitetura JavaScript Vanilla.',
    tags: ['Electron', 'JavaScript', 'DOM'],
    modalTags: ['Electron', 'JavaScript Vanilla', 'DOM Injection', 'IPC', 'Webviews', 'Engenharia Reversa'],
    mediaPlacement: {
      1: '/videos/piwmanager sample 1.mp4',
      3: '/videos/piwmanager sample 2.mp4'
    },
    link: 'https://github.com/HenriqueCN06/PIW-QOL'
  }
];


// -----------------------------------

// --- OriginKit Component ---
const INTER_VARIABLE_FONT_FACE = `
@font-face {
    font-family: "InterVariableFramer";
    src: url("https://rsms.me/inter/font-files/InterVariable.woff2?v=4.0") format("woff2-variations");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
}
`;

function VariableFontHoverByLetter({
    label,
    fromWeight = 700,
    toWeight = 900,
    staggerDuration = 30,
    staggerFrom = "random",
    className = "",
}) {
    const fromSettings = `'wght' ${fromWeight}`;
    const toSettings = `'wght' ${toWeight}`;
    const staggerSec = Math.max(0, staggerDuration) / 1000;
    const [scope, animate] = useAnimate();

    const shuffledIndices = useMemo(() => {
        if (staggerFrom !== "random") return null;
        const len = label ? label.length : 0;
        const indices = Array.from({ length: len }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices;
    }, [label, staggerFrom]);

    const transition = { type: "spring", duration: 0.7, bounce: 0.2 };

    const mergeStagger = (base) => {
        if (staggerFrom === "random" && shuffledIndices) {
            return {
                ...base,
                delay: (i) => staggerSec * (shuffledIndices[i] ?? 0),
            };
        }
        return {
            ...base,
            delay: stagger(staggerSec, { from: staggerFrom }),
        };
    };

    const handleHoverStart = () => animate(".letter", { fontVariationSettings: toSettings }, mergeStagger(transition));
    const handleHoverEnd = () => animate(".letter", { fontVariationSettings: fromSettings }, mergeStagger(transition));

    const letters = label.split("");

    return (
        <span
            style={{ fontFamily: '"InterVariableFramer", "Inter Variable", "Inter", sans-serif' }}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            className="inline-flex cursor-default"
        >
            <style>{INTER_VARIABLE_FONT_FACE}</style>
            <span ref={scope} className={`inline-block ${className}`}>
                <span className="sr-only">{label}</span>
                {letters.map((letter, i) => (
                    <motion.span
                        key={i}
                        className="letter inline-block"
                        aria-hidden
                        style={{
                            whiteSpace: "pre",
                            fontVariationSettings: fromSettings,
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </span>
        </span>
    );
}
// ---------------------------

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Componente Genérico de Card com Spotlight Reutiliz├ível
function SpotlightCard({ 
  children, 
  className = "", 
  contentClassName = "w-full h-full flex flex-col p-8",
  delay = 0,
  animateHover = true,
  activeBorderOnHover = true
}) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      whileHover={animateHover ? { y: -5 } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`relative group bg-zinc-900/60 border border-zinc-800 transition-colors duration-300 backdrop-blur-sm overflow-hidden ${activeBorderOnHover ? 'hover:border-emerald-500/50' : ''} ${className}`}
    >
      {/* Efeito de Spotlight que segue o mouse */}
      <div 
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.12), transparent 40%)`
        }}
      />
      {/* Borda que brilha ao redor do mouse */}
      <div 
        className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-emerald-500/50 transition-opacity duration-300 ${activeBorderOnHover ? 'group-hover:opacity-0' : ''}`}
        style={{
          maskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
        }}
      />
      <div className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </motion.div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Impede o scroll da p├ígina enquanto o modal estiver aberto (sem layout shift)
  useEffect(() => {
    // Garante que o fundo da p├ígina (atr├ís do App) seja escuro para não vazar a cor branca padrão do navegador
    document.body.classList.add('bg-zinc-950');
    let timeoutId;
    
    if (selectedProject) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Aguarda a anima├ºão de saída do modal terminar (~400ms) antes de devolver a barra de rolagem.
      // Isso evita que o modal seja "empurrado" para o lado durante o fade-out.
      timeoutId = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }, 400);
    }
    
    return () => { 
      if (timeoutId) clearTimeout(timeoutId);
    }
  }, [selectedProject]);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #3f3f46; /* zinc-700 */
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #52525b; /* zinc-600 */
        }
      `}</style>
      
      {/* Background Interativo WebGL */}
      <div className="fixed inset-0 z-0 pointer-events-auto opacity-35">
        <RibbonGlow 
          background="#09090b" 
          color1="#34d399" 
          color2="#06b6d4" 
          size={110} 
          speed={40} 
          hover={80} 
        />
      </div>

      {/* Conteúdo do Site */}
      <div className="relative z-10">
        {/* Header Minimalista */}
        <nav className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
        <span className="font-bold text-xl tracking-tighter">
          Henrique<span className="text-emerald-500">.</span>
        </span>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
          <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
          <a href="#projetos" className="hover:text-white transition-colors">Projetos</a>
          <a href="#contato" className="hover:text-white transition-colors">Contato</a>
        </div>
      </nav>

      {/* Hero Section (Apresenta├ºão) */}
      <main className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Badge / Subtítulo */}
          <motion.h2 variants={fadeUp} className="text-emerald-400 font-semibold tracking-widest uppercase text-xs md:text-sm mb-6">
            Desenvolvedor Full-Stack
          </motion.h2>
          
          {/* Título Principal */}
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white leading-tight">
            Criando <VariableFontHoverByLetter label="interfaces modernas" className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500" /> <br className="hidden md:block" />
            e soluções de software <VariableFontCursorProximity label="escaláveis." className="text-emerald-400" />
          </motion.h1>
          
          {/* Breve Resumo */}
          <motion.p variants={fadeUp} className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Olá, eu sou o Henrique Cucco Nunes. Desenvolvedor com sólida base prática em arquitetura de banco de dados, sistemas complexos, e cria├ºão de interfaces modernas e interativas para plataformas web, mobile e desktop.
          </motion.p>
          
          {/* Call to Actions (Bot├Áes) e Redes */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#projetos" 
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
            >
              Ver meus projetos
            </a>
            
            <div className="flex items-center gap-4 px-6 py-4 rounded-full bg-zinc-900 border border-zinc-800">
              <a href="https://github.com/HenriqueCN06" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <FaGithub size={22} />
              </a>
              <a href="https://linkedin.com/in/henriquecn" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <FaLinkedin size={22} />
              </a>
              <a href="mailto:henrique.cucco@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
                <FaEnvelope size={22} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Sessão de Projetos */}
      <section id="projetos" className="max-w-6xl mx-auto px-6 py-20">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          Projetos em <span className="text-emerald-400">Destaque</span>
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((proj, index) => (
            <SpotlightCard key={proj.id} className="rounded-2xl h-full" delay={index * 0.1}>
              <div className="flex flex-col h-full">
                <h4 className="text-2xl font-bold text-white mb-3">{proj.title}</h4>
                <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">
                  {proj.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {proj.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Footer do Card com Bot├Áes Lado a Lado */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="flex-1" onClick={() => setSelectedProject(proj)}>
                    <LiquidGlassButton 
                      label="Saiba Mais"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  {proj.link && (
                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center bg-zinc-900 border border-zinc-700 hover:border-emerald-500/50 text-emerald-400 w-10 h-10 rounded-lg transition-colors"
                      title="Ver Repositório"
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Sessão Sobre */}
      <section id="sobre" className="max-w-6xl mx-auto px-6 py-20 mb-10">
        <SpotlightCard 
          delay={0} 
          className="rounded-3xl"
          contentClassName="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center"
          animateHover={false}
          activeBorderOnHover={false}
        >
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Um pouco sobre <span className="text-emerald-400">mim</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              Atualmente cursando o 6º período de <strong>Ciência da Computação</strong>, sou movido pelo desafio de <strong>resolver problemas</strong>. Sou <strong>detalhista</strong> na criação das interfaces e possuo forte <strong>capacidade analítica</strong> para estruturar arquiteturas de dados robustas no backend.
            </p>
            <p className="text-zinc-400 leading-relaxed text-lg">
              Minha trajetória reflete essa resiliência técnica: desenvolvi desde plataformas SaaS utilizando <strong>JavaScript</strong> e <strong>React Native</strong> com bancos <strong>Supabase</strong> até modificar o *core* de motores de jogos em <strong>C++</strong> e Lua, além de construir automações com <strong>n8n</strong>.
            </p>
            <p className="text-zinc-400 leading-relaxed text-lg">
              Possuo <strong>Inglês Fluente</strong> (tendo concluído o curso avançado no BRASAS aos 14 anos). Sempre muito aberto a novos aprendizados, meu grande objetivo agora é <strong>ingressar em um time de tecnologia</strong> onde eu possa aplicar e agregar valor com o que sei, e evoluir ainda área.
            </p>
          </div>
          
          <div className="flex-1 w-full">
            <h4 className="text-emerald-400 font-semibold mb-6 uppercase tracking-widest text-sm">Principais Skills & Tecnologias</h4>
            <div className="flex flex-wrap gap-3">
              {['JavaScript', 'React Native', 'React.js', 'Node.js', 'C++', 'Lua', 'Python', 'PostgreSQL', 'Supabase', 'Electron', 'Git & GitHub', 'Tailwind CSS', 'n8n', 'Inglês Fluente'].map((tech) => (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  key={tech} 
                  className="px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-zinc-300 text-sm font-medium hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* Sessão de Contato & Footer */}
      <footer id="contato" className="border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm mt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Gostou do meu perfil? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Vamos conversar.</span>
            </h3>
            <p className="text-zinc-400 mb-10 max-w-xl text-lg">
              Estou sempre aberto a novas oportunidades e desafios. Sinta-se à vontade para me mandar um e-mail ou se conectar comigo no LinkedIn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center">
              <a 
                href="mailto:henrique.cucco@gmail.com" 
                className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors"
              >
                <FaEnvelope size={20} />
                Me mande um E-mail
              </a>
              <a 
                href="https://linkedin.com/in/henriquecn" 
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-700 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors"
              >
                <FaLinkedin size={20} className="text-blue-400" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/HenriqueCN06" 
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-700 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors"
              >
                <FaGithub size={20} />
                GitHub
              </a>
            </div>
            
            <p className="text-zinc-500 text-sm">
              &copy; {new Date().getFullYear()} Henrique Cucco Nunes. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* MODAL DE PROJETO */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Fundo Escuro com Blur (Estendido para fora da tela para evitar a linha brilhante de borda do CSS blur) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute -inset-4 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Caixa do Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Cabeçalho do Modal */}
              <div className="flex justify-between items-center p-6 md:p-8 border-b border-zinc-800/50 bg-zinc-900/50">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h3>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700 p-2 rounded-full transition-colors cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Corpo do Modal */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {(selectedProject.modalTags || selectedProject.tags).map(tag => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 bg-zinc-800 border border-zinc-700/50 text-emerald-400 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-zinc-300 leading-relaxed text-lg space-y-6">
                  {selectedProject.details.split('\n\n').map((paragraph, idx) => (
                    <div key={idx} className="space-y-6">
                      <p>{paragraph}</p>
                      
                      {/* Renderiza mídia se existir configurada para este índice */}
                      {selectedProject.mediaPlacement && selectedProject.mediaPlacement[idx] && (
                        <div className="group relative w-fit mx-auto">
                          <video 
                            src={selectedProject.mediaPlacement[idx]}
                            autoPlay
                            loop
                            muted
                            playsInline
                            title="Clique para tela cheia"
                            onClick={(e) => {
                              const video = e.target;
                              if (video.requestFullscreen) {
                                video.requestFullscreen();
                              } else if (video.webkitRequestFullscreen) {
                                video.webkitRequestFullscreen();
                              }
                            }}
                            className="w-auto max-w-full max-h-[65vh] mx-auto rounded-xl border border-zinc-800 shadow-lg object-contain cursor-pointer group-hover:border-emerald-500/50 transition-colors"
                          />
                          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-2 border border-white/10">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                            Ampliar
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rodapé do Modal */}
              <div className="p-6 md:p-8 bg-zinc-900/50 border-t border-zinc-800/50 flex flex-wrap justify-end gap-4 mt-auto">
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors"
                  >
                    Ver Repositório <FaGithub size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}
