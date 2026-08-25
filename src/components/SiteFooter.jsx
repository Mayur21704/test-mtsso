import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Anchor, Compass } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export const SiteFooter = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-dark text-white/90 mt-20 border-t border-navy">
      <div className="container-page py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        
        {/* Col 1: Brand & Regional Network Overview */}
        <div className="lg:col-span-2">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={handleScrollToTop}
          >
            <img
              src={logo}
              alt="Mission to Seafarers Logo"
              className="h-16 md:h-20 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform"
            />
            <span className="flex flex-col leading-none justify-center">
              <span className="text-[16px] md:text-[18px] font-extrabold text-white whitespace-nowrap">
                Mission to Seafarers
              </span>
              <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.18em] text-coral-light mt-0.5 whitespace-nowrap">
                Southern Ontario
              </span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-sm">
            Serving seafarers across the Great Lakes and St. Lawrence Seaway corridor with practical care, warm hospitality, and spiritual support in 4 key Southern Ontario ports.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-coral-light font-bold">
            <Compass className="w-4 h-4" /> Part of Mission to Seafarers Canada & Global Network (200+ ports)
          </div>
        </div>

        {/* Col 2: Ports & Stations */}
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-coral-light mb-4">Our Stations</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              ["Toronto Station", "/stations/toronto"],
              ["Hamilton Station", "/stations/hamilton"],
              ["Oshawa Station", "/stations/oshawa"],
              ["Port Colborne", "/stations/port-colborne"],
              ["All Stations Hub", "/stations"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  to={href}
                  onClick={handleScrollToTop}
                  className="hover:text-coral-light transition-colors text-white/80"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Navigation */}
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-coral-light mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              ["Home", "/"],
              ["About MTSSO", "/about-mtsso"],
              ["For Seafarers", "/for-seafarers"],
              ["Get Involved", "/get-involved"],
              ["News & Stories", "/news"],
              ["Events", "/events"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  to={href}
                  onClick={handleScrollToTop}
                  className="hover:text-coral-light transition-colors text-white/80"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Regional Contacts */}
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-coral-light mb-4">Regional Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2.5 items-start">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-coral-light" />
              <span>Port of Toronto, Hamilton Harbour, Oshawa & Welland Canal</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-coral-light" />
              <a href="mailto:info@mtsso.org" className="hover:text-coral-light transition-colors">
                info@mtsso.org
              </a>
            </li>
            <li className="flex gap-2.5 items-start">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-coral-light" />
              <span>(416) 469-5391</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Mission to Seafarers Southern Ontario (MTSSO). All rights reserved.</p>
          <p>Registered Canadian Charity · Part of Mission to Seafarers Canada</p>
        </div>
      </div>
    </footer>
  );
};