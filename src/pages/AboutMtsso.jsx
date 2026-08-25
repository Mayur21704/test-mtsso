import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, HeartHandshake, Compass, Anchor, ArrowRight, Gift } from "lucide-react";
import { DonateModal } from "@/components/DonateModal";

// Board portraits
import walterImg from "@/assets/Board Of Directors/Walter Stewart- Director.jpg";
import jimImg from "@/assets/Board Of Directors/Captain Jim Poound Director.jpg";
import noahImg from "@/assets/Board Of Directors/Noah Bonis Charancle-Director.jpg";
import seanSImg from "@/assets/Board Of Directors/Sean Slater-Director.jpg";
import seanRImg from "@/assets/Board Of Directors/Sean Reid-Director.jpg";
import isabelleImg from "@/assets/Board Of Directors/Isabelle Therrien-Director.jpg";
import kellyNImg from "@/assets/Board Of Directors/Kelly Noseworthy-Director.jpg";
import allwynImg from "@/assets/Board Of Directors/Allwyn Phillips.jpg";
import kellyMImg from "@/assets/Board Of Directors/Kelly McDonald.jpg";

export const AboutMtsso = () => {
  const [donateOpen, setDonateOpen] = useState(false);

  const boardMembers = [
    { name: "Walter Stewart", role: "Chair of the Board", bio: "Veteran maritime industry leader guiding MTSSO's regional mission and operational expansion.", image: walterImg },
    { name: "Captain Jim Pound", role: "Director & Master Mariner", bio: "Over 35 years of Great Lakes command experience providing deep maritime operational insight.", image: jimImg },
    { name: "Noah Bonis Charancle", role: "Director", bio: "Shipping logistics and supply-chain executive championing seafarer welfare in Southern Ontario.", image: noahImg },
    { name: "Sean Slater", role: "Director", bio: "Maritime commercial finance and governance specialist with extensive experience across Ontario ports.", image: seanSImg },
    { name: "Sean Reid", role: "Director", bio: "Maritime industry advocate dedicated to workforce mental health and welfare standards.", image: seanRImg },
    { name: "Isabelle Therrien", role: "Director", bio: "Marine insurance leader and champion of diversity and welfare in Canadian shipping.", image: isabelleImg },
    { name: "Kelly Noseworthy", role: "Director", bio: "Community leadership specialist focused on volunteer engagement and donor partnerships.", image: kellyNImg },
    { name: "Allwyn Phillips", role: "Director", bio: "Longtime supporter and advisor on port operations and multi-faith seafarer outreach.", image: allwynImg },
    { name: "Kelly McDonald", role: "Director", bio: "Community outreach and volunteer coordination director.", image: kellyMImg },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="bg-warm-gray py-16 md:py-24 border-b border-border">
        <div className="container-page max-w-4xl text-center mx-auto">
          <span className="eyebrow mx-auto">Regional Governance</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            About Mission to Seafarers Southern Ontario
          </h1>
          <p className="mt-5 text-lg text-text-mid leading-relaxed">
            MTSSO is the regional umbrella organization coordinating and sustaining seafarer welfare, ship visiting, and port chaplaincy across the key industrial ports of Toronto, Hamilton, Oshawa, and Port Colborne.
          </p>
        </div>
      </section>

      {/* ─── MANDATE & PURPOSE ─── */}
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="eyebrow">Our Mandate</span>
            <h2 className="text-3xl font-extrabold text-navy">
              Caring for the Unsung Workforce of Global Commerce
            </h2>
            <p className="text-text-mid text-base leading-relaxed">
              Over 90% of global trade travels by sea. The seafarers who crew these massive bulk carriers, container ships, and tankers spend 6 to 10 months away from family, facing severe isolation, high-stress conditions, and rigorous schedules.
            </p>
            <p className="text-text-mid text-base leading-relaxed">
              When their vessels enter the Great Lakes corridor, MTSSO port stations provide an immediate warm welcome, practical resources, physical and mental respite, free connectivity, and pastoral care regardless of race, religion, or background.
            </p>

            <div className="pt-4 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-warm-gray border border-border">
                <Compass className="w-5 h-5 text-coral mb-2" />
                <h4 className="font-extrabold text-navy text-sm">4 Ontario Ports</h4>
                <p className="text-xs text-text-mid mt-1">Full coverage of Lake Ontario and Welland Canal transit.</p>
              </div>
              <div className="p-4 rounded-xl bg-warm-gray border border-border">
                <Users className="w-5 h-5 text-coral mb-2" />
                <h4 className="font-extrabold text-navy text-sm">170-Year Legacy</h4>
                <p className="text-xs text-text-mid mt-1">Part of the global Anglican maritime mission founded in 1856.</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-navy text-white space-y-6">
            <h3 className="text-2xl font-extrabold text-white">The MTSSO Network Structure</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              MTSSO brings unified operational standards, insurance, board governance, and fundraising infrastructure to our Southern Ontario stations while allowing each port to adapt to its unique maritime traffic.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { name: "Port of Toronto Station", info: "Specialized crew lounge, haircuts, transportation, downtown Toronto access." },
                { name: "Hamilton Harbour Station", info: "Heavy industrial steel and grain port, high-volume ship visits." },
                { name: "Port of Oshawa Station", info: "Agricultural & steel hub on eastern Lake Ontario, direct gangway ministry." },
                { name: "Port Colborne / Welland Canal", info: "Vital transit station servicing vessels passing through the locks." },
              ].map((port) => (
                <div key={port.name} className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <h5 className="font-extrabold text-coral-light text-sm">{port.name}</h5>
                  <p className="text-xs text-white/70 mt-0.5">{port.info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOARD OF DIRECTORS ─── */}
      <section className="py-16 md:py-24 bg-warm-gray">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow mx-auto">Governance</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-navy">
              Board of Directors
            </h2>
            <p className="mt-2 text-text-mid text-sm">
              Our volunteer board brings deep maritime, legal, corporate, and pastoral expertise to support seafarers across Southern Ontario.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {boardMembers.map((member) => (
              <div key={member.name} className="p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 mb-4 shadow-inner">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-base font-extrabold text-navy">{member.name}</h3>
                  <span className="text-xs font-bold text-coral block mt-0.5">{member.role}</span>
                  <p className="text-xs text-text-mid mt-2 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CanadaHelps Modal */}
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
};
