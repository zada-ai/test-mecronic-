import { cn } from '@/lib/utils';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { useLayout } from './layout-context';
import { useIsMobile } from '@/hooks/use-mobile';

export function Layout({ children }: { children: React.ReactNode }) {
	const { sidebarCollapse } = useLayout();
	const isMobile = useIsMobile();

	const rootProps = {
		className: cn(
			'flex grow h-screen flex-col', 
			'[--header-height:40px]',
			'[--content-header-height:54px]',
			'[--sidebar-width:250px] [--sidebar-width-collapsed:52px] [--sidebar-header-height:54px] [--sidebar-footer-height:45px] [--sidebar-footer-collapsed-height:90px]'
		),
		...(sidebarCollapse === true && { 'data-sidebar-collapsed': true })
	};

	return (
		<div {...rootProps}>
			<Header />
			<div className="flex flex-1">
				{!isMobile && <Sidebar />}
				<main className="flex-1 flex flex-col mt-(--header-height) lg:mt-[calc(var(--header-height)+var(--content-header-height))] lg:ms-(--sidebar-width) lg:in-data-[sidebar-collapsed]:ms-(--sidebar-width-collapsed) transition-[margin] duration-200 ease-in-out">
					{children}
				</main>
			</div>
		</div>
	);
}
