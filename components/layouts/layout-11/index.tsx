import { Metadata } from 'next';
import { Wrapper } from './components/wrapper';
import { LayoutProvider } from './components/context';

// Generate metadata for the layout
export async function generateMetadata(): Promise<Metadata> {
  // You can access route params here if needed
  // const { params } = props;
  
  return {
    title: 'Dashboard',
    description: '',
  };
}

export function Layout11({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider
      bodyClassName="bg-muted overflow-hidden"
      style={{
        '--sidebar-width': '240px',
        '--sidebar-width-mobile': '240px',
        '--header-height': '54px',
        '--header-height-mobile': '54px',
      } as React.CSSProperties}
    >
      <Wrapper>
        {children}
      </Wrapper>
    </LayoutProvider>
  );
}
