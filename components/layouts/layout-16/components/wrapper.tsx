import { Sidebar } from './sidebar';
import { Header } from './header';
import { useLayout } from './context';

export function Wrapper({ children }: { children: React.ReactNode }) {
  const { isMobile } = useLayout();

  return (
    <div className="flex h-screen w-full [&_.container-fluid]:px-6">
      {!isMobile && <Sidebar />}
      
      <div className="flex flex-col flex-1 min-w-0 w-full">
        <Header />
        <main 
          className="flex-1 grow-full lg:ps-(--sidebar-width) pt-(--header-height-mobile) lg:pt-(--header-height)" 
          role="content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
