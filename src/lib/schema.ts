import { z } from "zod";

/**
 * Zod validation schema for the Todo form.
 * Ensures that the `title` is a non-empty string (min. 3 characters),
 * and `completed` is a boolean (true or false).
 */

export const todoSchema = z.object({
  title: z
    .string({
      error: () => ({ message: "Please enter a todo title." }),
    })
    .min(3, { message: "Title must be at least 3 characters long." }),

  completed: z.boolean({
    error: () => ({ message: "Please select the completion status." }),
  }),
});

export type TodoSchemaType = z.infer<typeof todoSchema>;
