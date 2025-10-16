import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User,
  Settings,
  Building2,
  ChevronDown,
  Check,
  Plus,
  Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLayout } from './context';

interface Workspace {
  id: string;
  name: string;
  state: string;
  isCurrent: boolean;
}

const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Keenthemes',
		state: 'bg-emerald-500',
    isCurrent: true,
  },
  {
    id: '2',
    name: 'Studio',
		state: 'bg-indigo-500',
    isCurrent: false,
  },
  {
    id: '3',
    name: 'ReUI',
		state: 'bg-pink-500',
    isCurrent: false,
  },
];

export function HeaderTitle() {
	const { isMobile } = useLayout();

	return (
		<div className="group flex justify-between items-center gap-2.5 shrink-0">
			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="flex items-center justify-between gap-1 px-1.5 hover:bg-accent -ms-0.5">
							{!isMobile && <span className="text-foreground text-sm font-medium">Metronic Team</span>}
							<ChevronDown className="size-4 text-muted-foreground"/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-64" side="bottom" align="start" sideOffset={7} alignOffset={0}>
						{/* Account Section */}
						<DropdownMenuLabel>Team</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<User className="size-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="size-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Crown className="size-4" />
								<span>Upgrade</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>

						{/* Workspaces Section */}
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Workspaces</DropdownMenuLabel>
						<DropdownMenuGroup>
							{mockWorkspaces.map((workspace) => (
								<DropdownMenuItem key={workspace.id} className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className={cn("rounded-md text-white text-xs uppercase shrink-0 size-5 flex items-center justify-center", workspace.state)}>{workspace.name[0]}</span>
										<span className="truncate">{workspace.name}</span>
									</div>
									<div className="flex items-center gap-2">
										{workspace.isCurrent && (
											<Check className="size-4 text-primary" />
										)}
									</div>
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Plus className="size-4" />
								<span>New Workspace</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuItem>
							<Building2 className="size-4" />
							<span>Workspace Settings</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
