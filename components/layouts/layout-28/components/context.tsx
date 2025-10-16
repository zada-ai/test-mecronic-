import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { TooltipProvider } from '@/components/ui/tooltip';

// Define the shape of the layout state
interface LayoutState {
  style: React.CSSProperties;
  bodyClassName: string;
  isMobile: boolean;
  isSidebarOpen: boolean;
  sidebarToggle: () => void;
}

// Create the context
const LayoutContext = createContext<LayoutState | undefined>(undefined);

// Provider component
interface LayoutProviderProps {
  children: ReactNode;
  style?: React.CSSProperties;
  bodyClassName?: string;
}

export function LayoutProvider({ children, style: customStyle, bodyClassName = '' }: LayoutProviderProps) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const cssVariables = useMemo(() => ({
    '--header-height': '60px',
    '--sidebar-width': '300px',
    '--sidebar-width-mobile': '300px',
    ...(customStyle || {})
  } as React.CSSProperties), [customStyle]);

  const style: React.CSSProperties = useMemo(() => ({
    ...cssVariables
  }), [cssVariables]);

  // Sidebar toggle function
  const sidebarToggle = () => setIsSidebarOpen((open) => !open);

  // Apply CSS variables to HTML root and set body attributes/classes
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const originalHtmlStyle = html.style.cssText;
    const originalBodyClasses = body.className;

    // Apply CSS variables to :root
    Object.entries(cssVariables).forEach(([prop, val]) => {
      html.style.setProperty(prop, val as string);
    });

    // Apply body classes
    if (bodyClassName) {
      body.className = `${originalBodyClasses} ${bodyClassName}`.trim();
    }

    // Reflect layout state via data attributes on body
    body.setAttribute('data-sidebar-open', isSidebarOpen.toString());

    return () => {
      html.style.cssText = originalHtmlStyle;
      body.className = originalBodyClasses;
      body.removeAttribute('data-sidebar-open');
    };
  }, [cssVariables, bodyClassName, isSidebarOpen]);

  return (
    <LayoutContext.Provider
      value={{
        bodyClassName,
        style,
        isMobile,
        isSidebarOpen,
        sidebarToggle
      }}
    >
      <div
        data-slot="layout-wrapper"
        className="flex grow"
      >
        <TooltipProvider delayDuration={0}>
          {children}
        </TooltipProvider>
      </div>
    </LayoutContext.Provider>
  );
}

// Custom hook for consuming the context
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
