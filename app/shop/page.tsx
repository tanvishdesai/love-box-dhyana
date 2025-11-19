"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export default function ShopPage() {
  const products = useQuery(api.products.get);
  const occasions = useQuery(api.occasions.get);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Handle loading states
  const isLoading = products === undefined || occasions === undefined;

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesOccasion = selectedOccasion
      ? product.occasionId === selectedOccasion
      : true;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesOccasion && matchesPrice;
  }).filter((product) => product.images && product.images.length > 0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8 font-playfair">
          Shop Our Collection
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-8">
            <div>
              <Label className="text-base font-semibold mb-4 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Search gifts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">Occasions</Label>
              <div className="space-y-2">
                <Button
                  variant={selectedOccasion === null ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedOccasion(null)}
                >
                  All Occasions
                </Button>
                {(occasions || []).map((occasion) => (
                  <Button
                    key={occasion._id}
                    variant={selectedOccasion === occasion._id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedOccasion(occasion._id)}
                  >
                    {occasion.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">
                Price Range (${priceRange[0]} - ${priceRange[1]})
              </Label>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-zinc-500 text-lg">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-500 text-lg">
                  {products && products.length === 0 
                    ? "No products available." 
                    : "No products found matching your filters."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    category={
                      (occasions || []).find((o) => o._id === product.occasionId)?.name
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
