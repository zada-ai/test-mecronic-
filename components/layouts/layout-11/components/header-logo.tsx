import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useLayout } from './context';
import { toAbsoluteUrl } from '@/lib/helpers';
import { HeaderMenuMobile } from './header-menu-mobile';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SidebarMenu } from './sidebar-menu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function HeaderLogo() {
  const pathname = usePathname();
  const { isMobile } = useLayout();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Close sheet when route changes
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  return (
    <div className="flex items-center gap-2">
      {isMobile && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" mode="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="p-0 gap-0 w-[225px] lg:w-(--sidebar-width)"
            side="left"
            close={false}
          >
            <SheetHeader className="p-0 space-y-0" />
            <SheetBody className="flex flex-col grow p-0">
              <HeaderMenuMobile />
              <SidebarMenu />
            </SheetBody>
          </SheetContent>
        </Sheet>
      )}
      <Link href="/layout-11">
        <img
          src={toAbsoluteUrl('/media/app/mini-logo-gray.svg')}
          className="dark:hidden size-6"
          alt="image"
        />
        <img
          src={toAbsoluteUrl('/media/app/mini-logo-gray-dark.svg')}
          className="hidden dark:inline-block size-6"
          alt="image"
        />
      </Link>
    </div>
  );
}
