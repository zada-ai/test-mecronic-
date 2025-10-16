import { useMenu } from "@/hooks/use-menu";
import { cn } from "@/lib/utils";
import { MENU_TOOLBAR } from "@/config/layout-14.config";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function ToolbarMenu() {
  const pathname = usePathname();
  const { isActive } = useMenu(pathname);

  return (
    <div className="flex items-stretch">
      <nav className="list-none flex items-stretch gap-2">
        {MENU_TOOLBAR.map((item, index) => {
          const active = isActive(item.path);

          return (
            <Button 
              key={index}
              size="sm"
              variant="ghost"
              className={cn(
                "inline-flex items-center text-sm font-medium",
                active 
                  ? "bg-muted text-foreground" 
                  : "text-secondary-foreground hover:text-primary"
              )}
              asChild
            >
              <Link href={item.path || '#'}>
                {item.icon && <item.icon className="mr-2" />}
                {item.title}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  );
}
