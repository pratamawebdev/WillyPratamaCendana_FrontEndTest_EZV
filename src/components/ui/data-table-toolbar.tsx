"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "./input";
import { Button } from "./button";
import Link from "next/link";

interface IDataTableToolbarProps<TData> {
  table: Table<TData>;
  onAddClick?: () => void;
  addHref?: string;
  filterPlaceholder?: string;
  filterColumn?: string;
  disableFilter?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  onAddClick,
  addHref,
  filterPlaceholder = "Search...",
  filterColumn = "name",
  disableFilter = true,
}: IDataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {!disableFilter && (
          <>
            <Input
              placeholder={filterPlaceholder}
              value={
                (table.getColumn(filterColumn)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(filterColumn)
                  ?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X className="ml-1 h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {addHref ? (
          <Link href={addHref}>
            <Button className="h-8 px-3 text-sm">+ Tambah</Button>
          </Link>
        ) : onAddClick ? (
          <Button onClick={onAddClick} className="h-8 px-3 text-sm">
            + Add
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
