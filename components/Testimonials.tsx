"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Testimonials() {
  const testimonialsData = useQuery(api.testimonials.get) || [];

  const testimonials = testimonialsData.map((t) => ({
    quote: t.quote,
    name: t.name,
    designation: t.role,
    src: t.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
  }));

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider text-sm uppercase mb-2 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Love Notes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our happy customers who have shared the joy of gifting with us.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        )}
      </div>
    </section>
  );
}
