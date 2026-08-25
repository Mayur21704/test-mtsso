import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Anchor, MapPin, Phone, Mail, Clock, Ship, Package, Scissors, Coffee,
  Heart, HeartHandshake, CheckCircle2, ChevronRight, ArrowLeft, Gift,
  Globe2, Compass, ExternalLink, Calendar, Users, X
} from "lucide-react";

import { STATIONS } from "@/data/stationsData";
import { STORIES } from "@/data/newsData";
import { DonateModal } from "@/components/DonateModal";

export const StationTemplate = () => {
  const { stationId } = useParams();
  const [donateOpen, setDonateOpen] = useState(false);
  const [haircutOpen, setHaircutOpen] = useState(false);

  const stationKey = stationId?.toLowerCase() || "toronto";
  const station = STATIONS[stationKey] || STATIONS.toronto;

  const stationStories = STORIES.filter(
    (s) => s.station === station.id || s.station === "all" || s.station === "mtsso"
  );

  return (
    <div className="bg-white min-h-screen">
      {/* ─── NETWORK RETURN STRIP ─── */}
      <div className="bg-warm-gray border-b border-border py-3">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-coral font-extrabold hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> MTSSO Regional Network
            </Link>
            <span className="text-text-dim">/</span>
            <span className="text-navy font-bold">{station.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-text-mid font-semibold hidden md:inline">Other Stations:</span>
            {Object.values(STATIONS)
              .filter((st) => st.id !== station.id)
              .map((st) => (
                <Link
                  key={st.id}
                  to={`/stations/${st.id}`}
                  className="text-navy hover:text-coral font-bold bg-white px-2 py-0.5 rounded border border-border"
                >
                  {st.shortName.replace(" Station", "")}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* ─── STATION HERO BANNER ─── */}
      <section className="relative overflow-hidden bg-navy-dark text-white py-16 md:py-24">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={station.heroImage}
            alt={station.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-transparent z-0" />

        <div className="container-page relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-coral text-white text-xs font-extrabold px-3 py-1 rounded-full mb-4">
              <Anchor className="w-3.5 h-3.5" />
              {station.portName}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {station.name}
            </h1>

            <p className="mt-5 text-lg md:text-xl text-white/90 leading-relaxed font-medium">
              {station.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href="#services"
                className="inline-flex items-center gap-1 bg-coral hover:bg-coral-light text-white font-extrabold h-12 px-7 rounded-xl transition-all shadow-warm"
              >
                Station Services <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 border-2 border-white text-white hover:bg-white hover:text-navy font-bold h-12 px-6 rounded-xl transition-all"
              >
                Contact Station Lead
              </a>
              <button
                onClick={() => setDonateOpen(true)}
                className="inline-flex items-center gap-2 border-2 border-coral-light text-coral-light hover:bg-coral hover:text-white font-bold h-12 px-6 rounded-xl transition-all cursor-pointer"
              >
                <Gift className="w-4 h-4" /> Support This Station
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUICK METRICS ─── */}
      <div className="bg-warm-gray border-b border-border py-4">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-xs text-text-mid font-semibold block uppercase">Port Location</span>
            <p className="text-sm font-extrabold text-navy">{station.coordinates}</p>
          </div>
          <div>
            <span className="text-xs text-text-mid font-semibold block uppercase">Duty Telephone</span>
            <p className="text-sm font-extrabold text-coral">{station.phone}</p>
          </div>
          <div>
            <span className="text-xs text-text-mid font-semibold block uppercase">Annual Traffic</span>
            <p className="text-sm font-extrabold text-navy">{station.portDetails.annualVessels.split(" ")[0]} Vessels</p>
          </div>
          <div>
            <span className="text-xs text-text-mid font-semibold block uppercase">Regional Network</span>
            <p className="text-sm font-extrabold text-navy">MTSSO · MtS Canada</p>
          </div>
        </div>
      </div>

      {/* ─── PORT SPECIFICATIONS & ABOUT ─── */}
      <section id="about" className="py-16 md:py-20 bg-white border-b border-border scroll-mt-24">
        <div id="port" className="container-page grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="eyebrow">Local Port Context</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">
              Serving the Working Waterfront at {station.portName.split("(")[0]}
            </h2>
            <p className="text-text-mid text-base md:text-lg leading-relaxed">
              {station.overview}
            </p>
            <p className="text-text-mid text-base leading-relaxed">
              {station.portDetails.description}
            </p>

            <div className="pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-navy block mb-3">Primary Vessel & Cargo Types:</span>
              <div className="flex flex-wrap gap-2">
                {station.portDetails.cargoTypes.map((cargo) => (
                  <span key={cargo} className="text-xs bg-warm-gray text-navy font-bold px-3 py-1.5 rounded-lg border border-border">
                    📦 {cargo}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src={station.heroImage}
                alt={station.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATION SERVICES ─── */}
      <section id="services" className="py-16 md:py-20 bg-warm-gray border-b border-border scroll-mt-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow mx-auto">Available Services</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              How We Help Seafarers in {station.shortName}
            </h2>
            <p className="mt-3 text-text-mid text-base">
              Tailored practical assistance, warm hospitality, and connectivity for crews during port turnarounds.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {station.services.map((srv) => (
              <div key={srv.title} className="p-7 rounded-2xl bg-white border border-border shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-coral-pale flex items-center justify-center text-coral">
                      <Anchor className="h-5 w-5" />
                    </div>
                    {srv.badge && (
                      <span className="bg-coral text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                        {srv.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-extrabold text-navy">{srv.title}</h3>
                  <p className="mt-2 text-xs md:text-sm text-text-mid leading-relaxed">{srv.description}</p>
                </div>

                {srv.title.includes("Haircut") && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <button
                      onClick={() => setHaircutOpen(true)}
                      className="w-full bg-coral hover:bg-coral-light text-white font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Book Haircut Appointment
                    </button>
                  </div>
                )}
                {srv.title.includes("Parcel") && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href="https://parcelservice.mtsc.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full border border-navy text-navy hover:bg-navy hover:text-white font-bold py-2 rounded-lg text-xs transition-colors"
                    >
                      Order Parcel to {station.shortName}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Facility Checklist */}
          <div className="mt-12 p-6 md:p-8 rounded-3xl bg-white border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-extrabold text-navy">Station Facilities Checklist</h4>
              <p className="text-xs md:text-sm text-text-mid mt-1">Available to visiting seafarers ashore:</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {station.facilities.map((fac) => (
                <span key={fac} className="inline-flex items-center gap-1.5 text-xs font-bold bg-coral-pale text-coral px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {fac}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MEET THE CHAPLAIN ─── */}
      <section id="team" className="py-16 md:py-20 bg-white border-b border-border scroll-mt-24">
        <div className="container-page max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow mx-auto">Station Leadership</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              Meet the {station.shortName} Team
            </h2>
          </div>

          <div className="p-8 md:p-12 rounded-3xl bg-warm-gray border border-border grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-soft aspect-[4/5] bg-slate-200">
                <img
                  src={station.chaplain.image}
                  alt={station.chaplain.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-coral">{station.chaplain.title}</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-navy">{station.chaplain.name}</h3>
              <p className="text-sm md:text-base text-text-mid leading-relaxed">
                {station.chaplain.bio}
              </p>

              <div className="pt-4 border-t border-border flex flex-wrap gap-4 text-xs font-semibold text-navy">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-coral" /> {station.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-coral" /> {station.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT & PARCEL INSTRUCTIONS ─── */}
      <section id="contact" className="py-16 md:py-20 bg-white scroll-mt-24">
        <div className="container-page max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-warm-gray border border-border space-y-5">
              <span className="eyebrow">Direct Contact</span>
              <h3 className="text-2xl font-extrabold text-navy">{station.shortName} Headquarters</h3>
              
              <div className="space-y-3 text-sm text-text-mid font-medium">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                  <span>{station.address}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-coral shrink-0" />
                  <span>{station.phone}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-coral shrink-0" />
                  <a href={`mailto:${station.email}`} className="text-navy hover:text-coral font-bold">{station.email}</a>
                </p>
                <p className="flex items-start gap-2.5">
                  <Clock className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                  <span>{station.hours}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center w-full bg-navy hover:bg-coral text-white font-bold h-12 rounded-xl transition-colors"
                >
                  Send a Message to Station
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-navy text-white space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-coral-light">Parcel Logistics</span>
                <h3 className="text-2xl font-extrabold mt-2">Ordering Supplies to Port</h3>
                <p className="text-sm text-white/80 mt-3 leading-relaxed">
                  Seafarers can order items online to arrive at {station.shortName} prior to docking. Use this exact delivery format:
                </p>

                <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/15 font-mono text-xs text-coral-light leading-relaxed">
                  [YOUR NAME] - Crew Member<br />
                  M/V [NAME OF VESSEL]<br />
                  {station.parcelDeliveryAddress}
                </div>
              </div>

              <a
                href="https://parcelservice.mtsc.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-coral hover:bg-coral-light text-white font-extrabold w-full h-12 rounded-xl shadow-warm transition-all"
              >
                Go to Parcel Service Platform <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global Donation Modal */}
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />

      {/* Haircut Modal */}
      {haircutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-border">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-warm-gray">
              <div className="flex items-center gap-3">
                <Scissors className="h-5 w-5 text-coral" />
                <h3 className="text-lg font-extrabold text-navy">Book Haircut Appointment — {station.shortName}</h3>
              </div>
              <button onClick={() => setHaircutOpen(false)} className="p-2 rounded-full hover:bg-white cursor-pointer">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 p-2 overflow-hidden bg-slate-50">
              <iframe
                src="https://fadekingzmobilebarber.square.site/"
                title="Haircut Booking"
                className="w-full h-full border-0 rounded-2xl bg-white"
                allow="payment"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
