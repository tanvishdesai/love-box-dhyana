import { Navbar1 } from "@/components/ui/navbar-1";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

import { GiftFinder } from "@/components/gift-finder";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar1 />
      <Hero />
      <GiftFinder />
      <Gallery />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}

