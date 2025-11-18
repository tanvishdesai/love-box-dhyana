"use client";

import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";

const occasions: CarouselItem[] = [
  { id: 1, title: "BIRTHDAY", color: "#ec4899" }, // Pink
  { id: 2, title: "VALENTINE'S DAY", color: "#ef4444" }, // Red
  { id: 3, title: "DIWALI", color: "#f97316" }, // Orange
  { id: 4, title: "RAKHI", color: "#eab308" }, // Yellow
  { id: 5, title: "ANNIVERSARY", color: "#3b82f6" }, // Blue
  { id: 6, title: "WEDDING", color: "#db2777" }, // Pink-700
  { id: 7, title: "CHRISTMAS", color: "#22c55e" }, // Green
  { id: 8, title: "NEW YEAR", color: "#a855f7" }, // Purple
  { id: 9, title: "BABY SHOWER", color: "#06b6d4" }, // Cyan
];

export default function Gallery() {
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
        <RulerCarousel originalItems={occasions} />
      </div>
    </section>
  );
}
