import { TrendingUp, Zap, Shield, Target, Users } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    icon: TrendingUp,
    title: 'Impacto em conversão/receita',
    value: '[X%] / [R$Y]',
    primary: true,
  },
  {
    icon: Zap,
    title: 'Velocidade de entrega',
    value: '[N releases] em [Z semanas]',
    primary: true,
  },
  {
    icon: Shield,
    title: 'Estabilidade / risco evitado',
    value: '[N incidentes] a menos',
    primary: true,
  },
  {
    icon: Target,
    title: 'Precisão em testes',
    value: '[N testes] / [X% cobertura]',
    primary: false,
  },
  {
    icon: Users,
    title: 'Colaboração cross-team',
    value: '[N squads] integradas',
    primary: false,
  },
];

const Hero = () => {
  const { ref, isVisible } = useInView();
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  useEffect(() => {
    if (!isMobile || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.stat-card');
    
    const handleScroll = () => {
      const container = cardsRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportHeight = window.innerHeight;
      
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const cardTop = cardRect.top;
        const cardHeight = cardRect.height;
        
        const scrollProgress = Math.max(0, Math.min(1, 
          (viewportHeight - cardTop) / (viewportHeight * 0.5)
        ));

        const baseOffset = index * 12;
        const dynamicOffset = baseOffset * (1 - scrollProgress);
        const scale = 0.95 + (scrollProgress * 0.05);
        const opacity = 0.4 + (scrollProgress * 0.6);

        if (cardTop < viewportHeight && cardTop > -cardHeight) {
          cardElement.style.transform = `translateY(${dynamicOffset}px) scale(${scale})`;
          cardElement.style.opacity = `${opacity}`;
          cardElement.style.zIndex = `${10 + index}`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const primaryStats = stats.filter(s => s.primary);
  const secondaryStats = stats.filter(s => !s.primary);

  return (
    <section className="min-h-screen flex flex-col md:justify-center pt-24 pb-16 px-6">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-5xl transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div 
          ref={headerRef}
          className="mb-0 md:mb-12 opacity-0 animate-[fade-in_0.8s_ease-out_forwards] sticky md:relative top-20 md:top-auto z-50 md:z-auto bg-background/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none pb-6 md:pb-0" 
          style={{ animationDelay: '100ms' }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-4">
            Formalização da atuação como{' '}
            <br className="hidden md:block" />
            <span className="text-primary">Tech Lead de CRO.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Meu papel vai além do UX/UI e responde por decisões que impactam conversão, receita e sustentação da operação.
          </p>
        </div>

        <div 
          ref={cardsRef} 
          className="mb-8"
          style={{
            marginTop: isMobile ? `${headerHeight + 24}px` : '0',
          }}
        >
          <div className="hidden md:grid md:grid-cols-3 gap-4 mb-4">
            {primaryStats.map((stat, index) => (
              <div
                key={index}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 opacity-0 animate-[fade-in_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${(index + 2) * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                    <stat.icon className="w-4 h-4 text-primary transition-transform group-hover:scale-125" />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.title}</span>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex md:justify-center md:gap-4">
            {secondaryStats.map((stat, index) => (
              <div
                key={index}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 opacity-0 animate-[fade-in_0.8s_ease-out_forwards] w-full max-w-[280px]"
                style={{ animationDelay: `${(primaryStats.length + index + 2) * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                    <stat.icon className="w-4 h-4 text-primary transition-transform group-hover:scale-125" />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.title}</span>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden flex flex-col gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 will-change-transform"
                style={{
                  position: 'sticky',
                  top: `${80 + headerHeight + 24 + index * 12}px`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                    <stat.icon className="w-4 h-4 text-primary transition-transform group-hover:scale-125" />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.title}</span>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden">
          <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-0 animate-[fade-in_0.8s_ease-out_forwards]" style={{ animationDelay: '700ms' }}>
            <div className="w-1 h-1 rounded-full bg-primary" />
            <p>
              Se tiver <span className="text-foreground">3 minutos</span>, veja os cases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
