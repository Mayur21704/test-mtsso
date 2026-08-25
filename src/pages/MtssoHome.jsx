import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Anchor, Coffee, Heart, Scissors, Users, Globe2, HandHeart, Calendar,
  MapPin, Ship, Package, LifeBuoy, ShieldCheck, HeartHandshake, Building2,
  ChevronRight, ChevronDown, CheckCircle2, Gift, Phone, ExternalLink,
  Compass, ArrowUpRight, ArrowRight
} from "lucide-react";

import { STATIONS } from "@/data/stationsData";
import { STORIES } from "@/data/newsData";
import { DonateModal } from "@/components/DonateModal";

// Assets
import waterImg from "@/assets/water1.jpg";
import seaImg from "@/assets/sea1.jpg";

export const MtssoHome = () => {
  const [donateOpen, setDonateOpen] = useState(false);
  const [selectedPortTab, setSelectedPortTab] = useState("toronto");

  const stationsList = Object.values(STATIONS);
  const activeStationData = STATIONS[selectedPortTab] || STATIONS.toronto;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
      ────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat bg-white border-b border-border"
        style={{ backgroundImage: `url("${seaImg}")` }}
      >
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]" />
        
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-coral/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-navy/10 blur-3xl pointer-events-none" />

        <div className="container-page relative z-10 pt-10 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left Column: Mission Narrative */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-white/90 border border-coral/30 backdrop-blur px-3.5 py-1.5 rounded-full shadow-sm">
                <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-navy">
                  Southern Ontario Regional Network
                </span>
                <span className="text-coral font-bold text-xs">· 4 Stations</span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-navy tracking-tight">
                Welcoming Seafarers Across the Ports of{" "}
                <span className="relative inline-block text-coral">
                  Southern Ontario
                  <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none">
                    <path d="M2 7 Q50 1, 100 5 T198 4" stroke="hsl(var(--coral))" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-navy/90 leading-relaxed font-medium max-w-2xl">
                <strong className="text-navy font-bold block mb-2 text-lg md:text-xl">
                  Mission to Seafarers Southern Ontario (MTSSO) serves as the regional umbrella uniting our dedicated port stations in Toronto, Hamilton, Oshawa, and Port Colborne.
                </strong>
                We ensure that commercial crews navigating the Great Lakes and St. Lawrence Seaway corridor are met with hospitality, practical assistance, mental health support, and a home away from home.
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5 relative z-20">
                <Link
                  to="/stations"
                  className="inline-flex items-center gap-2 bg-coral hover:bg-coral-light text-white font-extrabold px-6 py-3.5 rounded-xl shadow-warm hover:shadow-warm-hover transition-all text-sm"
                >
                  Explore 4 Port Stations <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/for-seafarers"
                  className="inline-flex items-center gap-2 border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm bg-white/80"
                >
                  Port & Seafarer Guide
                </Link>
                <button
                  onClick={() => setDonateOpen(true)}
                  className="inline-flex items-center gap-2 bg-white border border-coral text-coral hover:bg-coral-pale font-bold px-5 py-3.5 rounded-xl transition-all text-sm cursor-pointer shadow-sm"
                >
                  <Gift className="h-4 w-4 text-coral" /> Donate to MTSSO
                </button>
              </div>

              {/* Quick Port Jump Chips */}
              <div className="mt-8 pt-6 border-t border-navy/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-navy/60 mr-2">Quick Port Access:</span>
                {stationsList.map((st) => (
                  <Link
                    key={st.id}
                    to={`/stations/${st.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/95 hover:bg-coral hover:text-white text-navy px-3 py-1.5 rounded-lg border border-border transition-all shadow-xs"
                  >
                    <Anchor className="w-3 h-3 text-coral group-hover:text-white" />
                    {st.shortName.replace(" Station", "")}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Showcase & Active Port Snapshot */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-border shadow-2xl space-y-6">
                
                {/* Visual Header */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-md border border-border">
                  <img
                    src={activeStationData.heroImage}
                    alt={activeStationData.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/40 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-coral-light">
                      Active Port Spotlight
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-0.5 leading-tight">
                      {activeStationData.name}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1 mt-1 font-medium">
                      {activeStationData.portName}
                    </p>
                  </div>
                </div>

                {/* Port Selection Tabs */}
                <div className="grid grid-cols-4 gap-1.5 bg-warm-gray p-1.5 rounded-xl border border-border">
                  {stationsList.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedPortTab(st.id)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        selectedPortTab === st.id
                          ? "bg-navy text-white shadow-sm"
                          : "text-navy hover:bg-white/80"
                      }`}
                    >
                      {st.shortName.replace(" Station", "")}
                    </button>
                  ))}
                </div>

                {/* Port Highlights */}
                <div className="space-y-3 pt-1 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-text-mid font-semibold">Port Chaplain:</span>
                    <span className="font-extrabold text-navy">{activeStationData.chaplain.name}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-text-mid font-semibold">Annual Vessel Traffic:</span>
                    <span className="font-extrabold text-navy">{activeStationData.portDetails.annualVessels}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-mid font-semibold">Duty Phone:</span>
                    <span className="font-extrabold text-coral">{activeStationData.phone}</span>
                  </div>
                </div>

                {/* Link to Full Station */}
                <Link
                  to={`/stations/${activeStationData.id}`}
                  className="flex items-center justify-center gap-1.5 w-full bg-warm-gray hover:bg-navy hover:text-white text-navy font-bold py-3 rounded-xl text-xs transition-all border border-border"
                >
                  Enter {activeStationData.shortName} Website <ArrowRight className="w-3.5 h-3.5 text-coral" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. ORGANIZATIONAL HIERARCHY & GLOBAL CONNECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-warm-gray border-b border-border">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow mx-auto">Organizational Structure</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-navy">
              How the Mission Operates
            </h2>
            <p className="mt-2 text-text-mid text-sm">
              Connecting our global maritime mission with localized, boots-on-the-ground port support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {[
              {
                step: "01",
                level: "Global Network",
                name: "The Mission to Seafarers (Global)",
                desc: "Founded in 1856. Operating in 200+ ports across 50 countries under the patronage of King Charles III.",
                tag: "Global Secretariat (London, UK)"
              },
              {
                step: "02",
                level: "National Office",
                name: "Mission to Seafarers Canada",
                desc: "Coordinating ministry, national advocacy, major partnerships, and port ministry across Canadian coasts.",
                tag: "National Mandate"
              },
              {
                step: "03",
                level: "Regional Umbrella",
                name: "MTSSO (Southern Ontario)",
                desc: "Regional governance uniting four strategic ports on Lake Ontario and the Welland Canal Seaway corridor.",
                tag: "This Website"
              },
              {
                step: "04",
                level: "Local Port Stations",
                name: "Toronto · Hamilton · Oshawa · Port Colborne",
                desc: "Direct daily dockside ministry, ship visiting, seafarer lounges, van transportation, and emergency care.",
                tag: "4 Operational Hubs"
              }
            ].map((node, i) => (
              <div
                key={node.step}
                className="p-6 rounded-2xl bg-white border border-border shadow-sm flex flex-col justify-between relative group hover:border-coral transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-coral/30 group-hover:text-coral transition-colors">
                      {node.step}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-coral-pale text-coral">
                      {node.tag}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-text-mid block">
                    {node.level}
                  </span>
                  <h3 className="text-base font-extrabold text-navy mt-1">
                    {node.name}
                  </h3>
                  <p className="mt-2 text-xs text-text-mid leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FOUR SOUTHERN ONTARIO STATIONS (THE SHOWCASE)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-border">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="eyebrow">Southern Ontario Network</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-navy">
                Our 4 Active Port Stations
              </h2>
              <p className="mt-3 text-text-mid text-base max-w-xl">
                Each port station maintains dedicated local chaplaincy, port services, and facilities tailored to visiting international crews.
              </p>
            </div>
            <Link
              to="/stations"
              className="inline-flex items-center gap-1.5 text-sm font-extrabold text-coral hover:text-coral-light transition-colors"
            >
              Compare All Stations in Hub <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stationsList.map((st) => (
              <div
                key={st.id}
                className="rounded-3xl border border-border overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={st.heroImage}
                      alt={st.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-navy-dark/90 backdrop-blur text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                      {st.portName.split("(")[0]}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-navy group-hover:text-coral transition-colors">
                      {st.name}
                    </h3>
                    <p className="text-xs font-bold text-coral mt-0.5">{st.portDetails.primaryCargo}</p>
                    
                    <p className="text-xs text-text-mid mt-3 line-clamp-3 leading-relaxed">
                      {st.overview}
                    </p>

                    <div className="mt-5 pt-4 border-t border-border space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-text-mid font-semibold">Chaplain:</span>
                        <span className="font-extrabold text-navy">{st.chaplain.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-mid font-semibold">Duty Phone:</span>
                        <span className="font-extrabold text-coral">{st.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/stations/${st.id}`}
                    className="inline-flex items-center justify-center gap-1.5 w-full bg-warm-gray hover:bg-coral hover:text-white text-navy font-extrabold py-3 rounded-xl text-xs transition-colors"
                  >
                    Open {st.shortName.replace(" Station", "")} Page <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. REGIONAL IMPACT NUMBERS
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-navy text-white border-b border-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={waterImg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="container-page relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-coral-light text-xs font-extrabold uppercase tracking-widest block">
              Annual Regional Footprint
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
              Impact Across Southern Ontario Ports
            </h2>
            <p className="mt-2 text-white/70 text-sm md:text-base">
              Behind every ship in our harbours are women and men working months far from family. Here is how our network served them this past year.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { num: "450+", label: "Commercial Vessels Visited", sub: "Across Toronto, Hamilton, Oshawa & Port Colborne" },
              { num: "6,500+", label: "Seafarers Supported Ashore", sub: "Hospitality, wifi, pastoral care & transportation" },
              { num: "1,800+", label: "Parcels Hand-Delivered", sub: "Connecting crew to vital family packages & essentials" },
              { num: "320+", label: "Volunteers & Knitters", sub: "Active community members backing our front-line team" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-4xl sm:text-5xl font-black text-coral-light tracking-tight block">
                  {stat.num}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-white block mt-2">
                  {stat.label}
                </span>
                <span className="text-xs text-white/60 block mt-1">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. NEWS & STORIES ACROSS ALL 4 STATIONS
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-warm-gray border-b border-border">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="eyebrow">Southern Ontario Newsfeed</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-navy">
                Latest Dispatches from the Waterfront
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-1 border border-navy text-navy hover:bg-navy hover:text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Browse All Stories <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STORIES.slice(0, 3).map((story) => (
              <div
                key={story.id}
                className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="font-extrabold text-coral bg-coral-pale px-2.5 py-0.5 rounded-full">
                        {story.stationName}
                      </span>
                      <span className="text-text-mid">{story.date}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-navy leading-snug">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-xs text-text-mid leading-relaxed line-clamp-3">
                      {story.overview}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/news#${story.slug}`}
                    className="text-xs font-bold text-coral hover:underline inline-flex items-center gap-1"
                  >
                    Read Full Story <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CanadaHelps Modal */}
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
};
