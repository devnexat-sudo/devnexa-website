import { Routes, Route } from "react-router";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import MobileApps from "@/pages/MobileApps";
import GameDev from "@/pages/GameDev";
import WhiteLabel from "@/pages/WhiteLabel";
import About from "@/pages/About";
import Portfolio from "@/pages/Portfolio";
import Process from "@/pages/Process";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobile-app-development" element={<MobileApps />} />
        <Route path="/game-development" element={<GameDev />} />
        <Route path="/white-label-development" element={<WhiteLabel />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
