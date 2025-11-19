"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

export default function OccasionsAdminPage() {
  const occasions = useQuery(api.occasions.get) || [];
  const removeOccasion = useMutation(api.occasions.remove);

  const handleDelete = async (id: Id<"occasions">) => {
    if (confirm("Are you sure you want to delete this occasion?")) {
      await removeOccasion({ id });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white font-playfair">
          Occasions
        </h2>
        <Link href="/admin/occasions/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Occasion
          </Button>
        </Link>
      </div>

      <div className="rounded-md border border-zinc-200 dark:border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {occasions.map((occasion) => (
              <TableRow key={occasion._id}>
                <TableCell className="font-medium">{occasion.name}</TableCell>
                <TableCell>{occasion.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(occasion._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
