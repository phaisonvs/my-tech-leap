import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TLDR from '@/components/TLDR';
import Cases from '@/components/Cases';
import Scope from '@/components/Scope';
import Evolution from '@/components/Evolution';
import Request from '@/components/Request';
import Footer from '@/components/Footer';
import { dataUiPath } from '@/lib/data-ui';

const Index = () => {
  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      data-ui={dataUiPath('page', 'home', 'root')}
    >
      <Header />
      <main data-ui={dataUiPath('page', 'home', 'main')}>
        <Hero />
        <TLDR />
        <Cases />
        <Scope />
        <Evolution />
        <Request />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
