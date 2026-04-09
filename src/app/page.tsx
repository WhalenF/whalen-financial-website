import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AndrewInterview from "@/components/AndrewInterview";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import MoneyPrism from "@/components/MoneyPrism";
import Comparison from "@/components/Comparison";
import Pledge from "@/components/Pledge";
import WhyWhalen from "@/components/WhyWhalen";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import ClientExperience from "@/components/ClientExperience";
import Book from "@/components/Book";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <AndrewInterview />
      <TrustBar />
      <Services />
      <MoneyPrism />
      <Comparison />
      <Pledge />
      <WhyWhalen />
      <Team />
      <Reviews />
      <ClientExperience />
      <Book />
      <CTA />
      <Footer />
    </>
  );
}
