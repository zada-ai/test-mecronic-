import { Search } from "lucide-react";
import { Input, InputWrapper } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function SidebarSearch() {
  const handleInputChange = () => {};

  return (
    <div className="flex p-5 shrink-0 border-b border-border">
      <InputWrapper>
        <Search />
        <Input type="search" placeholder="Search" onChange={handleInputChange} />
        <Badge variant="outline" className="whitespace-nowrap" size="sm">⌘ K</Badge>
      </InputWrapper>
    </div>
  );
}
