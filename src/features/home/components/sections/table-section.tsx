"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "../columns";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetTodosQuery } from "@/hooks/todo.hook";
import { TTodo } from "@/types/todo.type";
import FormModal from "@/components/form-modal";
import TodoForm from "../todo-form";

interface ITableSectionProps {
  initialData: TTodo[];
  page: number;
  limit: number;
}

const TableSection: React.FC<ITableSectionProps> = (props) => {
  const { initialData, page, limit } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, isLoading, isFetching, refetch } = useGetTodosQuery(
    { start: (page - 1) * limit, limit },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const todos = data ?? initialData;

  const isLastPage = todos.length < limit;
  const totalPages = isLastPage ? page : page + 1;

  const onPageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("limit", String(limit));
    router.push(`?${params.toString()}`);
  };

  const onPageSizeChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(newLimit));
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <section className="p-4 w-full md:max-w-[90%] mx-auto lg:max-w-[80%] flex flex-col gap-8">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          EZV TODO APP
        </h1>
        <DataTable
          columns={columns()}
          data={todos}
          pagination={{
            pageIndex: page - 1,
            pageSize: limit,
            totalPages,
            onPageChange,
            onPageSizeChange,
          }}
          isLoading={isLoading || isFetching}
          onAddClick={() => setOpen(true)}
        />
      </section>
      <FormModal
        open={open}
        onOpenChange={setOpen}
        title="Create Todo"
        description="Create a new todo"
      >
        <TodoForm
          onSuccess={() => {
            setOpen(false);
            refetch();
          }}
        />
      </FormModal>
    </>
  );
};

export default TableSection;
