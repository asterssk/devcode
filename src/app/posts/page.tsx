import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "My Posts" };

const items = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    location: "Singapore",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "James Wilson",
    email: "j.wilson@company.com",
    location: "London, UK",
    status: "Inactive",
    balance: "$650.00",
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "m.garcia@company.com",
    location: "Madrid, Spain",
    status: "Active",
    balance: "$0.00",
  },
  {
    id: "5",
    name: "David Kim",
    email: "d.kim@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: "-$1,000.00",
  },
  {
    id: "6",
    name: "John Brown",
    email: "john.brown@company.com",
    location: "New York, US",
    status: "Active",
    balance: "$1,500.00",
  },
  {
    id: "7",
    name: "Jane Doe",
    email: "jane.doe@company.com",
    location: "Paris, FR",
    status: "Inactive",
    balance: "$200.00",
  },
  {
    id: "8",
    name: "Peter Smith",
    email: "peter.smith@company.com",
    location: "Berlin, DE",
    status: "Active",
    balance: "$1,000.00",
  },
  {
    id: "9",
    name: "Olivia Lee",
    email: "olivia.lee@company.com",
    location: "Tokyo, JP",
    status: "Active",
    balance: "$500.00",
  },
  {
    id: "10",
    name: "Liam Chen",
    email: "liam.chen@company.com",
    location: "Shanghai, CN",
    status: "Inactive",
    balance: "$300.00",
  },
  {
    id: "11",
    name: "Ethan Kim",
    email: "ethan.kim@company.com",
    location: "Busan, KR",
    status: "Active",
    balance: "$800.00",
  },
  {
    id: "12",
    name: "Ava Brown",
    email: "ava.brown@company.com",
    location: "London, UK",
    status: "Active",
    balance: "$1,200.00",
  },
  {
    id: "13",
    name: "Lily Lee",
    email: "lily.lee@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: "$400.00",
  },
  {
    id: "14",
    name: "Noah Smith",
    email: "noah.smith@company.com",
    location: "New York, US",
    status: "Inactive",
    balance: "$600.00",
  },
  {
    id: "15",
    name: "Eve Chen",
    email: "eve.chen@company.com",
    location: "Taipei, TW",
    status: "Active",
    balance: "$1,800.00",
  },
  {
    id: "16",
    name: "Eve Chen",
    email: "eve.chen@company.com",
    location: "Taipei, TW",
    status: "Active",
    balance: "$1,800.00",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col flex-1 gap-4 max-w-screen-xl px-6 py-4 md:px-8 h-full">
      <AppHeader title="My Snippets">
        <div className="flex gap-2 items-center">
          <Link href="/form/snippet" passHref>
            <Button size="sm">
              <PlusIcon />
              Post a new snippet
            </Button>
          </Link>
        </div>
      </AppHeader>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 overflow-auto [&>div]:max-h-full border rounded-md">
          <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr_td]:border-b [&_tr]:border-none">
            <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm text-xs">
              <TableRow className="hover:bg-transparent">
                <TableHead>TITLE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">STARS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className="text-right">{item.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
