import { Link } from "react-router-dom";
import { Anchor, MapPin, Phone, ArrowRight, Ship, Compass, CheckCircle2 } from "lucide-react";
import { STATIONS } from "@/data/stationsData";

export const StationsHub = () => {
  const stationsList = Object.values(STATIONS);

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="bg-warm-gray py-16 md:py-24 border-b border-border">
        <div className="container-page max-w-4xl text-center mx-auto">
          <span className="eyebrow mx-auto">Network Directory</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            Southern Ontario Port Stations
          </h1>
          <p className="mt-5 text-lg text-text-mid leading-relaxed">
            Mission to Seafarers Southern Ontario operates across 4 key commercial harbours on Lake Ontario and the Welland Canal transit corridor.
          </p>
        </div>
      </section>

      {/* ─── STATIONS GRID ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-page space-y-16">
          {stationsList.map((st, index) => (
            <div
              key={st.id}
              className={`p-8 md:p-12 rounded-3xl border border-border bg-warm-gray grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-coral-pale text-coral">
                  <Anchor className="w-3.5 h-3.5" />
                  {st.portName.split("(")[0]}
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
                  {st.name}
                </h2>

                <p className="text-base text-text-mid leading-relaxed">
                  {st.overview}
                </p>

                <div className="pt-2 grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-border">
                    <span className="text-text-mid font-semibold block">Chaplain & Lead</span>
                    <span className="font-extrabold text-navy text-sm">{st.chaplain.name}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-border">
                    <span className="text-text-mid font-semibold block">Duty Telephone</span>
                    <span className="font-extrabold text-coral text-sm">{st.phone}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link
                    to={`/stations/${st.id}`}
                    className="inline-flex items-center gap-1.5 bg-coral hover:bg-coral-light text-white font-extrabold px-6 py-3 rounded-xl text-sm transition-all shadow-warm"
                  >
                    Open {st.shortName} Station Page <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/for-seafarers?station=${st.id}`}
                    className="inline-flex items-center gap-1.5 border border-navy text-navy hover:bg-navy hover:text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors bg-white"
                  >
                    Seafarer Port Services
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-[16/11] border-4 border-white">
                  <img
                    src={st.heroImage}
                    alt={st.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
