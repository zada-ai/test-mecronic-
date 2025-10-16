import { Sidebar } from './sidebar';
import { Header } from './header';
import { useLayout } from './context';

export function Wrapper({ children }: { children: React.ReactNode }) {
  const { isMobile } = useLayout();

  return (
    <>
      <Header />

      <div className="flex grow pt-(--header-height-mobile) lg:pt-(--header-height)">
        {!isMobile && <Sidebar />}

        <div className="flex flex-col grow lg:ps-(--sidebar-width) lg:[&_.container-fluid]:px-7.5">
          <main className="grow pb-2.5" role="content">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
