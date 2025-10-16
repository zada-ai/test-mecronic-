import { useMenu } from "@/hooks/use-menu";
import { cn } from "@/lib/utils";
import { MENU_NAVBAR } from "@/config/layout-18.config";
import { useLayout } from "./context";
import { Button } from "@/components/ui/button";
import { Coffee, Pin, MessageSquareCode, Search } from "lucide-react";
import { Input, InputWrapper } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const pathname = usePathname();
  const { isActive } = useMenu(pathname);
  const { isMobile } = useLayout();

  const handleInputChange = () => {};

  return (
    <div
      className={cn(
        "flex items-stretch w-full h-[46px] px-5 gap-5",
        isMobile ? "justify-end" : "justify-between"
      )}
    >
      {!isMobile && (
        <ScrollArea>
          <nav className="list-none flex items-stretch overflow-x-auto gap-7.5 h-[46px]">
            {MENU_NAVBAR.map((item, index) => {
              const active = isActive(item.path);
              return (
                <li key={index} className="flex items-stretch">
                  <Link
                    href={item.path || '#'}
                    className={cn(
                      "gap-2 inline-flex items-center border-b border-transparent text-sm font-normal whitespace-nowrap text-secondary-foreground hover:text-primary py-2.5 lg:py-0", 
                      "[&_svg]:text-muted-foreground",
                      active && "text-primary border-primary [&_svg]:text-primary")}
                  >
                    {item.icon && <item.icon className="size-4"/>}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </nav>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      <div className="flex items-center gap-2.5">
        <Button mode="icon" variant="outline" size="sm"><Coffee /></Button>
        <Button mode="icon" variant="outline" size="sm"><MessageSquareCode /></Button>
        <Button mode="icon" variant="outline" size="sm"><Pin /></Button>

        <InputWrapper className="w-full lg:w-40" variant="sm">
          <Search />
          <Input type="search" placeholder="Search Account" onChange={handleInputChange} />
        </InputWrapper>
      </div>
    </div>
  );
}
