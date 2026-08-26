import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ─── MTSSO Umbrella Layout & Pages ───
import { SiteLayout as MtssoSiteLayout } from "./components/SiteLayout";
import { MtssoHome } from "./pages/MtssoHome";
import { AboutMtsso } from "./pages/AboutMtsso";
import { StationsHub } from "./pages/StationsHub";
import { ForSeafarers } from "./pages/ForSeafarers";
import { NewsStories } from "./pages/NewsStories";
import NotFound from "./pages/NotFound";

// ─── Toronto Station Layout & Pages (Exact UI migrated from F:\mtsc\torento) ───
import { SiteLayout as TorontoSiteLayout } from "./stations/toronto/components/SiteLayout";
import {
  TorontoHome,
  TorontoAbout,
  TorontoSupport,
  TorontoGetInvolved,
  TorontoEvents,
  TorontoContact,
  TorontoNewsletter,
  TorontoShipVisits,
  TorontoWomenInMaritime,
  TorontoWhatsAhead,
  TorontoWaysToGetInvolved,
  TorontoAnnouncements,
  TorontoDonate,
} from "./stations/toronto";

// ─── Other 3 Stations (Standalone Coming Soon modules) ───
import { HamiltonStation } from "./stations/hamilton";
import { OshawaStation } from "./stations/oshawa";
import { PortColborneStation } from "./stations/port-colborne";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ─── 1. MTSSO UMBRELLA REGIONAL LEVEL ROUTES ─── */}
        <Route element={<MtssoSiteLayout />}>
          <Route path="/" element={<MtssoHome />} />
          <Route path="/about-mtsso" element={<AboutMtsso />} />
          <Route path="/stations" element={<StationsHub />} />
          <Route path="/for-seafarers" element={<ForSeafarers />} />
          <Route path="/news" element={<NewsStories />} />
        </Route>

        {/* ─── 2. TORONTO STATION (EXACT TORENTO NAVBAR & FOOTER UI) ─── */}
        <Route element={<TorontoSiteLayout />}>
          {/* Main Station Path */}
          <Route path="/stations/toronto" element={<TorontoHome />} />
          <Route path="/stations/toronto/about" element={<TorontoAbout />} />
          <Route path="/stations/toronto/support" element={<TorontoSupport />} />
          <Route path="/stations/toronto/get-involved" element={<TorontoGetInvolved />} />
          <Route path="/stations/toronto/events" element={<TorontoEvents />} />
          <Route path="/stations/toronto/contact" element={<TorontoContact />} />
          <Route path="/stations/toronto/newsletter" element={<TorontoNewsletter />} />
          <Route path="/stations/toronto/ship-visits" element={<TorontoShipVisits />} />
          <Route path="/stations/toronto/women-in-maritime" element={<TorontoWomenInMaritime />} />
          <Route path="/stations/toronto/whats-ahead" element={<TorontoWhatsAhead />} />
          <Route path="/stations/toronto/ways-to-get-involved-article" element={<TorontoWaysToGetInvolved />} />
          <Route path="/stations/toronto/announcements" element={<TorontoAnnouncements />} />
          <Route path="/stations/toronto/donate" element={<TorontoDonate />} />

          {/* Top-Level Shortcuts for Toronto */}
          <Route path="/toronto" element={<Navigate to="/stations/toronto" replace />} />
          <Route path="/about" element={<TorontoAbout />} />
          <Route path="/support" element={<TorontoSupport />} />
          <Route path="/get-involved" element={<TorontoGetInvolved />} />
          <Route path="/events" element={<TorontoEvents />} />
          <Route path="/contact" element={<TorontoContact />} />
          <Route path="/newsletter" element={<TorontoNewsletter />} />
          <Route path="/ship-visits" element={<TorontoShipVisits />} />
          <Route path="/women-in-maritime" element={<TorontoWomenInMaritime />} />
          <Route path="/whats-ahead" element={<TorontoWhatsAhead />} />
          <Route path="/ways-to-get-involved-article" element={<TorontoWaysToGetInvolved />} />
          <Route path="/announcements" element={<TorontoAnnouncements />} />
          <Route path="/donate" element={<TorontoDonate />} />
        </Route>

        {/* ─── 3. HAMILTON STATION (COMING SOON & HOME ONLY NAV) ─── */}
        <Route path="/stations/hamilton" element={<HamiltonStation />} />
        <Route path="/hamilton" element={<Navigate to="/stations/hamilton" replace />} />
        <Route path="/hamilton-station" element={<Navigate to="/stations/hamilton" replace />} />

        {/* ─── 4. OSHAWA STATION (COMING SOON & HOME ONLY NAV) ─── */}
        <Route path="/stations/oshawa" element={<OshawaStation />} />
        <Route path="/oshawa" element={<Navigate to="/stations/oshawa" replace />} />

        {/* ─── 5. PORT COLBORNE STATION (COMING SOON & HOME ONLY NAV) ─── */}
        <Route path="/stations/port-colborne" element={<PortColborneStation />} />
        <Route path="/port-colborne" element={<Navigate to="/stations/port-colborne" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
