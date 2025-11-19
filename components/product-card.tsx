"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Id } from "@/convex/_generated/dataModel";

interface ProductCardProps {
  id: Id<"products">;
  name: string;
  price: number;
  image: string;
  category?: string;
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative block overflow-hidden rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          {category && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              {category}
            </p>
          )}
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-1">
            {name}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-300 font-semibold">
            ${price.toFixed(2)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
