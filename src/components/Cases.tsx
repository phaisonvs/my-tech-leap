import { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useInView } from '@/hooks/use-in-view';

interface CaseItem {
  id: number;
  title: string;
  tags: string[];
  impact: string;
  print: string;
  problem: string;
  problemLabel?: string;
  actions: string[];
  result: string;
  evidence: string;
  evidences?: { label: string; href: string }[];
  year?: number;
}

const cases: CaseItem[] = [
  {
    id: 1,
    title: 'Diretório de Lojas:\nCluster Local (Estado > Cidade > Loja)',
    tags: ['UX/UI', 'Front-end', 'SEO'],
    impact: 'UI/UX + front: componentes reutilizáveis, layout responsivo e roteamento hierárquico (estado→cidade→loja) para escalar o diretório',
    print: '/cases/1-localpage.jpg',
    problem: 'Escalar SEO local e entrada de novas lojas exigia um diretório padronizado, com estrutura previsível (rotas/URLs) e baixa manutenção para não gerar duplicidades.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei o template do diretório (Estado → Cidade → Loja) com UI responsiva e componentes reutilizáveis.',
      'Modelei estrutura de rotas + slugs e padrões de navegação para consistência entre páginas.',
      'Defini regras de governança para publicação de novas unidades (campos e validações), reduzindo retrabalho.',
    ],
    result: 'Diretório escalável e consistente, pronto para crescimento contínuo de lojas com estrutura estável e manutenção previsível.',
    evidence: '[LINK_1]',
    evidences: [
      { label: 'Figma — fluxo + templates', href: '#' },
      { label: 'Produção — exemplo cidade/loja', href: '#' },
    ],
    year: 2021,
  },
  {
    id: 2,
    title: 'Falhas na integração de pedidos',
    tags: ['Sustentação', 'API'],
    impact: 'Menos pedidos travados / menos ajuste manual · [X]',
    print: '[PRINT_2]',
    problem: '[PROBLEMA_2]',
    actions: ['[ACAO_2_1]', '[ACAO_2_2]', '[ACAO_2_3]'],
    result: '[RESULTADO_2]',
    evidence: '[LINK_2]',
  },
  {
    id: 3,
    title: 'Evolução de jornada em etapa crítica',
    tags: ['UX/UI', 'Front-end'],
    impact: 'Menos atrito em etapa chave · [X%]',
    print: '[PRINT_3]',
    problem: '[PROBLEMA_3]',
    actions: ['[ACAO_3_1]', '[ACAO_3_2]', '[ACAO_3_3]'],
    result: '[RESULTADO_3]',
    evidence: '[LINK_3]',
  },
  {
    id: 4,
    title: 'Tracking e validação de eventos',
    tags: ['Dados', 'CRO'],
    impact: 'Métricas confiáveis pra decisão · [X eventos]',
    print: '[PRINT_4]',
    problem: '[PROBLEMA_4]',
    actions: ['[ACAO_4_1]', '[ACAO_4_2]', '[ACAO_4_3]'],
    result: '[RESULTADO_4]',
    evidence: '[LINK_4]',
  },
  {
    id: 5,
    title: 'Performance / percepção de velocidade',
    tags: ['Front-end', 'Qualidade'],
    impact: 'Menos abandono por lentidão · [X%]',
    print: '[PRINT_5]',
    problem: '[PROBLEMA_5]',
    actions: ['[ACAO_5_1]', '[ACAO_5_2]', '[ACAO_5_3]'],
    result: '[RESULTADO_5]',
    evidence: '[LINK_5]',
  },
  {
    id: 6,
    title: 'Frete / logística e regras de entrega',
    tags: ['Integração', 'Operação'],
    impact: 'Regras de frete mais estáveis · [X]',
    print: '[PRINT_6]',
    problem: '[PROBLEMA_6]',
    actions: ['[ACAO_6_1]', '[ACAO_6_2]', '[ACAO_6_3]'],
    result: '[RESULTADO_6]',
    evidence: '[LINK_6]',
  },
  {
    id: 7,
    title: 'Padronização de componentes',
    tags: ['UI', 'Escala'],
    impact: 'Mais consistência e menos retrabalho · [X]',
    print: '[PRINT_7]',
    problem: '[PROBLEMA_7]',
    actions: ['[ACAO_7_1]', '[ACAO_7_2]', '[ACAO_7_3]'],
    result: '[RESULTADO_7]',
    evidence: '[LINK_7]',
  },
  {
    id: 8,
    title: 'Bug crítico com time externo',
    tags: ['Coordenação', 'Entrega'],
    impact: 'Resolução mais rápida e rastreável · [Z dias]',
    print: '[PRINT_8]',
    problem: '[PROBLEMA_8]',
    actions: ['[ACAO_8_1]', '[ACAO_8_2]', '[ACAO_8_3]'],
    result: '[RESULTADO_8]',
    evidence: '[LINK_8]',
  },
];

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
  
    const scrollToPrev = () => {
      if (isPaused) return;
      
      if (api.canScrollPrev()) {
        api.scrollPrev();
      } else {
        api.scrollTo(cases.length - 1);
      }
    };
  
    const intervalId = window.setInterval(scrollToPrev, 1500);
  
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [api, isPaused]);

  const { ref, isVisible } = useInView();

  return (
    <section id="cases" className="py-16 bg-secondary/30 overflow-hidden scroll-mt-24">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-5xl px-4 md:px-6 transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-end justify-between mb-6 md:mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
              Cases entregues (evidências)
            </h2>
            <p className="text-sm text-muted-foreground">
              Passe pro lado. Cada card traz um resumo; ao abrir, você vê problema, execução, resultado e evidências.
            </p>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
          <button 
  onClick={() => {
    setIsPaused(true);
    api?.scrollPrev();
  }}
  className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
>
              <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <span className="text-xs text-muted-foreground px-2">
              {current + 1} / {cases.length}
            </span>
            <button onClick={() => {
    setIsPaused(true);
    api?.scrollNext();
  }}
  className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="cases-carousel-mask relative overflow-visible" 
        onMouseEnter={() => setIsPaused(true)} 
        onMouseLeave={() => setIsPaused(false)}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-4">
            {cases.map((caseItem) => (
              <CarouselItem key={caseItem.id} className="pl-4 md:pl-4 basis-[280px] md:basis-[320px]">
                <button
                  onClick={() => setSelectedCase(caseItem)}
                  className="w-full text-left p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group h-full flex flex-col relative"
                >
                  {caseItem.year != null && (
                    <span
                      className="absolute top-0 right-0 z-10 text-xs font-medium px-2.5 py-1 text-white shadow-sm"
                      style={{
                        backgroundColor: '#009c3b',
                        borderTopRightRadius: '1rem',
                        borderBottomLeftRadius: '0.5rem',
                        borderBottomRightRadius: '0.5rem',
                        borderTopLeftRadius: 0,
                      }}
                    >
                      {caseItem.year}
                    </span>
                  )}
                  <div className="aspect-video w-full rounded-xl bg-secondary/50 border border-border/50 mb-4 flex items-center justify-center relative overflow-hidden">
                    {caseItem.print.startsWith('/') || caseItem.print.startsWith('http') ? (
                      <img
                        src={caseItem.print}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">{caseItem.print}</span>
                    )}
                    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex gap-2 mb-3">
                    {caseItem.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 whitespace-pre-line">
                    {caseItem.title}
                  </h3>
                  
                  {/* Impact */}
                  <p className="text-xs text-muted-foreground mt-auto leading-relaxed">
                    {caseItem.impact}
                  </p>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="flex gap-1">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current 
                  ? 'bg-primary w-4' 
                  : 'bg-muted-foreground/20 w-1 hover:bg-muted-foreground/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] flex flex-col p-0 gap-0 bg-card border-border overflow-hidden">
          {selectedCase && (
            <>
              {(selectedCase.print.startsWith('/') || selectedCase.print.startsWith('http')) && (
                <div className="w-full flex-shrink-0 overflow-hidden rounded-t-lg">
                  <img
                    src={selectedCase.print}
                    alt=""
                    className="w-full object-cover object-top"
                    style={{ height: 'clamp(160px, 28vw, 260px)' }}
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 min-h-0 relative">
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10 bg-gradient-to-t from-card to-transparent" aria-hidden />
                <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none z-10 bg-gradient-to-b from-card to-transparent" aria-hidden />
                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-5 md:p-8 pb-8">
                <DialogHeader className="pr-10 sm:pr-12 pb-4 pt-1 space-y-2 text-left">
                  <DialogTitle className="text-lg font-semibold text-foreground break-words leading-snug whitespace-pre-line">
                    {selectedCase.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="p-5 md:p-6 rounded-xl bg-secondary/50 border border-border">
                    <h4 className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
                      {selectedCase.problemLabel ?? 'Problema'}
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed">{selectedCase.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">O que eu fiz</h4>
                    <div className="relative pl-6">
                      <span className="absolute left-[0.4rem] top-2 bottom-2 w-px bg-border" aria-hidden />
                      <ul className="relative space-y-3">
                        {selectedCase.actions.map((action, i) => (
                          <li key={i} className="relative flex gap-3 items-start leading-relaxed">
                            <span className="w-5 h-5 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 relative z-[1] bg-card">
                              {i + 1}
                            </span>
                            <span className="text-sm text-muted-foreground">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="text-xs font-medium text-primary uppercase tracking-wide">Resultado</h4>
                    </div>
                    <p className="text-sm text-foreground font-medium leading-relaxed">{selectedCase.result}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Evidências</h4>
                    {selectedCase.evidences?.length ? (
                      <ul className="space-y-2">
                        {selectedCase.evidences.map((ev, i) => (
                          <li key={i}>
                            <a
                              href={ev.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline inline-flex items-center gap-1.5 group"
                            >
                              {ev.label}
                              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1.5 group"
                      >
                        {selectedCase.evidence}
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Cases;
