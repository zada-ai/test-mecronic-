import {
  AccordionMenu,
  AccordionMenuItem,
} from '@/components/ui/accordion-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Plus, StickyNote, PinOff, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ellipsis } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLayout } from './layout-context';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/config/layout-15.config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function TasksDropdownMenu({ trigger }: { trigger: React.ReactNode }) {
  const { pinSidebarNavItem, sidebarCollapse } = useLayout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          {sidebarCollapse ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span>{trigger}</span>
              </TooltipTrigger>
              <TooltipContent align="center" side="right" sideOffset={28}>
                Tasks
              </TooltipContent>
            </Tooltip>
          ) : (
            trigger
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56" 
        align={sidebarCollapse ? 'start' : 'start'} 
        side={sidebarCollapse ? 'right' : 'bottom'} 
        sideOffset={sidebarCollapse ? 20 : 10} 
        alignOffset={sidebarCollapse ? -7 : 5}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Plus />
            <span>Add Task</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Recent</DropdownMenuLabel>
          <DropdownMenuItem>
            <StickyNote />
            <span>Recent 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <StickyNote />
            <span>Recent 2</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => pinSidebarNavItem('tasks')}>
          <PinOff/>
          <span>Unpin from sidebar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MoreDropdownMenu({ item }: { item: NavItem }) {
  const { isSidebarNavItemPinned, unpinSidebarNavItem,pinSidebarNavItem, getSidebarNavItems, sidebarCollapse } = useLayout();
  const navItems = getSidebarNavItems();
  const pinnableNavItems = navItems.filter((item: NavItem) => item.pinnable);
  const handlePin = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (isSidebarNavItemPinned(id)) {
      unpinSidebarNavItem(id);
    } else {
      pinSidebarNavItem(id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center grow gap-2.5 font-medium">
          {sidebarCollapse ? (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <span>{item.icon && <item.icon />}</span>
              </TooltipTrigger>
              <TooltipContent align="center" side="right" sideOffset={28}>
                {item.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            item.icon && <item.icon />
          )}

          <span className="in-data-[sidebar-collapsed]:hidden">{item.title}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right" align="start" sideOffset={18} alignOffset={-5}>
        {pinnableNavItems.map((item: NavItem) => (
          <DropdownMenuItem className="cursor-pointer" key={item.id} onClick={(e) => handlePin(item.id, e)}>
            <div className="flex items-center gap-2.5">
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </div>
            {isSidebarNavItemPinned(item.id) ? (
              <Pin className={cn('ms-auto text-primary')}/>
            ) : (
              <PinOff className={cn('ms-auto text-muted-foreground')}/>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavItem({ item }: { item: NavItem }) {
  const trigger = (
    <Button variant="ghost" className="size-6 hover:bg-input in-data-[state=open]:bg-input" size="icon">
      <Ellipsis className="size-3.5"/>
    </Button>
  );

  let mainContent: React.ReactNode = null;
  if (item.dropdown) {
    if (item.id === 'more') {
      mainContent = <MoreDropdownMenu item={item} />;
    } else {
      // Add other dropdowns if needed
      mainContent = null;
    }
  } else if (item.path) {
    mainContent = (
      <Link href={item.path} className="flex items-center grow gap-2.5 font-medium">
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </Link>
    );
  } else {
    mainContent = (
      <div className="flex items-center grow gap-2.5 font-medium">
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </div>
    );
  }

  return (
    <>
      {mainContent}
      {(item.more || item.new) && (
        <div className="opacity-0 flex items-center gap-1 group-hover:opacity-100 [&:has([data-state=open])]:opacity-100">
          {item.more && (
            <>
              {item.id === 'tasks' && <TasksDropdownMenu trigger={trigger}/>}
            </>
          )}
          {item.new && (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="size-6 hover:bg-input" size="icon">
                  <Link href={item.new.path}>
                    <Plus className='size-3.5 opacity-100'/>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center" side="right" sideOffset={28}>
                {item.new.tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      )}
      {item.badge && (
        <Badge size="xs" variant="primary" className="text-[11px] group-hover:hidden group-has-[[data-state=open]]:hidden me-1">{item.badge}</Badge>
      )}
    </>
  );
}

function NavItemCollapsed({ item }: { item: NavItem }) {
  // Dropdown case (e.g. tasks)
  if (item.more && item.id === 'tasks') {
    return <TasksDropdownMenu trigger={item.icon && <item.icon />} />;
  }

  // More case
  if (item.dropdown && item.id === 'more') {
    return <MoreDropdownMenu item={item} />;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {item.path ? (
          <Link href={item.path}>
            {item.icon && <item.icon />}
          </Link>
        ) : (
          <span>
            {item.icon && <item.icon />}
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent align="center" side="right" sideOffset={28}>
        {item.title}
      </TooltipContent>
    </Tooltip>  
  )
}

export function SidebarDefaultNav() {
  const pathname = usePathname();
  const { getSidebarNavItems, sidebarCollapse } = useLayout();
  const filteredNavItems = getSidebarNavItems().filter((item: NavItem) => (item.pinnable && item.pinned) || !item.pinnable);
  const matchPath = (path: string) => path === pathname || (path.length > 1 && pathname.startsWith(path));

  return (
    <div className="px-(--sidebar-space-x)">
      <AccordionMenu
        type="single"
        matchPath={matchPath}
        classNames={{
          root: 'space-y-0.5',
          item: 'group py-0 h-8 [&:has([data-state=open])]:bg-accent justify-between cursor-pointer'
        }}
        collapsible
      >
        {filteredNavItems.map((item: NavItem) => (
          <AccordionMenuItem
            key={item.id}
            asChild
            value={item.path || item.id}
          >
            <div>
              {sidebarCollapse ? <NavItemCollapsed item={item}/> : <NavItem item={item}/>}
            </div>
          </AccordionMenuItem>
          ))}
      </AccordionMenu>
    </div>
  );
};
