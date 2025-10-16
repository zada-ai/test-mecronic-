import { useBodyClass } from '@/hooks/use-body-class';
import { Footer } from './footer';
import { Header } from './header';
import { Navbar } from './navbar';
import { useIsMobile } from '@/hooks/use-mobile';

export function Main({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  useBodyClass(`
    [--header-height:70px]
    bg-background!
  `);

  return (
    <div className="flex grow flex-col pt-(--header-height)">
      <Header />

      {!isMobile && <Navbar />}

      <main className="flex flex-col grow" role="content">
        {children}

        <Footer />
      </main>
    </div>
  );
}
