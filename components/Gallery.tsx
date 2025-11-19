"use client";

import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Gallery() {
  const occasionsData = useQuery(api.occasions.get) || [];
  
  const occasions: CarouselItem[] = occasionsData.map((occ, index) => ({
    id: index + 1,
    title: occ.name.toUpperCase(),
    color: "#ec4899", // Default color as we don't have it in DB yet, or could map based on name
  }));
  return (
    <section id="gallery" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Shop by Occasion
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Find the perfect gift for every special moment in life.
        </p>
      </div>

      <div className="w-full">
        {occasions.length > 0 ? (
          <RulerCarousel originalItems={occasions} />
        ) : (
          <div className="h-[600px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading occasions...</p>
          </div>
        )}
      </div>
    </section>
  );
}
