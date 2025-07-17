"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TTodo } from "@/types/todo.type";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns = (): ColumnDef<TTodo>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Todo Title" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("title") as string;
      return <div className="font-medium">{value}</div>;
    },
  },
  {
    accessorKey: "completed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const completed = row.getValue("completed") as boolean;
      return (
        <span
          className={
            completed
              ? "text-green-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {completed ? "Completed" : "Incomplete"}
        </span>
      );
    },
  },
];
