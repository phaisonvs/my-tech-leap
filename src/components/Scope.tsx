import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { toUiKey } from '@/lib/data-ui';

const objectives = [
  'Priorizar jornadas críticas — Atuar nos pontos de maior impacto em conversão, operação e experiência.',
  'Reduzir dependências — Destravar frentes que hoje ficam paradas entre agência, tecnologia, produto e operação.',
  'Padronizar qualidade digital — Criar mais consistência em UX/UI, front-end, tracking e sustentação das jornadas.',
  'Conectar CRO e execução — Transformar diagnóstico, hipótese e oportunidade em entrega prática.',
  'Evoluir com dados — Acompanhar eventos, KPIs e comportamento para direcionar melhorias de funil.',
];

const Scope = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useInView();

  const goUp = () => setCurrentIndex((prev) => (prev - 1 + objectives.length) % objectives.length);
  const goDown = () => setCurrentIndex((prev) => (prev + 1) % objectives.length);

  return (
    <section id="escopo" className="py-16 px-4 md:px-6 bg-secondary/30 scroll-mt-24" data-ui="scope.root">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="scope.content"
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4" data-ui="scope.title">
          Objetivos como Coordenador de CRO &amp; UX
        </h2>
        
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed" data-ui="scope.subtitle">
          Formalizar esse papel permite dar mais clareza, prioridade e velocidade às frentes que impactam os funis digitais.
        </p>

        {/* Cards with vertical navigation */}
        <div className="flex gap-4" data-ui="scope.layout">
          {/* Cards list */}
          <div className="flex-1 space-y-3" data-ui="scope.list">
            {objectives.map((text, index) => {
              const [title, description] = text.split(' — ');
              return (
                <div 
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  data-ui={`scope.item.objective.${index + 1}`}
                  className={`flex gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-700 ease-out ${
                    index === currentIndex
                      ? 'bg-card border-primary/40 shadow-lg shadow-primary/5' 
                      : 'bg-card/50 border-border hover:border-primary/20'
                  } ${
                    isVisible 
                      ? index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-0 hover:opacity-80'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
                >
                  <span className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center flex-shrink-0 font-medium transition-all ${
                    index === currentIndex
                      ? 'bg-primary text-primary-foreground scale-110' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 self-center">
                    <h3 className={`text-sm font-medium mb-0.5 transition-colors ${
                      index === currentIndex ? 'text-foreground' : 'text-muted-foreground'
                    }`}>{title}</h3>
                    <p className={`text-sm leading-relaxed transition-colors ${
                      index === currentIndex ? 'text-muted-foreground' : 'text-muted-foreground/60'
                    }`}>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vertical navigation arrows */}
          <div className="flex flex-col justify-center gap-2" data-ui="scope.nav">
            <button 
              onClick={goUp}
              data-ui="scope.nav.up"
              className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
            >
              <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <div className="text-center py-2">
              <span className="text-xs text-muted-foreground" data-ui="scope.counter">{currentIndex + 1}/{objectives.length}</span>
            </div>
            <button 
              onClick={goDown}
              data-ui="scope.nav.down"
              className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scope;
