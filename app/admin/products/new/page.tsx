"use client";

import { ProductForm } from "../product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
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
          Add New Product
        </h2>
      </div>

      <ProductForm />
    </div>
  );
}
