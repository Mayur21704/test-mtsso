import { Link, NavLink } from "react-router-dom";
import { Anchor, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";
import heroImg from "@/assets/water1.jpg";

export function PortColborneStation() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* ─── TOP MTSSO NETWORK SWITCHER BAR (EXACT AS TORONTO) ─── */}
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
              <Anchor className="w-3 h-3 shrink-0" /> Port Colborne Station
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px] flex-wrap">
            <span className="text-white/60 hidden md:inline">Other Stations:</span>
            <Link to="/stations/toronto" className="text-white/80 hover:text-coral-light transition-colors whitespace-nowrap">
              Toronto
            </Link>
            <span className="text-white/30">•</span>
            <Link to="/stations/hamilton" className="text-white/80 hover:text-coral-light transition-colors whitespace-nowrap">
              Hamilton
            </Link>
            <span className="text-white/30">•</span>
            <Link to="/stations/oshawa" className="text-white/80 hover:text-coral-light transition-colors whitespace-nowrap">
              Oshawa
            </Link>
          </div>
        </div>
      </div>

      {/* ─── STATION HEADER (NAVBAR WITH "HOME" IN THE MIDDLE) ─── */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between md:h-24 lg:h-28">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/stations/port-colborne" className="flex items-center gap-2.5 group shrink-0">
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
                  Port Colborne
                </span>
              </span>
            </Link>
          </div>

          {/* Center: Home Navigation */}
          <nav className="flex items-center justify-center">
            <NavLink
              to="/"
              className="px-5 py-2 text-[15px] sm:text-base font-extrabold text-coral hover:text-coral-light transition-colors"
            >
              Home
            </NavLink>
          </nav>

          {/* Right: Balance Spacer */}
          <div className="flex-1 flex justify-end">
            <Button asChild size="sm" className="hidden sm:inline-flex bg-coral hover:bg-coral-light text-white font-bold shadow-warm text-xs px-4">
              <Link to="/">MTSSO Network</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ─── COMING SOON BODY ─── */}
      <main className="flex-1 relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Atmosphere */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/40" />

        <div className="relative z-10 max-w-2xl w-full text-center text-white space-y-8 bg-slate-900/80 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-slate-700/60 shadow-2xl">
          {/* Station Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Coming Soon
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-bold uppercase tracking-wider">
              <Anchor className="w-3.5 h-3.5" /> Welland Canal Lock 8 • Lake Erie Gateway
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Mission to Seafarers <br />
              <span className="text-sky-400">Port Colborne</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-lg mx-auto leading-relaxed">
            Our dedicated Port Colborne Station web portal is currently under active development. Stay tuned for our upcoming launch!
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-coral hover:bg-coral-light text-white font-bold shadow-warm px-6">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to MTSSO Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
              <Link to="/stations/toronto">
                Visit Toronto Station
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-950 text-white/70 py-6 border-t border-slate-800 text-center text-xs">
        <p>© {new Date().getFullYear()} Mission to Seafarers Port Colborne · Part of Mission to Seafarers Southern Ontario</p>
      </footer>
    </div>
  );
}

export default PortColborneStation;
