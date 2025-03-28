import { z } from "zod";

/** Auth */

const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
});

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;

/** User */

export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    id: z.number(),
  });

export type User = z.infer<typeof userSchema>;

/** Product */
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  isBuy: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;

/** List */

export const listSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  products: z.array(productSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const listDashboardSchema = listSchema.pick({
  id: true,
  name: true,
  description: true,
});

export const listsSchema = z.array(listDashboardSchema);

export type List = z.infer<typeof listSchema>;
export type ListFormData = Pick<List, "name" | "description">;
