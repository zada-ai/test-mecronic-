import { PanelRight } from 'lucide-react';
import { useLayout } from './context';
import { Button } from '@/components/ui/button';
import { toAbsoluteUrl } from '@/lib/helpers';
import Link from 'next/link';

export function SidebarHeader() {
  const { sidebarToggle } = useLayout();

  return (
    <div className="flex items-center lg:py-5 pb-4 gap-2 ">
      <div className="flex items-center w-full">
        {/* Sidebar header */}
        <div className="flex w-full grow items-center justify-between px-5 gap-2.5">
          <Link href="/layout-26" className="flex items-center gap-2">
            <div
              className="
                flex items-center p-[5px]
                rounded-[6px] border border-white/30
                bg-[#000]
                bg-[radial-gradient(97.49%_97.49%_at_50%_2.51%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_100%)]
                shadow-[0_0_0_1px_#000]
              "
            >
              <img src={toAbsoluteUrl('/media/app/logo-35.svg')} alt="image" className="min-w-[18px]" />
            </div>
            <span className="text-mono text-lg font-semibold hidden lg:block">
              Metronic
            </span>
          </Link>

          {/* Sidebar toggle */}
          <Button
            mode="icon"
            variant="ghost"
            onClick={sidebarToggle}
            className="hidden lg:inline-flex text-muted-foreground hover:text-foreground"
          >
            <PanelRight className="opacity-100" />
          </Button>
        </div>        
      </div>
    </div>
  );
}
