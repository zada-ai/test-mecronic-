'use client';

import { Skeleton } from "@/components/ui/skeleton"
import { Toolbar, ToolbarActions, ToolbarHeading } from "@/components/layouts/layout-10/components/toolbar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { CalendarDays, Download } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import Link from "next/link";

export default function Page() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });
  
  return (
    <>
      <Toolbar>
        <ToolbarHeading />
        <ToolbarActions>
          <Button variant="outline" asChild>
            <Link href={'#'}>
              <Download />
              Export
            </Link>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button id="date" variant="outline">
                <CalendarDays />
                {date?.from ? (
                  date.to ? (
                    <span>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </span>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>          
        </ToolbarActions>
      </Toolbar>
      <div className="container">
        <Skeleton className="rounded-lg grow h-[calc(100vh-175px)]"></Skeleton>
      </div>
    </>
  );
}