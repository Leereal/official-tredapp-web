import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import ContactForm from "./_components/ContactForm";
import Footer from "./_components/Footer";
import LogoGrid from "./_components/LogoGrid";
import Testimonial from "./_components/Testimonial";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <LogoGrid />
      <Testimonial />
      <ContactForm />
      <Footer />
    </div>
  );
}
