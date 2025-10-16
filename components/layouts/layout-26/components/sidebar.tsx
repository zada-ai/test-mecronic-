import { SidebarMenu } from './sidebar-menu';
import { SidebarSearch } from './sidebar-search';
import { SidebarHeader } from './sidebar-header';

export function Sidebar() {
  return (
    <div className="fixed z-10 top-0 bottom-0 start-0flex flex-col items-stretch shrink-0 w-(--sidebar-width) lg:in-data-[sidebar-open=false]:w-0 transition-[width] duration-300 overflow-hidden">
      <div className="flex flex-col items-stretch shrink-0 w-(--sidebar-width)">
        <SidebarHeader />
        <SidebarSearch />
        <SidebarMenu />
      </div>
    </div>
  );
}
