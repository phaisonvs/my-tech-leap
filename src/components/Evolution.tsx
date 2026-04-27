import { useState, useEffect } from 'react';
import { Palette, Monitor, Eye, Code, Users, Target, ChevronLeft, ChevronRight, Zap, Layers, BarChart3, ShieldCheck } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { toUiKey } from '@/lib/data-ui';

const steps = [
  {
    icon: Palette,
    title: 'Design e comunicação',
    text: 'Base inicial em design gráfico, campanhas e comunicação visual, com foco em clareza, marca e entrega.',
  },
  {
    icon: Monitor,
    title: 'UX/UI e experiência',
    text: 'Evolução para interfaces, jornadas, protótipos e decisões de experiência aplicadas aos canais digitais.',
  },
  {
    icon: Eye,
    title: 'CRO e funil',
    text: 'Identificação de fricções, hipóteses e oportunidades para melhorar jornada, conversão e performance digital.',
  },
  {
    icon: Code,
    title: 'Execução técnica',
    text: 'Atuação direta em front-end, back-end, APIs, tracking, integrações e sustentação para tirar evoluções do papel.',
  },
  {
    icon: Users,
    title: 'Coordenação de frentes',
    text: 'Alinhamento entre áreas, parceiros e prioridades para destravar entregas e acelerar evolução dos produtos MYSA.',
  },
  {
    icon: Target,
    title: 'Objetivo atual',
    text: 'Formalizar a atuação como Coordenador de CRO & UX, conectando escopo, responsabilidade e próximos passos.',
  },
];

const objectives = [
  {
    icon: ShieldCheck,
    title: 'Clareza de escopo',
    text: 'Definir oficialmente o papel que já exerço entre CRO, UX/UI, tecnologia e sustentação.',
  },
  {
    icon: Zap,
    title: 'Velocidade de entrega',
    text: 'Reduzir dependências e destravar frentes críticas que impactam os funis digitais.',
  },
  {
    icon: Target,
    title: 'Prioridade estratégica',
    text: 'Organizar a régua de CRO com foco em jornada, conversão, operação e receita.',
  },
  {
    icon: Layers,
    title: 'Qualidade e consistência',
    text: 'Padronizar decisões de UX/UI, tracking, front-end e sustentação das jornadas.',
  },
  {
    icon: BarChart3,
    title: 'Dados e evolução contínua',
    text: 'Usar eventos, KPIs e comportamento para orientar melhorias nos produtos MYSA.',
  },
];

const Evolution = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, isVisible } = useInView();

  const goToStep = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveStep(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <section id="evolucao" className="py-24 px-4 md:px-6 scroll-mt-24" data-ui="evolution.root">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        data-ui="evolution.content"
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4" data-ui="evolution.title">
          Evolução da atuação até CRO &amp; UX
        </h2>
        
        <p className="text-sm text-muted-foreground mb-12 max-w-3xl leading-relaxed" data-ui="evolution.subtitle">
          Minha atuação evoluiu de design e experiência para uma frente mais ampla, conectando CRO, execução técnica, sustentação e objetivos claros para os funis digitais da MYSA.
        </p>

        {/* Timeline navigation */}
        <div className="relative mb-10" data-ui="evolution.timeline">
          <div className="absolute top-5 left-0 right-0 h-px bg-border" />
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                data-ui={`evolution.step.${toUiKey(step.title)}`}
                className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-700 ease-out ${
                  index === activeStep ? 'scale-110' : 'opacity-50 hover:opacity-80'
                } ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group ${
                  index === activeStep 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                    : 'bg-card border border-border hover:border-primary/50'
                }`}>
                  <step.icon className="w-4 h-4 icon-hover-effect" />
                </div>
                <span className={`text-xs hidden sm:block transition-all duration-300 max-w-20 text-center ${
                  index === activeStep ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active step card with smooth transition */}
        <div className="relative overflow-hidden min-h-[140px]" data-ui="evolution.panel">
          <div 
            className={`p-8 rounded-2xl bg-card border border-primary/20 transition-all duration-400 ${
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
            data-ui="evolution.panel.card"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 animate-float group">
                {(() => {
                  const Icon = steps[activeStep].icon;
                  return <Icon className="w-6 h-6 text-primary icon-hover-effect" />;
                })()}
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {steps[activeStep].text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-8 mb-16" data-ui="evolution.controls">
          <button 
            onClick={() => goToStep((activeStep - 1 + steps.length) % steps.length)}
            data-ui="evolution.controls.prev"
            className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
          <div className="flex items-center gap-1.5" data-ui="evolution.controls.dots">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                data-ui={`evolution.controls.dot.${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeStep 
                    ? 'bg-primary w-4' 
                    : 'bg-muted-foreground/20 w-1.5 hover:bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
          <button 
            onClick={() => goToStep((activeStep + 1) % steps.length)}
            data-ui="evolution.controls.next"
            className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Objetivos práticos da formalização */}
        <div className="mt-12 pt-12 border-t border-border" data-ui="evolution.objectives">
          <h3 className="text-base font-medium text-foreground mb-6" data-ui="evolution.objectives.title">
            Objetivos práticos da formalização
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4" data-ui="evolution.objectives.grid">
            {objectives.map((obj, index) => (
              <div
                key={index}
                data-ui={`evolution.objective.${toUiKey(obj.title)}`}
                className={`p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-700 ease-out group ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${(index + 6) * 100}ms` : '0ms' }}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-all">
                  <obj.icon className="w-4 h-4 text-primary icon-hover-effect" />
                </div>
                <h4 className="text-xs font-medium text-foreground mb-1.5">{obj.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{obj.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
