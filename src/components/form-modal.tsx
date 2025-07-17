"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface IFormModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerModal?: boolean;
  className?: string;
  triggerLabel?: string;
}

const FormModal: React.FC<IFormModalProps> = (props) => {
  const {
    title,
    description,
    children,
    open = true,
    onOpenChange = () => router.back(),
    triggerModal = false,
    triggerLabel = "Add",
    className,
  } = props;
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerModal ? (
        <DialogTrigger asChild>
          <Button variant="outline">{triggerLabel}</Button>
        </DialogTrigger>
      ) : null}
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
