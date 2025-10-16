import { Header } from './header';

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main className="flex flex-col grow pt-(--header-height-mobile) lg:pt-(--header-height) bg-muted/30" role="content">
        {children}
      </main>
    </>
  );
}
