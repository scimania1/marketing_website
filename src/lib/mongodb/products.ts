import { cache } from "react";
import { ProductData } from "@/utils/types";
import { Collection, Db, MongoClient, Document } from "mongodb";
import clientPromise from "./config";

let client: MongoClient;
let db: Db;
let productsCollection: Collection<ProductData>;

async function initConnection() {
  try {
    client = await clientPromise;
    db = client.db(process.env.MONGODB_DATABASE as string);
    productsCollection = db.collection(
      process.env.MONGODB_COLLECTION as string,
    );
  } catch (error) {
    throw new Error(`[ERROR]: Couldn't connect to mongodb: ${error}`);
  }
}

(async () => {
  await initConnection();
})();

type ProductQueryData = {
  productData: ProductData[];
  length: [{ count: number }] | [];
};

const getProducts = cache(
  async (page: number, limit: number, query: string) => {
    if (!productsCollection) {
      await initConnection();
    }

    const skipVal = (page - 1) * limit;
    let pipeline: Document[] = [
      {
        $facet: {
          productData: [
            { $skip: skipVal },
            { $limit: limit },
            { $sort: { id: 1 } },
          ],
          length: [{ $count: "count" }],
        },
      },
    ];
    if (query.length !== 0) {
      pipeline.unshift({
        $search: {
          index: "default",
          text: {
            query: query,
            path: ["name", "sizes", "subparts", "material", "finishing"],
            fuzzy: {},
          },
        },
      });
      pipeline[1].$facet.productData.pop();
    }
    const result = productsCollection
      .aggregate<ProductQueryData>(pipeline)
      .toArray();
    return result;
  },
);

export default getProducts;

// need to improve the way i query the data.
// read about mongodb and some querying techniques and other flags to be used. May don't use aggregation. May be use $facet.
