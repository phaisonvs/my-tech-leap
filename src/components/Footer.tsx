import mysaLogo from '@/assets/mysa-logo.png';
import { useInView } from '@/hooks/use-in-view';

const Footer = () => {
  const { ref, isVisible } = useInView();

  return (
    <footer className="py-10 px-6 border-t border-border">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-4xl flex flex-col items-center gap-4 transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <img 
          src={mysaLogo} 
          alt="MYSA" 
          className="h-4 w-auto brightness-0 invert opacity-50"
        />
        <p className="text-xs text-muted-foreground">
          desenvolvido por <span className="text-foreground">Phaison Vieira</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
