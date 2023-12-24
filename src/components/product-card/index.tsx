import { ProductData } from "@/utils/types";
import Image from "next/image";

export default function ProductCard({
  id,
  name,
  imageURL,
  sizes,
}: {
  id: number;
  name: string;
  imageURL: string;
  sizes: string[];
}) {
  return (
    <div className="grid rounded-xl border-2 border-slate-300 p-4">
      <Image
        src={imageURL}
        alt={name}
        width={300}
        height={300}
        className="h-44 w-full rounded-xl bg-slate-100 object-contain"
      />
      <h3>{name}</h3>
    </div>
  );
}
