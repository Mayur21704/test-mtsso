import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Anchor, Wifi, Phone, Car, Scissors, Coffee, Package, HeartHandshake,
  ExternalLink, MapPin, CheckCircle2, ShieldAlert, ArrowRight, Gift
} from "lucide-react";
import { STATIONS } from "@/data/stationsData";
import { DonateModal } from "@/components/DonateModal";

export const ForSeafarers = () => {
  const [searchParams] = useSearchParams();
  const initialStation = searchParams.get("station") || "toronto";
  const [selectedPort, setSelectedPort] = useState(initialStation);
  const [donateOpen, setDonateOpen] = useState(false);

  const currentStation = STATIONS[selectedPort] || STATIONS.toronto;

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="bg-navy-dark text-white py-14 md:py-20 border-b border-navy">
        <div className="container-page max-w-4xl text-center mx-auto">
          <span className="inline-flex items-center gap-2 bg-coral text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Visiting Crew Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Seafarer Support & Port Guide
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Welcome to Southern Ontario. Select your port below to find immediate dockside services, duty chaplain contact, Wi-Fi connectivity, parcel delivery instructions, and shore leave transportation.
          </p>

          {/* Port Selector Tabs */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/15">
            {Object.values(STATIONS).map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedPort(st.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  selectedPort === st.id
                    ? "bg-coral text-white shadow-warm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {st.shortName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACTIVE PORT DIRECTORY ─── */}
      <section className="py-14 md:py-20 bg-warm-gray border-b border-border">
        <div className="container-page max-w-5xl mx-auto space-y-10">
          
          {/* Port Header Banner */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-extrabold uppercase text-coral">Current Port Selection</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy mt-1">{currentStation.name}</h2>
              <p className="text-xs md:text-sm text-text-mid mt-1">{currentStation.portName} · Coordinates: {currentStation.coordinates}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${currentStation.phone}`}
                className="inline-flex items-center gap-2 bg-coral hover:bg-coral-light text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-warm"
              >
                <Phone className="w-3.5 h-3.5" /> Call Chaplain ({currentStation.phone})
              </a>
              <Link
                to={`/stations/${currentStation.id}`}
                className="inline-flex items-center gap-1 border border-navy text-navy hover:bg-navy hover:text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
              >
                Station Page <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Core Support Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-coral-pale flex items-center justify-center text-coral">
                <Wifi className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-navy">High-Speed Wi-Fi & SIMs</h3>
              <p className="text-xs text-text-mid leading-relaxed">
                Free high-speed Wi-Fi is provided at our station lounge. Canadian SIM cards with international data packages are available upon request.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-coral-pale flex items-center justify-center text-coral">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-navy">Shore Leave Transportation</h3>
              <p className="text-xs text-text-mid leading-relaxed">
                Volunteer vans provide scheduled shore leave transportation to local shopping centres, pharmacies, banks, and currency exchanges.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-coral-pale flex items-center justify-center text-coral">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-navy">Seafarer Parcel Delivery</h3>
              <p className="text-xs text-text-mid leading-relaxed">
                Order Amazon and online goods to our station address prior to docking. Our chaplain will deliver parcels directly to your gangway.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-coral-pale flex items-center justify-center text-coral">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-navy">Haircuts for Seafarers</h3>
              <p className="text-xs text-text-mid leading-relaxed">
                Professional barber service available at Toronto station or arranged with advance notice for crews docking in Southern Ontario.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-coral-pale flex items-center justify-center text-coral">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-navy">Pastoral & Emotional Care</h3>
              <p className="text-xs text-text-mid leading-relaxed">
                Confidential, multi-faith pastoral listening, mental wellness support, and advocacy for welfare and contract concerns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-coral-pale flex items-center justify-center text-coral">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-navy">Seafarer Centre Lounge</h3>
              <p className="text-xs text-text-mid leading-relaxed">
                Warm hospitality ashore with complimentary coffee, tea, games, quiet reflection spaces, and warm knitted winter beanies.
              </p>
            </div>
          </div>

          {/* Parcel Delivery Logistics Card */}
          <div className="p-8 rounded-3xl bg-navy text-white space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-coral-light">Delivery Format</span>
            <h3 className="text-2xl font-extrabold">How to Address Parcels to {currentStation.shortName}</h3>
            <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
              To ensure timely delivery before your vessel departs, please use this exact delivery label when ordering online:
            </p>

            <div className="p-4 rounded-xl bg-white/10 border border-white/15 font-mono text-xs text-coral-light max-w-xl">
              [YOUR FULL NAME] - Crew Member<br />
              M/V [NAME OF VESSEL]<br />
              {currentStation.parcelDeliveryAddress}
            </div>

            <div className="pt-2">
              <a
                href="https://parcelservice.mtsc.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-coral hover:bg-coral-light text-white font-extrabold px-6 py-3 rounded-xl text-xs transition-colors shadow-warm"
              >
                Access Canada Parcel Pickup Platform <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Global Donation Modal */}
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
};
