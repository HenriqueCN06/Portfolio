import { motion, useAnimate, stagger } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useMemo } from 'react';
import RibbonGlow from './RibbonGlow';

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

export default function App() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">
      
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

      {/* Hero Section (Apresentação) */}
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
            e soluções de software escaláveis.
          </motion.h1>
          
          {/* Breve Resumo */}
          <motion.p variants={fadeUp} className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Olá, eu sou o Henrique Cucco Nunes. Desenvolvedor com sólida base prática em arquitetura de banco de dados, sistemas complexos, e criação de interfaces modernas e interativas para plataformas web, mobile e desktop.
          </motion.p>
          
          {/* Call to Actions (Botões) e Redes */}
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
          {/* Card Stockly */}
          <motion.div 
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl flex flex-col backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
          >
            <h4 className="text-2xl font-bold text-white mb-3">Stockly</h4>
            <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">
              Plataforma SaaS Multi-Tenant de Gestão de Estoque. Aplicativo mobile construído com React Native, integrando câmera para leitura de SKUs e banco de dados via Supabase.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">React Native</span>
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">Supabase</span>
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">Zustand</span>
            </div>
            <a href="https://github.com/HenriqueCN06/Projeto-Stockly-main" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors mt-auto w-max">
              Ver Repositório <FaGithub size={16} />
            </a>
          </motion.div>

          {/* Card PokeHeaven */}
          <motion.div 
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl flex flex-col backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
          >
            <h4 className="text-2xl font-bold text-white mb-3">PokeHeaven</h4>
            <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">
              Servidor MMORPG de alta volumetria. Modificação profunda no core (C++) para protocolos de rede customizados e módulos de UI/UX modernos.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">C++</span>
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">Lua</span>
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">OpenGL</span>
            </div>
            <a href="https://github.com/HenriqueCN06/pokeheaven-main" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors mt-auto w-max">
              Ver Repositório <FaGithub size={16} />
            </a>
          </motion.div>

          {/* Card PIW */}
          <motion.div 
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl flex flex-col backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
          >
            <h4 className="text-2xl font-bold text-white mb-3">PIW Manager</h4>
            <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">
              Gerenciador Desktop multitarefa. Aplicação construída com Electron, focada em manipulação de DOM e scripts para melhorias de UX no jogo.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">Electron</span>
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">JavaScript</span>
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">DOM</span>
            </div>
            <a href="https://github.com/HenriqueCN06/PIW-Multi-Account-Manager" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors mt-auto w-max">
              Ver Repositório <FaGithub size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sessão Sobre */}
      <section id="sobre" className="max-w-6xl mx-auto px-6 py-20 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900/50 border border-zinc-800/50 p-8 md:p-12 rounded-3xl backdrop-blur-md flex flex-col md:flex-row gap-12 items-center"
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
              Possuo <strong>Inglês Fluente</strong> (tendo concluído o curso avançado no BRASAS aos 14 anos). Sempre muito aberto a novos aprendizados, meu grande objetivo agora é <strong>ingressar em um time de tecnologia</strong> onde eu possa aplicar e agregar valor com o que sei, e evoluir ainda mais ao lado de profissionais da área.
            </p>
          </div>
          
          <div className="flex-1 w-full">
            <h4 className="text-emerald-400 font-semibold mb-6 uppercase tracking-widest text-sm">Principais Skills & Tecnologias</h4>
            <div className="flex flex-wrap gap-3">
              {['JavaScript', 'React Native', 'React.js', 'C++', 'Lua', 'PostgreSQL', 'Supabase', 'Node.js', 'Electron', 'Python', 'Tailwind CSS', 'n8n', 'Inglês Fluente'].map((tech) => (
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
        </motion.div>
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

      </div>
    </div>
  );
}
