"use client";

import * as React from "react";

import FormModal from "@/components/form-modal";
import TodoForm from "@/features/home/components/todo-form";

const FormSection = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <FormModal
      open={open}
      onOpenChange={setOpen}
      title="Create Todo"
      description="Create a new todo"
    >
      <TodoForm onSuccess={() => setOpen(false)} />
    </FormModal>
  );
};

export default FormSection;
