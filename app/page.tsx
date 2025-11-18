import { Navbar1 } from "@/components/ui/navbar-1";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar1 />
      <Hero />
      <Gallery />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}

