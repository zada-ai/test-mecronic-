'use client';

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Toolbar,
  ToolbarHeading,
  ToolbarPageTitle,
  ToolbarDescription,
  ToolbarActions,
} from "@/components/layouts/layout-22/components/toolbar";

export default function Page() {
  return (
    <>
      <Toolbar>
        <ToolbarHeading>
          <div className="flex items-center gap-2">
            <ToolbarPageTitle>Billing Details</ToolbarPageTitle>
            <Badge size="sm" variant="success" appearance="light">Plus</Badge>
          </div>
          <ToolbarDescription>Manage invoices, plans, and payment methods.</ToolbarDescription>
        </ToolbarHeading>
        <ToolbarActions>
          <Button variant="mono">Billing plan</Button>
          <Button variant="outline">Invoices</Button>
        </ToolbarActions>
      </Toolbar>

      <div className="container"> 
        <Skeleton className="rounded-lg grow h-[calc(100vh-10rem)] mt-10 mb-5"></Skeleton>
      </div>
    </>
  );
}