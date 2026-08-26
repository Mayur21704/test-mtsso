import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, Package, Gift, Anchor, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import logo from "@/assets/logo.jpeg";

const nav = [
  { to: "/stations/toronto", label: "Home", exact: true },
  { to: "/stations/toronto/about", label: "About" },
  { to: "/stations/toronto/support", label: "Seafarer Support" },
  { to: "/stations/toronto/get-involved", label: "Get Involved" },
  {
    to: "/stations/toronto/newsletter",
    label: "News & Stories",
    subItems: [
      { to: "/stations/toronto/newsletter", label: "Newsletters" },
      { to: "/stations/toronto/announcements", label: "Announcements" },
      { to: "/stations/toronto/ship-visits", label: "Ship Visits" },
      { to: "/stations/toronto/women-in-maritime", label: "Women in Maritime" },
      { to: "/stations/toronto/whats-ahead", label: "What's Ahead" },
      { to: "/stations/toronto/ways-to-get-involved-article", label: "Ways to Get Involved" },
    ],
  },
  { to: "/stations/toronto/events", label: "Events" },
  { to: "/stations/toronto/contact", label: "Contact" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu and reset accordion when route changes
  useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  // Handle clicking outside of the header to close the mobile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpen(false);
        setMobileExpanded(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileAccordion = (label) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <>
      {/* ─── TOP MTSSO NETWORK SWITCHER BAR (RESPONSIVE) ─── */}
      <div className="bg-navy-dark text-white/90 text-xs py-1.5 border-b border-navy/40 relative z-50">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-coral-light font-bold text-[11px] transition-colors"
            >
              <ArrowLeft className="w-3 h-3 shrink-0" />
              <span>MTSSO Umbrella Website</span>
            </Link>
            <span className="text-white/30 hidden xs:inline">|</span>
            <span className="inline-flex items-center gap-1 font-bold text-coral-light text-[11px]">
              <Anchor className="w-3 h-3 shrink-0" /> Toronto Station
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px] flex-wrap">
            <span className="text-white/60 hidden md:inline">Other Stations:</span>
            <Link to="/stations/hamilton" className="text-white/80 hover:text-coral-light transition-colors whitespace-nowrap">
              Hamilton
            </Link>
            <span className="text-white/30">•</span>
            <Link to="/stations/oshawa" className="text-white/80 hover:text-coral-light transition-colors whitespace-nowrap">
              Oshawa
            </Link>
            <span className="text-white/30">•</span>
            <Link to="/stations/port-colborne" className="text-white/80 hover:text-coral-light transition-colors whitespace-nowrap">
              Port Colborne
            </Link>
          </div>
        </div>
      </div>

      {/* ─── MAIN TORONTO STATION HEADER ─── */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-soft" : "bg-white/80 backdrop-blur"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between md:h-24 lg:h-28 gap-2 sm:gap-4">
          
          {/* Logo */}
          <Link to="/stations/toronto" className="flex items-center gap-2 lg:gap-3 group shrink-0">
            <img
              src={logo}
              alt="Mission to Seafarers Logo"
              className="h-14 sm:h-16 md:h-20 lg:h-22 xl:h-24 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform"
            />
            <span className="flex flex-col leading-none justify-center">
              <span className="text-[15px] sm:text-[16px] xl:text-[18px] font-extrabold text-navy whitespace-nowrap">
                Mission to Seafarers
              </span>
              <span className="text-[11px] sm:text-[12px] xl:text-[13px] font-bold uppercase tracking-[0.18em] text-coral mt-0.5 whitespace-nowrap">
                Toronto
              </span>
            </span>
          </Link>

          {/* Desktop Navigation (Displays on XL screens 1280px+ without breaking) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {nav.map((n) =>
              n.subItems ? (
                <div key={n.to} className="relative group">
                  <NavLink
                    to={n.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-2.5 2xl:px-3 py-2 text-[14px] 2xl:text-[15px] font-semibold whitespace-nowrap rounded-md transition-colors ${
                        isActive || location.pathname.includes(n.to)
                          ? "text-coral"
                          : "text-navy hover:text-coral"
                      }`
                    }
                  >
                    {n.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </NavLink>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="w-56 bg-white rounded-xl shadow-card border border-border p-2 flex flex-col gap-1">
                      {n.subItems.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          end={sub.to === "/stations/toronto/newsletter"}
                          className={({ isActive }) =>
                            `block px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-normal ${
                              isActive
                                ? "bg-coral-pale text-coral"
                                : "text-text-mid hover:text-navy hover:bg-warm-gray"
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.exact || n.to === "/stations/toronto"}
                  className={({ isActive }) =>
                    `px-2.5 2xl:px-3 py-2 text-[14px] 2xl:text-[15px] font-semibold whitespace-nowrap rounded-md transition-colors ${
                      isActive ? "text-coral" : "text-navy hover:text-coral"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Desktop & Tablet Action Buttons */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Seafarer Parcel Pickup Service (Visible on 2XL screens) */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden 2xl:inline-flex border-border bg-warm-gray text-navy hover:bg-navy hover:text-white font-bold whitespace-nowrap text-xs px-3"
            >
              <a
                href="https://parcelservice.mtsc.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Package className="w-3.5 h-3.5 mr-1.5" />
                <span>Parcel Pickup</span>
              </a>
            </Button>

            {/* Send a Prayer (Visible on XL screens) */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden xl:inline-flex border-navy text-navy hover:bg-navy hover:text-white font-bold whitespace-nowrap text-xs xl:text-sm px-3"
            >
              <a href="https://mtsc.ca/for-seafarers/prayer-wall/" target="_blank" rel="noopener noreferrer">
                Send a Prayer
              </a>
            </Button>

            {/* Orange Donate Button (Always prominent) */}
            <Button
              onClick={() => setDonateDialogOpen(true)}
              size="default"
              className="bg-coral hover:bg-coral-light text-white font-bold shadow-warm hover:shadow-warm-hover px-4 sm:px-5 text-sm sm:text-base whitespace-nowrap cursor-pointer"
            >
              Donate
            </Button>

            {/* Mobile / Tablet Menu Toggle (< 1280px) */}
            <button
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((v) => !v)}
              className="xl:hidden p-2 rounded-md text-navy hover:bg-warm-gray shrink-0 transition-colors"
            >
              {open ? <X className="h-6 w-6 sm:h-7 sm:w-7" /> : <Menu className="h-6 w-6 sm:h-7 sm:w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="xl:hidden border-t border-border bg-white animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
            <div className="container-page py-4 flex flex-col gap-2 max-h-[85vh] overflow-y-auto">
              {nav.map((n) => (
                <div key={n.to} className="flex flex-col">
                  {n.subItems ? (
                    <>
                      <button
                        onClick={() => toggleMobileAccordion(n.label)}
                        className={`px-3 py-3 text-base font-semibold rounded-md flex items-center justify-between w-full text-left transition-colors ${
                          location.pathname.includes(n.to)
                            ? "bg-coral-pale text-coral"
                            : "text-navy hover:bg-warm-gray"
                        }`}
                      >
                        {n.label}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            mobileExpanded === n.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          mobileExpanded === n.label ? "max-h-[400px] opacity-100 mt-1" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="flex flex-col gap-1 pl-4 border-l-2 border-warm-gray ml-3 mb-2">
                          {n.subItems.map((sub) => (
                            <NavLink
                              key={sub.to}
                              to={sub.to}
                              end={sub.to === "/stations/toronto/newsletter"}
                              className={({ isActive }) =>
                                `px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                                  isActive
                                    ? "text-coral font-bold bg-coral-pale/50"
                                    : "text-text-mid hover:text-navy hover:bg-warm-gray"
                                }`
                              }
                            >
                              {sub.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={n.to}
                      end={n.exact || n.to === "/stations/toronto"}
                      className={({ isActive }) =>
                        `px-3 py-3 text-base font-semibold rounded-md transition-colors ${
                          isActive ? "bg-coral-pale text-coral font-bold" : "text-navy hover:bg-warm-gray"
                        }`
                      }
                    >
                      {n.label}
                    </NavLink>
                  )}
                </div>
              ))}

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border mt-2">
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-border bg-warm-gray text-navy font-bold w-full justify-start h-12"
                >
                  <a href="https://parcelservice.mtsc.ca/" target="_blank" rel="noopener noreferrer">
                    <Package className="w-5 h-5 mr-2" />
                    Seafarer Parcel Pickup Service
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-navy text-navy font-bold w-full justify-start h-12"
                >
                  <a href="https://mtsc.ca/for-seafarers/prayer-wall/" target="_blank" rel="noopener noreferrer">
                    Send a Prayer
                  </a>
                </Button>
                <Button
                  onClick={() => {
                    setDonateDialogOpen(true);
                    setOpen(false);
                  }}
                  className="bg-coral hover:bg-coral-light text-white font-extrabold w-full text-lg h-14"
                >
                  Donate
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Donate Dialog Popup */}
        <Dialog open={donateDialogOpen} onOpenChange={setDonateDialogOpen}>
          <DialogContent className="max-w-5xl h-[95vh] p-0 overflow-hidden flex flex-col">
            <DialogHeader className="p-4 pb-3 shrink-0 border-b">
              <DialogTitle className="flex items-center gap-3 text-xl font-extrabold text-navy">
                <Gift className="h-5 w-5 text-coral" />
                Secure Donation Form
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-hidden p-2">
              <div className="w-full h-full bg-white rounded-lg border border-border overflow-hidden">
                <iframe
                  src="https://www.canadahelps.org/en/dn/145961"
                  title="CanadaHelps Secure Donation Form"
                  className="w-full h-full border-none block bg-transparent"
                  allow="payment"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
    </>
  );
};
