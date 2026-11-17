import { getDb } from "./connection";
import { enquiries } from "@db/schema";
import type { NewEnquiry } from "@db/schema";

export async function insertEnquiry(data: NewEnquiry): Promise<number> {
  const db = getDb();
  const result = await db.insert(enquiries).values(data);
  return Number(result[0].insertId);
}
