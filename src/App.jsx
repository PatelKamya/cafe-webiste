import Header from "./components/Header.jsx";
import ScrollVideoHero from "./components/ScrollVideoHero.jsx";
import AboutSection from "./components/AboutSection.jsx";
import FeaturesSection from "./components/FeaturesSection.jsx";
import ShowcaseSection from "./components/ShowcaseSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import ConversionSection from "./components/ConversionSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import { business } from "./data/business.js";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <ScrollVideoHero />
        <div className="site-flow" id="menu">
          <AboutSection />
          <FeaturesSection />
          <ShowcaseSection />
          <TestimonialsSection />
          <ConversionSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
      <a className="floating-order" href={business.orderUrl} aria-label="Order Cinnamon Taste Cafe on DRIV-U">
        Order on DRIV-U
      </a>
    </>
  );
}
