import { Fragment, ReactNode } from 'react';
import { MENU_SIDEBAR_COMPACT } from '@/config/layout-6.config';
import { MenuItem } from '@/config/types';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks/use-menu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export interface ToolbarHeadingProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
}

function Toolbar({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 pb-5">
      {children}
    </div>
  );
}

function ToolbarActions({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center flex-wrap gap-1.5 lg:gap-3.5">
      {children}
    </div>
  );
}

function ToolbarBreadcrumbs() {
  const pathname = usePathname();
  const { getBreadcrumb, isActive } = useMenu(pathname);
  const items: MenuItem[] = getBreadcrumb(MENU_SIDEBAR_COMPACT);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const active = item.path ? isActive(item.path) : false;

        return (
          <Fragment key={index}>
            {item.path ? (
              <Link
                href={item.path}
                className={cn(
                  'flex items-center gap-1',
                  active
                    ? 'text-mono'
                    : 'text-secondary-foreground hover:text-primary',
                )}
              >
                {item.title}
              </Link>
            ) : (
              <span
                className={cn(
                  isLast ? 'text-mono' : 'text-secondary-foreground',
                )}
              >
                {item.title}
              </span>
            )}
            {!isLast && <span className="text-muted-foreground">/</span>}
          </Fragment>
        );
      })}
    </div>
  );
}

const ToolbarHeading = ({ title = '' }: ToolbarHeadingProps) => {
  const pathname = usePathname();
  const { getCurrentItem } = useMenu(pathname);
  const item = getCurrentItem(MENU_SIDEBAR_COMPACT);

  return (
    <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-1 lg:gap-5">
      <h1 className="font-medium text-lg text-mono">{title || item?.title}</h1>
      <ToolbarBreadcrumbs />
    </div>
  );
};

export { Toolbar, ToolbarActions, ToolbarBreadcrumbs, ToolbarHeading };
