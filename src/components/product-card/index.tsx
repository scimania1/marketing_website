import { ProductData } from "@/utils/types";
import Image from "next/image";

export default function ProductCard({
  productData,
}: {
  productData: ProductData;
}) {
  return (
    <div>
      <picture>
        <Image
          src={productData.imageURL}
          alt={productData.name}
          height={100}
          width={100}
        />
      </picture>
      <h3>{productData.name}</h3>
    </div>
  );
}
