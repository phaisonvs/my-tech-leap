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

const createGenericCase = (
  id: number,
  title: string,
  print: string,
  tags: string[]
): CaseItem => ({
  id,
  title,
  tags,
  impact: `${title} com foco em experiência, execução técnica e conversão.`,
  print,
  problem:
    `A frente "${title}" exigia evolução de jornada e execução de front-end para reduzir atrito e sustentar crescimento do funil.`,
  problemLabel: 'Contexto / Dor',
  actions: [
    `Mapeei o escopo de "${title}" e defini a solução com foco em clareza e consistência da jornada.`,
    'Implementei interface e regras técnicas necessárias para publicação com estabilidade.',
    'Validei comportamento responsivo, acompanhamento de métricas e alinhamento com a operação.',
  ],
  result: `${title} publicado com jornada mais clara e base pronta para evolução contínua.`,
  evidence: `[LINK_${id}]`,
  year: 2023,
});

const cases: CaseItem[] = [
  {
    id: 1,
    title: 'Localpage',
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
    title: 'Black Friday ABC',
    tags: ['CRO', 'Front-end', 'Campanha'],
    impact: 'Landing e fluxo de conversão para campanha Black Friday com foco em clareza e performance.',
    print: '/cases/2-black-friday-abc.jpg',
    problem: 'A campanha Black Friday exigia uma experiência dedicada, com mensagem clara, CTAs visíveis e integração com estoque/preço para evitar fricção no pico de demanda.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei a landing da Black Friday com hierarquia visual e CTAs alinhados ao funil.',
      'Garanti responsividade e carregamento otimizado para tráfego de pico.',
      'Integrei com regras de estoque e exibição de ofertas para consistência da jornada.',
    ],
    result: 'Campanha publicada em tempo hábil com experiência estável e conversão alinhada aos objetivos da data.',
    evidence: '[LINK_2]',
    year: 2022,
  },
  {
    id: 3,
    title: 'Visita à obra',
    tags: ['UX/UI', 'Jornada'],
    impact: 'Jornada de agendamento e experiência de visita à obra com foco em conversão e clareza.',
    print: '/cases/3-visita-a-obra.jpg',
    problem: 'Era necessário oferecer uma jornada clara de agendamento de visita à obra, reduzindo atrito e aumentando o preenchimento de formulários e conversão.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei o fluxo de visita à obra com formulário e confirmação claros.',
      'Ajustei copy e hierarquia visual para reduzir abandono em etapas críticas.',
      'Mantive consistência com o restante do site e padrões de acessibilidade.',
    ],
    result: 'Jornada de visita à obra publicada e estável, com melhor adesão e rastreio de conversão.',
    evidence: '[LINK_3]',
    year: 2022,
  },
  {
    id: 4,
    title: 'Página de cupons',
    tags: ['UX/UI', 'Front-end', 'CRO'],
    impact: 'Página de cupons com destaque de ofertas e CTAs para aumento de uso e conversão.',
    print: '/cases/4-pagina-de-cupons.jpg',
    problem: 'A página de cupons precisava ser mais clara e acionável, com ofertas em destaque e caminho óbvio para uso no checkout.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Reestruturei a página de cupons com layout focado em descoberta e uso do cupom.',
      'Implementei componentes reutilizáveis e estados de copy válido/expirado.',
      'Alinhei exibição com regras de elegibilidade e integração ao fluxo de compra.',
    ],
    result: 'Página de cupons mais clara e utilizável, com melhor percepção de valor e uso no funil.',
    evidence: '[LINK_4]',
    year: 2022,
  },
  {
    id: 5,
    title: 'Página de encarte lead',
    tags: ['UX/UI', 'Front-end'],
    impact: 'Evolução da experiência de cupons com foco em clareza e conversão.',
    print: '/cases/5-pagina-de-encarte-lead.jpg',
    problem: 'Evolução contínua da página de cupons para melhorar descoberta, legibilidade e taxa de aplicação no checkout.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Ajustes de layout e hierarquia visual na listagem de cupons.',
      'Refinamento de estados (válido, expirado, já utilizado) e feedback ao usuário.',
      'Alinhamento com métricas de uso de cupom e impacto em conversão.',
    ],
    result: 'Experiência de cupons evoluída com menor fricção e melhor adesão às ofertas.',
    evidence: '[LINK_5]',
    year: 2022,
  },
  {
    id: 6,
    title: 'Login Users Prime',
    tags: ['UX/UI', 'Front-end', 'Autenticação'],
    impact: 'Fluxo de login e experiência para usuários Prime com redução de atrito e clareza.',
    print: '/cases/6-login-users-prime.jpg',
    problem: 'O fluxo de login para usuários Prime precisava ser claro, seguro e alinhado ao restante da jornada para evitar abandono em etapa crítica.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei o fluxo de login dedicado aos usuários Prime.',
      'Garanti responsividade, mensagens de erro claras e integração com autenticação.',
      'Mantive consistência visual e de copy com o programa e o site.',
    ],
    result: 'Login Prime estável e compreensível, com menor atrito e melhor rastreio de conversão.',
    evidence: '[LINK_6]',
    year: 2022,
  },
  {
    id: 7,
    title: 'Checkout ABC da Construção',
    tags: ['CRO', 'Front-end', 'Checkout'],
    impact: 'Checkout ABC com foco em clareza, redução de atrito e conversão na etapa final.',
    print: '/cases/7-checkout-abc-da-construcao.jpg',
    problem: 'O checkout precisava de revisão de UX e consistência técnica para reduzir abandono e falhas na etapa final do funil.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Revisei e implementei melhorias no fluxo de checkout (revisão de pedido, frete, pagamento).',
      'Padronizei componentes e mensagens de erro para reduzir confusão.',
      'Garanti integração estável com frete e pagamento e acompanhamento de eventos de conversão.',
    ],
    result: 'Checkout mais claro e estável, com menor abandono e métricas de conversão mensuráveis.',
    evidence: '[LINK_7]',
    evidences: [
      { label: 'Checkout ABC da Construção', href: '#' },
      { label: 'Checkout ABC Prime', href: '#' },
    ],
    year: 2022,
  },
  {
    id: 8,
    title: 'Checkout ABC Prime',
    tags: ['CRO', 'Front-end', 'Checkout'],
    impact: 'Versão do checkout para usuários Prime com benefícios visíveis e fluxo dedicado.',
    print: '/cases/8-checkout-abcprime.jpg',
    problem: 'Usuários Prime precisavam de uma experiência de checkout que destacasse benefícios (frete, ofertas) sem quebrar o fluxo padrão.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Implementei a variante de checkout para usuários Prime com exibição de benefícios.',
      'Mantive reuso de componentes do checkout principal e regras específicas para Prime.',
      'Garanti rastreio de conversão separado para análise de performance do programa.',
    ],
    result: 'Checkout Prime publicado com experiência diferenciada e conversão monitorada.',
    evidence: '[LINK_8]',
    year: 2022,
  },
  {
    id: 9,
    title: 'Header menu ABC da Construção',
    tags: ['UX/UI', 'Front-end', 'Navegação'],
    impact: 'Header e menu padronizados para melhor navegação e descoberta no site.',
    print: '/cases/9-header-menu-abc-da-construcao.jpg',
    problem: 'O header e o menu precisavam ser consistentes, acessíveis e alinhados às jornadas de conversão em todas as páginas.',
    problemLabel: 'Contexto / Dor',
    actions: [
      'Desenhei e implementei o header e o menu com estrutura reutilizável e responsiva.',
      'Organizei a navegação por prioridade e alinhei com SEO e rotas do diretório.',
      'Mantive estados de hover/foco e acessibilidade para teclado e leitores de tela.',
    ],
    result: 'Header e menu estáveis em todo o site, com melhor orientação e menor fricção na navegação.',
    evidence: '[LINK_9]',
    year: 2022,
  },
  createGenericCase(
    10,
    'Novo Front E-com ABC',
    '/cases/10-novo-front-e-com-abc.jpg',
    ['Front-end', 'UX/UI', 'Plataforma']
  ),
  createGenericCase(
    11,
    'Página Login Ecom ABC',
    '/cases/11-pagina-login-ecom-abc.jpg',
    ['UX/UI', 'Front-end', 'Autenticação']
  ),
  createGenericCase(
    12,
    'LP Amigo Pé Quente',
    '/cases/12-lp-amigo-pe-quente.jpg',
    ['CRO', 'Front-end', 'LP']
  ),
  createGenericCase(
    13,
    'LP Liquida ABC',
    '/cases/12-lpliquidaabc.jpg',
    ['CRO', 'Front-end', 'LP']
  ),
  createGenericCase(
    14,
    'Migração LPs',
    '/cases/12-migração-lps.jpg',
    ['CRO', 'Front-end', 'Migração']
  ),
  createGenericCase(
    15,
    'PDP Pisos e Revestimentos',
    '/cases/12-pdp-pisos-e-revestimentos.jpg',
    ['CRO', 'UX/UI', 'PDP']
  ),
  createGenericCase(
    16,
    'Regionalização de Preços',
    '/cases/13-regionalizacao-de-preços.jpg',
    ['CRO', 'Pricing', 'Front-end']
  ),
  createGenericCase(
    17,
    'Integração Loja Duratex',
    '/cases/14-Integracao-loja-duratex.jpg',
    ['Integração', 'Front-end', 'Operação']
  ),
  createGenericCase(
    18,
    'Integração Loja Duratex (Fase 2)',
    '/cases/15-Integracao-loja-duratex.jpg',
    ['Integração', 'Front-end', 'Operação']
  ),
  createGenericCase(
    19,
    'Casa Dexco',
    '/cases/16-casa-dexco.jpg',
    ['UX/UI', 'Front-end', 'Marca']
  ),
  createGenericCase(
    20,
    'PDP Loja Duratex',
    '/cases/18-pdp-loja-duratex.jpg',
    ['CRO', 'UX/UI', 'PDP']
  ),
  createGenericCase(
    21,
    'PDP Loja Duratex (Fase 2)',
    '/cases/19-pdp-loja-duratex.jpg',
    ['CRO', 'UX/UI', 'PDP']
  ),
  createGenericCase(
    22,
    'Setup Nova Loja ABC Prime',
    '/cases/17-setup-nova-loja-abc-prime.jpg',
    ['UX/UI', 'Front-end', 'Setup']
  ),
  createGenericCase(
    23,
    'LP Chance Única',
    '/cases/20-lp-chance-única.jpg',
    ['CRO', 'Front-end', 'LP']
  ),
  createGenericCase(
    24,
    'Tracking Leads Expansão',
    '/cases/21-tracking-leads-expansao.jpeg',
    ['Analytics', 'Tracking', 'Leads']
  ),
  createGenericCase(
    25,
    'LP Semana do Consumidor',
    '/cases/25-lp-semana-do-consumidor.jpg',
    ['CRO', 'Front-end', 'Campanha']
  ),
  createGenericCase(
    26,
    'Design System ABC',
    '/cases/22-design-system-abc.jpg',
    ['Design System', 'UX/UI', 'Front-end']
  ),
  createGenericCase(
    27,
    'Programa de Indicação Franqueado',
    '/cases/22-programa-de-indicacao-franqueado.jpg',
    ['UX/UI', 'Front-end', 'Programa']
  ),
  createGenericCase(
    28,
    'E-mails Transacionais',
    '/cases/23-e-mails-transacionais.jpg',
    ['E-mail', 'Transacional', 'Comunicação']
  ),
  createGenericCase(
    29,
    'LP ABC Prime',
    '/cases/23-lp-abc-primeo.jpg',
    ['CRO', 'Front-end', 'LP']
  ),
];

const getCaseOrderFromPrint = (print: string) => {
  const match = print.match(/\/cases\/(\d+)-/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const orderedCases = [...cases].sort((a, b) => {
  const orderDiff = getCaseOrderFromPrint(a.print) - getCaseOrderFromPrint(b.print);
  if (orderDiff !== 0) return orderDiff;
  return a.print.localeCompare(b.print, 'pt-BR', { sensitivity: 'base' });
});

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 1800, stopOnInteraction: false, stopOnMouseEnter: true })
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
    api?.scrollPrev();
    autoplayPlugin.current.reset();
  }}
  className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
>
              <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <span className="text-xs text-muted-foreground px-2">
              {current + 1} / {orderedCases.length}
            </span>
            <button onClick={() => {
    api?.scrollNext();
    autoplayPlugin.current.reset();
  }}
  className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all group"
>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div className="cases-carousel-mask relative overflow-visible">
        <Carousel
          setApi={setApi}
          plugins={[autoplayPlugin.current]}
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-4">
            {orderedCases.map((caseItem) => (
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
                        className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
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
                  <p className="text-xs text-muted-foreground leading-relaxed">
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
          {orderedCases.map((_, i) => (
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
