import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductShowcase from "./components/ProductShowcase";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import Footer from "./components/Footer";
import { useLang } from "./LanguageContext";

export default function App() {
  const { t } = useLang();

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-fh-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-fh-deep"
      >
        {t("meta.skipToContent")}
      </a>

      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <About />
        <Reviews />
        <Location />
      </main>
      <Footer />
    </>
  );
}
