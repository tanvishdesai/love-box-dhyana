"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default function InquiriesAdminPage() {
  const inquiries = useQuery(api.inquiries.get) || [];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white font-playfair">
        Inquiries
      </h2>

      <div className="rounded-md border border-zinc-200 dark:border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry._id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(inquiry.submittedAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="font-medium">{inquiry.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{inquiry.email}</span>
                    <span className="text-xs text-zinc-500">
                      {inquiry.phone}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {inquiry.message}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
