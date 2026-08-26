import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { HandHeart, Heart, Gift, ArrowRight } from "lucide-react";
const tiers = [
  { amount: "$15", period: "/month", body: "Help provide refreshments and hospitality." },
  { amount: "$25", period: "/month", body: "Support transportation and communication needs." },
  { amount: "$50", period: "/month", body: "Provide care, comfort, and practical assistance for visiting crews." }
];
const Donate = () => <><PageHero
  eyebrow="Donate"
  title="Help care for seafarers visiting Toronto"
  description="Every gift helps us provide hospitality, transportation, Wi-Fi, refreshments, haircuts, and a welcoming place for seafarers far from home."
  primaryCta={{ label: "Become a Monthly Donor", to: "#monthly" }}
  secondaryCta={{ label: "Make a One-Time Gift", to: "#one-time" }}
/>{
  /* Two giving paths */
}<section className="py-20 md:py-28 bg-white"><div className="container-page"><div className="grid md:grid-cols-2 gap-6">{
  /* Monthly */
}<div id="monthly" className="rounded-3xl bg-gradient-coral text-white p-8 md:p-10 shadow-warm scroll-mt-24"><HandHeart className="h-9 w-9 text-white" /><p className="mt-5 text-[11px] font-extrabold uppercase tracking-widest text-white/85">Recurring Giving</p><h2 className="mt-2 text-3xl md:text-4xl font-extrabold !text-white leading-tight">Become a Monthly Donor</h2><p className="mt-4 text-white/90">
              Monthly gifts help us plan ahead and ensure seafarers in Toronto always have access to the
              support they need.
            </p><div className="mt-7 space-y-3">{tiers.map((t) => <div key={t.amount} className="flex items-start gap-4 rounded-xl bg-white/15 backdrop-blur-sm p-4"><p className="text-2xl font-extrabold whitespace-nowrap">{t.amount}<span className="text-sm font-bold opacity-80">{t.period}</span></p><p className="text-sm text-white/90 pt-1.5">{t.body}</p></div>)}</div><Button size="lg" className="mt-8 w-full bg-white text-coral hover:bg-white/90 font-bold h-12">
              Become a Monthly Donor <ArrowRight className="ml-2 h-4 w-4" /></Button></div>{
  /* One-time */
}<div id="one-time" className="rounded-3xl bg-warm-gray p-8 md:p-10 border-2 border-navy/10 scroll-mt-24"><Heart className="h-9 w-9 text-coral" /><p className="mt-5 text-[11px] font-extrabold uppercase tracking-widest text-coral">One-Time Gift</p><h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-navy leading-tight">Make a One-Time Donation</h2><p className="mt-4 text-text-mid">
              Your gift helps create a welcoming station space, support local programs, and care for
              seafarers when they arrive in Toronto.
            </p><div className="mt-7 grid grid-cols-3 gap-2.5">{["$50", "$100", "$250"].map((a) => <button key={a} type="button" className="rounded-xl border-2 border-navy/15 bg-white py-4 text-lg font-extrabold text-navy hover:border-coral hover:text-coral transition-all">{a}</button>)}</div><Button size="lg" className="mt-7 w-full bg-navy hover:bg-navy-dark text-white font-bold h-12">
              Give Now <ArrowRight className="ml-2 h-4 w-4" /></Button><p className="mt-5 text-xs text-text-mid italic text-center">
              All donations are processed through Mission to Seafarers Canada in support of the Toronto
              station and the national mission.
            </p></div></div></div></section>{
  /* In-kind */
}<section className="py-20 md:py-24 bg-warm-gray"><div className="container-page grid lg:grid-cols-12 gap-10 items-center"><div className="lg:col-span-5"><Gift className="h-10 w-10 text-coral" /><h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-navy leading-tight">
            Donate Goods or Services
          </h2><p className="mt-5 text-base text-text-mid leading-relaxed">
            We are always grateful for in-kind gifts that help us create a welcoming and comfortable
            space for seafarers — from snacks to furniture to professional services.
          </p><div className="mt-7 flex flex-wrap gap-3"><Button asChild className="bg-coral hover:bg-coral-light text-white font-bold shadow-warm h-11 px-6"><Link to="/contact">Contact About In-Kind</Link></Button><Button asChild variant="outline" className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold h-11 px-6"><Link to="/get-involved">View Wish List</Link></Button></div></div><ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3">{[
  "Snacks and refreshments",
  "Gift cards",
  "Technology and Wi-Fi support",
  "Office supplies",
  "Haircut and personal care",
  "Professional services",
  "Event support",
  "Furniture & lounge items"
].map((t) => <li key={t} className="rounded-xl bg-white p-4 shadow-card flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-coral shrink-0" /><span className="text-sm font-semibold text-navy">{t}</span></li>)}</ul></div></section>{
  /* CTA */
}<section className="py-20 md:py-24 bg-gradient-hero text-white"><div className="container-page text-center max-w-2xl mx-auto"><h2 className="text-3xl md:text-4xl font-extrabold !text-white">Support locally. Give nationally. Care globally.</h2><p className="mt-5 text-white/85">
          Donations sustain the work of Mission to Seafarers Canada and the Toronto station.
        </p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button asChild size="lg" className="bg-coral hover:bg-coral-light text-white font-bold shadow-warm h-12 px-7"><Link to="/get-involved">Volunteer Locally</Link></Button><Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy bg-transparent font-bold h-12 px-7"><Link to="/contact">Contact Toronto</Link></Button></div></div></section></>;
export default Donate;
