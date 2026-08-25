import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Package, Gift, Compass, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { STATIONS } from "@/data/stationsData";
import { DonateModal } from "@/components/DonateModal";

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [donateOpen, setDonateOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  // Check if viewing a specific station route
  const isStationRoute = location.pathname.startsWith("/stations/");
  let currentStationKey = null;
  if (isStationRoute) {
    currentStationKey = location.pathname.split("/stations/")[1]?.split("/")[0] || null;
  }
  const currentStation = currentStationKey ? STATIONS[currentStationKey] : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. MAIN MTSSO UMBRELLA NAVIGATION (Clean 3 items per DOC.md)
  const mainUmbrellaNav = [
    { to: "/", label: "Home", exact: true },
    { to: "/about-mtsso", label: "About MTSSO" },
    {
      to: "/stations",
      label: "Our Stations",
      subItems: [
        { to: "/stations", label: "All Stations Overview" },
        { to: "/stations/toronto", label: "Toronto Station (Port of Toronto)" },
        { to: "/stations/hamilton", label: "Hamilton Station (Hamilton Harbour)" },
        { to: "/stations/oshawa", label: "Oshawa Station (Port of Oshawa)" },
        { to: "/stations/port-colborne", label: "Port Colborne (Welland Canal)" },
      ],
    },
  ];

  // 2. INDIVIDUAL STATION SPECIFIC NAVIGATION (Full 7 items)
  const individualStationNav = currentStation ? [
    { to: `/stations/${currentStation.id}`, label: "Home", exact: true },
    {
      to: `/stations/${currentStation.id}#services`,
      label: "For Seafarers",
      subItems: [
        { to: `/stations/${currentStation.id}#services`, label: "Station Lounge & Services" },
        { to: `/stations/${currentStation.id}#services`, label: "Haircuts for Seafarers" },
        { to: "https://parcelservice.mtsc.ca/", label: "Parcel Pickup Service", isExternal: true },
        { to: `/for-seafarers?station=${currentStation.id}`, label: "Wi-Fi & SIM Cards" },
        { to: `/for-seafarers?station=${currentStation.id}`, label: "Shore Leave Transportation" },
      ],
    },
    {
      to: "/get-involved",
      label: "Get Involved",
      subItems: [
        { to: "/get-involved", label: `Volunteer at ${currentStation.shortName}` },
        { to: "/get-involved", label: "Knit for Seafarers" },
        { to: "/get-involved", label: "Financial Giving & Support" },
      ],
    },
    { to: `/news?station=${currentStation.id}`, label: "News & Stories" },
    { to: "/events", label: "Events" },
    { to: `/stations/${currentStation.id}#contact`, label: "Contact" },
  ] : [];

  const activeNav = isStationRoute ? individualStationNav : mainUmbrellaNav;

  return (
    <>
      {/* ─── TOP NETWORK SWITCHER BAR ─── */}
      <div className="bg-navy-dark text-white/90 text-xs py-1.5 border-b border-navy/40 relative z-50">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3">
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-extrabold uppercase tracking-widest text-[10px] text-coral-light bg-white/10 px-2.5 py-0.5 rounded-full">
              <Compass className="w-3 h-3 text-coral-light" />
              {isStationRoute && currentStation ? (
                <>Station: {currentStation.name}</>
              ) : (
                <>Southern Ontario Regional Network</>
              )}
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden sm:inline text-white/80 font-medium text-[11px]">Mission to Seafarers Canada</span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[11px] text-white/60 mr-1 hidden sm:inline font-semibold">Ports:</span>
            {[
              { id: "toronto", label: "Toronto", to: "/stations/toronto" },
              { id: "hamilton", label: "Hamilton", to: "/stations/hamilton" },
              { id: "oshawa", label: "Oshawa", to: "/stations/oshawa" },
              { id: "port-colborne", label: "Port Colborne", to: "/stations/port-colborne" },
            ].map((st) => (
              <Link
                key={st.id}
                to={st.to}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition-colors whitespace-nowrap ${
                  currentStationKey === st.id
                    ? "bg-coral text-white shadow-sm"
                    : "text-white/80 hover:bg-white/15 hover:text-white"
                }`}
              >
                {st.label}
              </Link>
            ))}

            {isStationRoute && (
              <Link
                to="/"
                className="ml-2 inline-flex items-center gap-1 text-[11px] font-bold text-coral-light hover:text-white transition-colors bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20"
              >
                <ArrowLeft className="w-3 h-3" /> Back to MTSSO Main
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-soft" : "bg-white/90 backdrop-blur"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between gap-3 lg:gap-6">
          
          {/* Logo with dynamic subtitle */}
          <Link
            to={isStationRoute ? `/stations/${currentStationKey}` : "/"}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <img
              src={logo}
              alt="Mission to Seafarers Logo"
              className="h-12 sm:h-14 lg:h-16 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform"
            />
            <span className="flex flex-col leading-none justify-center">
              <span className="text-[14px] sm:text-[15px] xl:text-[16px] 2xl:text-[17px] font-extrabold text-navy whitespace-nowrap">
                Mission to Seafarers
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-coral mt-0.5 whitespace-nowrap flex items-center gap-1">
                {isStationRoute && currentStation ? (
                  <>
                    <span className="bg-coral-pale text-coral px-1.5 py-0.2 rounded font-extrabold">
                      {currentStation.shortName}
                    </span>
                    <span className="text-text-mid font-normal text-[10px] hidden sm:inline">· MTSSO</span>
                  </>
                ) : (
                  <>
                    Southern Ontario <span className="text-navy/40 font-normal text-[9px] sm:text-[10px] hidden sm:inline">· Regional Umbrella</span>
                  </>
                )}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {activeNav.map((n) =>
              n.subItems ? (
                <div key={n.label} className="relative group">
                  {n.to.startsWith("http") ? (
                    <a
                      href={n.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 text-[14px] xl:text-[15px] font-bold whitespace-nowrap rounded-md transition-colors text-navy hover:text-coral hover:bg-warm-gray"
                    >
                      {n.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-coral" />
                    </a>
                  ) : n.to.includes("#") ? (
                    <a
                      href={n.to}
                      className="flex items-center gap-1 px-3 py-2 text-[14px] xl:text-[15px] font-bold whitespace-nowrap rounded-md transition-colors text-navy hover:text-coral hover:bg-warm-gray"
                    >
                      {n.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-coral" />
                    </a>
                  ) : (
                    <NavLink
                      to={n.to}
                      className={({ isActive }) =>
                        `flex items-center gap-1 px-3 py-2 text-[14px] xl:text-[15px] font-bold whitespace-nowrap rounded-md transition-colors ${
                          isActive || location.pathname.includes(n.to)
                            ? "text-coral bg-coral-pale/40 font-extrabold"
                            : "text-navy hover:text-coral hover:bg-warm-gray"
                        }`
                      }
                    >
                      {n.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-coral" />
                    </NavLink>
                  )}

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-64 bg-white rounded-xl shadow-xl border border-border p-2 flex flex-col gap-1">
                      {n.subItems.map((sub) =>
                        sub.isExternal || sub.to.startsWith("http") ? (
                          <a
                            key={sub.label}
                            href={sub.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-xs font-semibold rounded-md transition-colors text-navy hover:text-coral hover:bg-warm-gray"
                          >
                            {sub.label}
                          </a>
                        ) : sub.to.includes("#") ? (
                          <a
                            key={sub.label}
                            href={sub.to}
                            className="block px-3 py-2 text-xs font-semibold rounded-md transition-colors text-navy hover:text-coral hover:bg-warm-gray"
                          >
                            {sub.label}
                          </a>
                        ) : (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            className={({ isActive }) =>
                              `block px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                                isActive
                                  ? "bg-coral-pale text-coral font-bold"
                                  : "text-navy hover:text-coral hover:bg-warm-gray"
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : n.to.includes("#") ? (
                <a
                  key={n.label}
                  href={n.to}
                  className="px-3 py-2 text-[14px] xl:text-[15px] font-bold whitespace-nowrap rounded-md transition-colors text-navy hover:text-coral hover:bg-warm-gray"
                >
                  {n.label}
                </a>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.exact}
                  className={({ isActive }) =>
                    `px-3 py-2 text-[14px] xl:text-[15px] font-bold whitespace-nowrap rounded-md transition-colors ${
                      isActive
                        ? "text-coral bg-coral-pale/40 font-extrabold"
                        : "text-navy hover:text-coral hover:bg-warm-gray"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Action CTAs & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="https://parcelservice.mtsc.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center text-xs font-bold text-navy bg-warm-gray border border-border px-3.5 py-2 rounded-md hover:bg-navy hover:text-white transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <Package className="w-3.5 h-3.5 mr-1 text-coral" />
              <span>Parcel Pickup</span>
            </a>

            <button
              onClick={() => setDonateOpen(true)}
              className="inline-flex items-center gap-1.5 bg-coral hover:bg-coral-light text-white font-extrabold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm shadow-warm hover:shadow-warm-hover transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{isStationRoute && currentStation ? `Donate to ${currentStation.shortName.replace(" Station", "")}` : "Donate"}</span>
            </button>

            <button
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-navy hover:bg-warm-gray transition-colors shrink-0"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="lg:hidden border-t border-border bg-white shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-3 duration-200">
            <div className="container-page py-4 flex flex-col gap-1.5">
              
              {isStationRoute && currentStation ? (
                <div className="p-3.5 bg-coral-pale rounded-xl mb-2 flex items-center justify-between border border-coral/30">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-coral">Active Station</span>
                    <p className="font-extrabold text-navy text-sm">{currentStation.name}</p>
                  </div>
                  <Link to="/" className="text-xs font-bold text-coral underline flex items-center gap-0.5">
                    <ArrowLeft className="w-3 h-3" /> MTSSO Main
                  </Link>
                </div>
              ) : (
                <div className="p-3 bg-navy-dark text-white rounded-xl mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-coral-light">Regional Umbrella</span>
                    <p className="font-bold text-xs text-white">Southern Ontario Network</p>
                  </div>
                  <Link to="/stations" className="text-xs font-bold text-coral-light underline">View 4 Stations</Link>
                </div>
              )}

              {activeNav.map((n) => (
                <div key={n.label} className="flex flex-col">
                  {n.subItems ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === n.label ? null : n.label)}
                        className="px-3 py-2.5 text-base font-bold rounded-lg flex items-center justify-between w-full text-left text-navy hover:bg-warm-gray"
                      >
                        {n.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === n.label ? "rotate-180" : ""}`} />
                      </button>

                      {mobileExpanded === n.label && (
                        <div className="flex flex-col gap-1 pl-4 border-l-2 border-coral ml-3 my-1">
                          {n.subItems.map((sub) =>
                            sub.isExternal || sub.to.startsWith("http") ? (
                              <a
                                key={sub.label}
                                href={sub.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 text-sm font-semibold rounded-md text-navy hover:bg-warm-gray"
                              >
                                {sub.label}
                              </a>
                            ) : sub.to.includes("#") ? (
                              <a
                                key={sub.label}
                                href={sub.to}
                                onClick={() => setOpen(false)}
                                className="px-3 py-2 text-sm font-semibold rounded-md text-navy hover:bg-warm-gray"
                              >
                                {sub.label}
                              </a>
                            ) : (
                              <NavLink
                                key={sub.to}
                                to={sub.to}
                                className={({ isActive }) =>
                                  `px-3 py-2 text-sm font-semibold rounded-md ${
                                    isActive ? "text-coral font-bold bg-coral-pale" : "text-navy hover:bg-warm-gray"
                                  }`
                                }
                              >
                                {sub.label}
                              </NavLink>
                            )
                          )}
                        </div>
                      )}
                    </>
                  ) : n.to.includes("#") ? (
                    <a
                      key={n.label}
                      href={n.to}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2.5 text-base font-bold rounded-lg text-navy hover:bg-warm-gray"
                    >
                      {n.label}
                    </a>
                  ) : (
                    <NavLink
                      to={n.to}
                      end={n.exact}
                      className={({ isActive }) =>
                        `px-3 py-2.5 text-base font-bold rounded-lg ${
                          isActive ? "bg-coral-pale text-coral font-bold" : "text-navy hover:bg-warm-gray"
                        }`
                      }
                    >
                      {n.label}
                    </NavLink>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-2.5 pt-4 border-t border-border mt-2">
                <a
                  href="https://parcelservice.mtsc.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-border bg-warm-gray text-navy font-bold w-full h-11 rounded-xl text-sm hover:bg-navy hover:text-white transition-colors"
                >
                  <Package className="w-4 h-4 text-coral" /> Seafarer Parcel Pickup
                </a>
                <button
                  onClick={() => {
                    setDonateOpen(true);
                    setOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-coral hover:bg-coral-light text-white font-extrabold w-full text-base h-12 rounded-xl shadow-warm cursor-pointer"
                >
                  <Gift className="w-4 h-4" /> Donate to {isStationRoute && currentStation ? currentStation.shortName : "MTSSO"}
                </button>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Global Donation Modal */}
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
};