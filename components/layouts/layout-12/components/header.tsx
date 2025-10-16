import { useLayout } from './context';
import { HeaderLogo } from './header-logo';
import { HeaderSearch } from './header-search';
import { HeaderToolbar } from './header-toolbar';

export function Header() {
  const { isMobile } = useLayout();

  return (
    <header className="flex items-stretch fixed z-10 top-0 start-0 end-0 shrink-0 bg-background/95 border-b border-border backdrop-blur-sm supports-backdrop-filter:bg-background/60 h-(--header-height-mobile) lg:h-(--header-height) pe-[var(--removed-body-scroll-bar-size,0px)]">
      <div className="@container grow pe-5 flex items-stretch justify-between gap-2.5">
        <div className="flex items-stretch">
          <HeaderLogo />
        </div>
        {!isMobile && <HeaderSearch />}
        <HeaderToolbar />
      </div>
    </header>
  );
}
