'use client';

import { Toolbar, ToolbarActions, ToolbarDescription, ToolbarHeading, ToolbarPageTitle } from "@/components/layouts/layout-11/components/toolbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
  return (
    <div className="container-fluid"> 
      <Toolbar>
        <ToolbarHeading>
          <ToolbarPageTitle>Team Settings</ToolbarPageTitle>
          <ToolbarDescription>Some info tells the story</ToolbarDescription>
        </ToolbarHeading>
        <ToolbarActions>
          <Button variant="outline">View Profile</Button>
        </ToolbarActions>
      </Toolbar>
      <Skeleton className="rounded-lg grow h-screen"></Skeleton>
    </div>
  );
}