import { ObjectId } from "mongodb";
import { z } from "zod";

const ProductDataSchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.number(),
  name: z.string(),
  sizes: z.array(z.string()),
  subparts: z.array(
    z.object({ name: z.string(), material: z.array(z.string()) }),
  ),
  material: z.array(z.string()),
  finishing: z.array(z.string()),
  minQty: z.string(),
  hardening: z.string(),
  tags: z.array(z.string()),
  imageURL: z.string(),
});

export type ProductData = z.infer<typeof ProductDataSchema>;

export interface ProductDataWithCount extends ProductData {
  count: number;
}

export { ProductDataSchema };
