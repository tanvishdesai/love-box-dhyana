"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-foreground">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium tracking-wide mb-6">
            Handcrafted with Love
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
            Unwrap the <br />
            <span className="text-primary italic">Magic of Gifting</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Curated gift boxes and personalized sweaters designed to make every moment unforgettable. Because the best gifts are the ones that tell a story.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#gallery"
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-foreground/10 text-foreground rounded-full font-medium text-lg hover:bg-foreground/5 transition-all"
            >
              Custom Order
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
      </motion.div>
    </section>
  );
}
