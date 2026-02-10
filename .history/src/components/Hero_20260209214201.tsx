import { TrendingUp, Zap, Shield } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const stats = [
  {
    icon: TrendingUp,
    title: 'Impacto em conversão/receita',
    value: '[X%] / [R$Y]',
  },
  {
    icon: Zap,
    title: 'Velocidade de entrega',
    value: '[N releases] em [Z semanas]',
  },
  {
    icon: Shield,
    title: 'Estabilidade / risco evitado',
    value: '[N incidentes] a menos',
  },
];

const Hero = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-4xl transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Main headline */}
        <div className="mb-12 opacity-0 animate-[fade-in_0.8s_ease-out_forwards]" style={{ animationDelay: '100ms' }}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-4">
            <span className="text-primary">Tech Lead (CRO)</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Meu papel vai além do UX/UI e responde por decisões que impactam conversão, receita e sustentação da operação.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
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

        {/* Microcopy */}
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
