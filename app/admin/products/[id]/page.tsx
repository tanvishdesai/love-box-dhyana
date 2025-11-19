"use client";

import { ProductForm } from "../product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as Id<"products">;
  const product = useQuery(api.products.getById, { id });

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white font-playfair">
          Edit Product
        </h2>
      </div>

      <ProductForm initialData={product} />
    </div>
  );
}
