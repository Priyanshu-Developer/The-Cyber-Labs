import { NextResponse } from "next/server";
import { getProducts } from "@/app/lab/06-second-order/lib/lab-db";
export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}
