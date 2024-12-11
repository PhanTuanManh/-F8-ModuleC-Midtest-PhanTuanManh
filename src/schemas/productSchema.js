import * as z from "zod";

export const productSchema = z.object({
  title: z.string().trim().min(6, { message: "Tieu de can toi thieu 6 ky tu" }),
  price: z.number().positive(),
  description: z.string().trim().optional(),
  categoryId: z.number().min(1, { message: "Chon danh muc" }),
});
