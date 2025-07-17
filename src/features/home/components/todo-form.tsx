"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { todosApi, useCreateTodoMutation } from "@/hooks/todo.hook";
import { todoSchema, TodoSchemaType } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux.hook";

interface IFormModalProps {
  onSuccess?: () => void;
  page?: number;
  limit?: number;
}
const TodoForm: React.FC<IFormModalProps> = (props) => {
  const { onSuccess, page = 1, limit = 10 } = props;
  const dispatch = useAppDispatch();
  const [createTodo, { isLoading }] = useCreateTodoMutation();
  const form = useForm<TodoSchemaType>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      completed: false,
    },
  });

  async function onSubmit(data: TodoSchemaType) {
    try {
      const result = await createTodo({
        ...data,
        userId: 1,
      }).unwrap();

      toast.success("Berhasil menambahkan todo");

      form.reset();

      dispatch(
        todosApi.util.updateQueryData(
          "getTodos",
          { start: (page - 1) * limit, limit },
          (draft) => {
            draft.unshift(result);
          }
        )
      );
      onSuccess?.();
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const apiError = err as { data?: { message?: string } };
        toast.error("Gagal menambahkan todo", {
          description: apiError.data?.message || "Terjadi kesalahan.",
        });
      } else {
        toast.error("Gagal menambahkan todo", {
          description: "Terjadi kesalahan tak dikenal.",
        });
      }
    }
  }

  console.log("error", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Todo Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(val === "true")}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Completed</SelectItem>
                      <SelectItem value="false">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline">Cancel</Button>

            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default TodoForm;
