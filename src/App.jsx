import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";

// MTSSO Umbrella Pages
import { MtssoHome } from "./pages/MtssoHome";
import { AboutMtsso } from "./pages/AboutMtsso";
import { StationsHub } from "./pages/StationsHub";
import { StationTemplate } from "./pages/StationTemplate";
import { ForSeafarers } from "./pages/ForSeafarers";
import { NewsStories } from "./pages/NewsStories";

// Toronto Station Specific Pages (Imported from torento)
import TorontoStationHome from "./pages/Index";
import About from "./pages/About";
import Support from "./pages/Support";
import GetInvolved from "./pages/GetInvolved";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Newsletter from "./pages/Newsletter";
import ShipVisits from "./pages/ShipVisits";
import WomenInMaritime from "./pages/WomenInMaritime";
import WhatsAhead from "./pages/WhatsAhead";
import WaysToGetInvolvedArticle from "./pages/WaysToGetInvolvedArticle";
import Announcements from "./pages/Announcements";
import HamiltonStation from "./pages/HamiltonStation";
import NotFound from "./pages/NotFound";

function App() {
  return (<BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          {/* ─── MAIN MTSSO UMBRELLA LEVEL ROUTES ─── */}
          <Route path="/" element={<MtssoHome />} />
          <Route path="/about-mtsso" element={<AboutMtsso />} />
          <Route path="/stations" element={<StationsHub />} />
          <Route path="/for-seafarers" element={<ForSeafarers />} />
          <Route path="/news" element={<NewsStories />} />

          {/* ─── TORONTO STATION DEDICATED EXPERIENCE (Exact layout & data from torento) ─── */}
          <Route path="/stations/toronto" element={<TorontoStationHome />} />
          <Route path="/toronto" element={<Navigate to="/stations/toronto" replace />} />
          
          {/* ─── OTHER STATIONS ─── */}
          <Route path="/stations/hamilton" element={<HamiltonStation />} />
          <Route path="/hamilton" element={<Navigate to="/stations/hamilton" replace />} />
          <Route path="/stations/:stationId" element={<StationTemplate />} />
          <Route path="/oshawa" element={<Navigate to="/stations/oshawa" replace />} />
          <Route path="/port-colborne" element={<Navigate to="/stations/port-colborne" replace />} />

          {/* ─── STATION PAGES & ARTICLES FROM TORENTO ─── */}
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/ship-visits" element={<ShipVisits />} />
          <Route path="/women-in-maritime" element={<WomenInMaritime />} />
          <Route path="/whats-ahead" element={<WhatsAhead />} />
          <Route path="/ways-to-get-involved-article" element={<WaysToGetInvolvedArticle />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/hamilton-station" element={<HamiltonStation />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
