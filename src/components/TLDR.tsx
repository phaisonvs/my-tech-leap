import { Briefcase, Code2, RefreshCw } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const cards = [
  {
    icon: Briefcase,
    title: 'Desafios além do cargo',
    text: 'Para que as entregas definidas pela diretoria aconteçam, sempre foi necessário ir além do UX/UI: ser dono do projeto, conduzir a execução, assumir a execução técnica e garantir a sustentação.',
  },
  {
    icon: Code2,
    title: 'Execução técnica (front-end + integrações)',
    text: 'A execução não fica só no direcionamento: eu implemento front-end, integrações e tracking para destravar dependências e colocar a evolução em produção.',
  },
  {
    icon: RefreshCw,
    title: 'Sustentação e evolução do funil',
    text: 'Depois que vai ao ar, eu sigo sustentando o que é crítico e evoluindo correções e melhorias pelo impacto no funil, inclusive estruturando melhor os KPIs quando ainda não estão claros.',
  },
];

const TLDR = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="tldr" className="py-16 px-4 md:px-6 bg-secondary/30 scroll-mt-24">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-4xl transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Atuação no dia a dia
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((item, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-700 ease-out group ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                <item.icon className="w-5 h-5 text-primary icon-hover-effect" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TLDR;
