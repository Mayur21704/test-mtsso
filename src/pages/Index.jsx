import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Anchor,
  Wifi,
  Coffee,
  Heart,
  Scissors,
  Users,
  Globe2,
  HandHeart,
  MapPin,
  Package,
  LifeBuoy,
  ShieldCheck,
  HeartHandshake,
  Building2,
  Home as HomeIcon,
  ChevronRight,
  ChevronDown,
  Gift
} from "lucide-react";
import heroImg from "@/assets/toronto_card.jpeg";
import skyline from "@/assets/toronto-skyline.png";
import waterImg from "@/assets/water1.jpg";
import seaImg from "@/assets/sea1.jpg";
import newsImg1 from "@/assets/event1.jpeg";
import newsImg2 from "@/assets/event2.jpeg";
import newsImg3 from "@/assets/event3.jpeg";
import newsImg4 from "@/assets/event4.jpeg";
import newsImg5 from "@/assets/event5.webp";
const Index = () => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isHaircutOpen, setIsHaircutOpen] = useState(false);
  const allUpdates = [
    {
      tag: "Event",
      title: "Women in Maritime Leadership Luncheon",
      date: "May 20, 2026",
      location: "Port of Toronto",
      overview: "Join us as we celebrate the grand reopening of the Mission to Seafarers Toronto station alongside International Women in Maritime Day. This special event marks a new chapter after years of closure and highlights the vital role of women across the maritime sector.",
      image: newsImg1
    },
    {
      tag: "Event",
      title: "International Day of the Seafarer Flag Raising",
      date: "June 25, 2026",
      location: "Toronto City Hall",
      overview: "Join us for a special flag-raising ceremony at Toronto City Hall to honour and recognize the vital contributions of seafarers worldwide.",
      image: newsImg2
    },
    {
      tag: "Station News",
      title: "Toronto Station Opening and Community Welcome",
      date: "Coming Soon",
      location: "Toronto Station",
      overview: "We are thrilled to welcome the community to our new station space. Stay tuned for official dates and ways you can get involved locally.",
      image: newsImg3
    },
    {
      tag: "Story",
      title: "Stories from the Port of Toronto",
      date: "Ongoing",
      location: "Port of Toronto",
      overview: "Read firsthand accounts of the seafarers arriving at the Port of Toronto and the impact that a simple, welcoming presence can have after weeks at sea.",
      image: newsImg4
    },
    {
      tag: "Service",
      title: "New haircut service now available for visiting seafarers",
      date: "Now Available",
      location: "Toronto Station",
      overview: "A small service that makes a meaningful difference after time at sea. We are now accepting advance bookings for haircut services upon arrival to ensure seafarers get the care they need.",
      image: newsImg5
    }
  ];
  const displayedUpdates = showAllEvents ? allUpdates : allUpdates.slice(0, 3);
  return <>{
    /* ─────────── HERO ─────────── */
  }<section
    className="relative overflow-hidden bg-cover bg-center bg-no-repeat bg-white"
    style={{ backgroundImage: `url("${seaImg}")` }}
  >{
    /* Lowered opacity to 60% so the sea image clearly shows through */
  }<div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" /><div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-coral/10 blur-3xl z-0" /><div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-navy/10 blur-3xl z-0" /><div className="container-page relative z-10 pt-12 pb-14 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"><div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">{
    /* Left Column: Text Content */
  }<div className="lg:col-span-7 animate-fade-in-up"><div className="relative inline-block mt-4 md:mt-0">{
    /* Floating skyline accent positioned at the start */
  }<img
    src={skyline}
    alt="Toronto Skyline"
    aria-hidden="true"
    className="absolute bottom-[90%] left-0 w-28 md:w-40 opacity-80 animate-float pointer-events-none z-0"
    loading="lazy"
  /><span className="eyebrow bg-white/50 backdrop-blur inline-block px-2 py-1 rounded-md relative z-10">
                  Mission to Seafarers Southern Ontario-Toronto Station
                </span></div><h1 className="mt-5 text-[2.25rem] sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.05] text-navy tracking-tight drop-shadow-sm">
                A Global Lifeline with a {" "}<span className="relative inline-block text-coral whitespace-nowrap">
                  Local Heart
                  <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none"><path d="M2 7 Q50 1, 100 5 T198 4" stroke="hsl(var(--coral))" strokeWidth="3" strokeLinecap="round" fill="none" /></svg></span></h1><p className="mt-6 text-lg md:text-xl text-navy/90 leading-relaxed max-w-2xl font-medium"><strong className="text-navy font-bold text-xl md:text-2xl block mb-6 drop-shadow-sm">
                  Welcoming seafarers at the Port of Toronto with hospitality, practical support, and a place to belong while they are far from home.
                </strong>
                At the Port of Toronto, seafarers arrive after time at sea, sometimes for days, weeks and even months. Mission to Seafarers Toronto is here during that window. With practical support. With a place to step off the vessel. With people to speak to while they are ashore. We are a part of Mission to Seafarers Southern Ontario and Mission to Seafarers Canada, connected to a wider network that meets seafarers in ports around world.
              </p><div className="mt-8 flex flex-wrap gap-4 relative z-20"><Button asChild size="lg" className="bg-coral hover:bg-coral-light text-white font-bold shadow-warm hover:shadow-warm-hover h-12 px-7 cursor-pointer"><Link to="/contact">Contact the Station <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>{
    /* Updated Donate button to trigger Modal */
  }<Button onClick={() => setIsDonateOpen(true)} variant="outline" size="lg" className="border-2 border-navy text-navy bg-white/50 backdrop-blur hover:bg-navy hover:text-white font-bold h-12 px-7 cursor-pointer">
                  Donate
                </Button></div></div>{
    /* Right Column: Image */
  }<div className="lg:col-span-5 relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}><div className="relative rounded-2xl overflow-hidden shadow-soft aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"><img
    src={heroImg}
    alt="Aerial view of the Port of Toronto"
    className="absolute inset-0 h-full w-full object-fill"
    loading="lazy"
  /><div className="absolute inset-0 bg-gradient-to-tr from-navy-dark/60 via-navy/10 to-transparent" /><div className="absolute bottom-0 inset-x-0 p-5 md:p-7"><div className="rounded-xl bg-white/95 backdrop-blur p-4 md:p-5 shadow-card"><p className="text-xs font-bold uppercase tracking-wider text-coral">Toronto Station</p><p className="mt-1.5 text-sm md:text-base font-semibold text-navy leading-snug">
                      Welcoming crews who keep global trade moving.
                    </p></div></div></div>{
    /* Stat badge */
  }<div className="hidden sm:block absolute top-10 -right-4 lg:top-14 lg:-right-6 rounded-full bg-coral text-white px-5 py-4 shadow-warm rotate-[-6deg] z-10"><p className="text-[10px] font-bold uppercase tracking-widest opacity-90">Network</p><p className="text-2xl font-extrabold leading-none">200+</p><p className="text-[10px] font-bold opacity-90">Global Ports</p></div></div></div></div>{
    /* trust strip */
  }<div className="border-t border-border bg-white/80 backdrop-blur relative z-10"><div className="container-page mx-auto py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center justify-center">{[
    { n: "74,000+", l: "Operating Ships supported globally" },
    { n: "1,890,000+", l: "Seafarers supported worldwide" },
    { n: "160+", l: "Years of service to seafarers" }
  ].map((s) => <div key={s.l}><p className="text-2xl md:text-3xl font-extrabold text-navy">{s.n}</p><p className="text-xs md:text-sm mt-1 font-bold uppercase tracking-widest text-text-mid">{s.l}</p></div>)}</div></div></section>{
    /* ─────────── HOW WE HELP ─────────── */
  }<section className="py-20 md:py-24 bg-white"><div className="container-page"><div className="text-center max-w-3xl mx-auto"><span className="eyebrow mx-auto">How We Help</span><h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
              How We Support the World’s Seafarers in Canada
            </h2><p className="mt-5 text-base md:text-lg text-text-mid">
              As part of a 160+ year legacy, we offer practical, emotional, and spiritual support at Canadian ports, ensuring no seafarer is alone.
            </p></div><div className="mt-14 grid md:grid-cols-2 gap-5">{[
    {
      i: Users,
      tag: "At the Station",
      title: "Community Connection",
      body: "Refreshments and a comfortable place to sit, pause, and reconnect with loved ones in a welcoming station space.",
      cta: "Come visit us at the station",
      // Updated text
      to: "/contact",
      // Updated route
      isExternal: false
    },
    {
      i: Package,
      tag: "Logistics",
      title: "Seafarers Parcel Pickup Service",
      body: "Order essentials online and have them delivered securely to our station for pickup when you dock.",
      cta: "Send your Parcel",
      to: "https://parcelservice.mtsc.ca/",
      // REPLACE WITH REAL PLATFORM URL
      isExternal: true
      // Added logic for external link routing
    }
  ].map(({ i: Icon, tag, title, body, cta, to, isExternal, featured }) => <div
    key={title}
    className={`group rounded-2xl p-7 md:p-8 transition-all hover:-translate-y-1 flex flex-col items-start ${featured ? "bg-gradient-coral text-white shadow-warm hover:shadow-warm-hover" : "bg-warm-gray hover:shadow-card-hover"}`}
  ><span className={`grid h-12 w-12 place-items-center rounded-xl ${featured ? "bg-white/20" : "bg-coral-pale"}`}><Icon className={`h-6 w-6 ${featured ? "text-white" : "text-coral"}`} /></span><p className={`mt-5 text-[10px] font-extrabold uppercase tracking-widest ${featured ? "text-white/85" : "text-coral"}`}>{tag}</p><h3 className={`mt-1.5 text-xl md:text-2xl font-extrabold leading-tight ${featured ? "!text-white" : "text-navy"}`}>{title}</h3><p className={`mt-3 text-sm leading-relaxed flex-1 ${featured ? "text-white/90" : "text-text-mid"}`}>{body}</p>{
    /* Switch between internal Link and external <a> depending on content */
  }{isExternal ? <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold ${featured ? "text-white hover:gap-2.5" : "text-coral hover:gap-2.5"} transition-all`}
  >{cta} <ChevronRight className="h-4 w-4" /></a> : <Link
    to={to}
    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold ${featured ? "text-white hover:gap-2.5" : "text-coral hover:gap-2.5"} transition-all`}
  >{cta} <ChevronRight className="h-4 w-4" /></Link>}</div>)}</div><div className="mt-8 rounded-3xl border border-border bg-warm-gray p-8 md:p-12 text-center">{
    /* Updated Section Title */
  }<p className="text-sm font-bold uppercase tracking-widest text-navy mb-10">
              How We Care for Seafarers
            </p>{
    /* ─── ALL SERVICES AS PILLARS (Large Circles) ─── */
  }<div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto">{[
    { i: LifeBuoy, t: "Practical Support" },
    { i: Heart, t: "Mental and Emotional Health" },
    { i: HeartHandshake, t: "Spiritual Care" },
    { i: ShieldCheck, t: "Advocacy & Rights" },
    { i: Users, t: "Community Connection" },
    { i: Scissors, t: "Haircuts & Wellness" },
    { i: Package, t: "Seafarers Parcel Pickup Service" },
    { i: MapPin, t: "Transportation & Local Guidance" },
    { i: Wifi, t: "Wi-Fi & Communication Tools" },
    { i: Coffee, t: "Refreshments & Hospitality" }
  ].map(({ i: Icon, t }) => <div
    key={t}
    className="flex flex-col items-center justify-center w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-white shadow-xl transition-transform hover:-translate-y-1 p-3 sm:p-5"
  ><Icon className="h-10 w-10 sm:h-12 sm:w-12 text-navy mb-2 sm:mb-3" strokeWidth={1.5} /><span className="text-[12px] sm:text-[13px] md:text-sm font-extrabold text-coral leading-tight px-1 max-w-[85%]">{t}</span></div>)}</div></div></div></section>{
    /* ─────────── HAIRCUTS CALLOUT ─────────── */
  }<section className="py-20 bg-coral-pale/30 border-y border-border"><div className="container-page"><div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16"><div className="flex-1"><span className="eyebrow">A Small Service That Makes a Big Difference</span><h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-navy leading-tight">
                Haircuts for Seafarers
              </h2><p className="mt-5 text-base md:text-lg text-text-mid leading-relaxed">
                After extended periods at sea, small things can feel significant. Haircuts are available at the Toronto station by appointment. They can be arranged in advance by seafarers, ship agents, or crew representatives.
              </p><p className="mt-3 text-sm text-text-mid leading-relaxed italic">
                Availability is limited and scheduled around ship movements and volunteer capacity.
              </p><div className="mt-8 flex flex-wrap gap-4"><Button onClick={() => setIsHaircutOpen(true)} size="lg" className="bg-coral hover:bg-coral-light text-white font-bold shadow-warm h-12 cursor-pointer">
                  Book a Haircut Appointment <ArrowRight className="ml-2 h-4 w-4" /></Button><Button asChild variant="outline" size="lg" className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold h-12"><Link to="/contact">Contact the Toronto Station</Link></Button></div></div><div className="hidden md:flex w-full md:w-4/12 justify-center"><div className="grid h-48 w-48 place-items-center rounded-full bg-white shadow-soft border-4 border-coral/10"><Scissors className="h-20 w-20 text-coral" /></div></div></div></div></section>{
    /* ─────────── STRUCTURE DIAGRAM ─────────── */
  }<section className="py-20 md:py-24 bg-warm-gray"><div className="container-page"><div className="text-center max-w-2xl mx-auto"><span className="eyebrow mx-auto">Connected in purpose</span><h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
              Local presence. Connected in purpose.
            </h2><p className="mt-5 text-base md:text-lg text-text-mid">
              Mission to Seafarers Toronto is part of a connected network of care.
            </p></div><div className="mt-14 max-w-5xl mx-auto">{
    /* Diagram content remains unchanged */
  }<div className="rounded-[2rem] sm:rounded-[2.5rem] bg-navy-dark p-3 sm:p-5 md:p-8 shadow-xl text-white transition-all border border-navy/50"><div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-2 px-2 sm:px-2"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-coral border border-white/5 shadow-inner"><Globe2 className="h-6 w-6" /></span><div className="flex-1"><div className="inline-block bg-white/10 backdrop-blur px-3 py-1 rounded-full mb-2 border border-white/5"><p className="text-[10px] font-extrabold uppercase tracking-widest text-coral-light">Global Network</p></div><h3 className="text-xl md:text-2xl font-extrabold text-white">The Mission to Seafarers</h3><p className="mt-1.5 text-sm md:text-base text-white/70 max-w-2xl leading-relaxed">Connected globally across more than 200 ports.</p></div></div><div className="w-full flex justify-center -mb-3 mt-4 relative z-10"><div className="grid h-8 w-8 place-items-center rounded-full bg-navy-dark border-[3px] border-navy shadow-sm"><ChevronDown className="h-4 w-4 text-white/50" /></div></div><div className="rounded-[1.75rem] sm:rounded-[2rem] bg-navy p-3 sm:p-5 md:p-8 shadow-inner border border-white/5 transition-all relative overflow-hidden"><div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" /><div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-2 px-2 sm:px-2"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-coral-light border border-white/5"><Building2 className="h-6 w-6" /></span><div className="flex-1"><div className="inline-block bg-white/10 backdrop-blur px-3 py-1 rounded-full mb-2 border border-white/5"><p className="text-[10px] font-extrabold uppercase tracking-widest text-coral-light">National Body</p></div><h3 className="text-xl md:text-2xl font-extrabold text-white">MtS Canada</h3><p className="mt-1.5 text-sm md:text-base text-white/80 max-w-3xl leading-relaxed">Mission to Seafarers Canada provides the national leadership, fund development, partnerships, and support that strengthen stations across the country.</p></div></div><div className="w-full flex justify-center -mb-3 mt-4 relative z-10"><div className="grid h-8 w-8 place-items-center rounded-full bg-navy border-[3px] border-white shadow-sm"><ChevronDown className="h-4 w-4 text-white/70" /></div></div><div className="rounded-[1.5rem] sm:rounded-[1.75rem] bg-white p-3 sm:p-5 md:p-8 shadow-2xl text-navy transition-all border border-border"><div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-2 px-2 sm:px-2"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-warm-gray text-navy shadow-inner border border-navy/5"><Anchor className="h-6 w-6" /></span><div className="flex-1"><div className="inline-block bg-navy/5 px-3 py-1 rounded-full mb-2 border border-navy/10"><p className="text-[10px] font-extrabold uppercase tracking-widest text-coral">Regional Hub</p></div><h3 className="text-xl md:text-2xl font-extrabold">MtS Southern Ontario</h3><p className="mt-1.5 text-sm md:text-base text-text-mid max-w-3xl leading-relaxed">Within Ontario, Mission to Seafarers Southern Ontario leads work across regional ports including Toronto, Hamilton, and Oshawa.</p></div></div><div className="w-full flex justify-center -mb-3 mt-4 relative z-10"><div className="grid h-8 w-8 place-items-center rounded-full bg-white border-[3px] border-coral-light shadow-sm"><ChevronDown className="h-4 w-4 text-coral" /></div></div><div className="rounded-2xl sm:rounded-[1.5rem] bg-gradient-coral p-5 sm:p-7 md:p-10 shadow-[0_10px_40px_-10px_rgba(240,90,74,0.5)] text-white relative overflow-hidden group transition-all"><div className="absolute top-1/2 left-1/2 w-full aspect-square bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-slow" /><div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-coral shadow-lg"><HomeIcon className="h-7 w-7" /></span><div className="flex-1"><div className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full mb-2 border border-white/20 shadow-sm"><p className="text-[10px] font-extrabold uppercase tracking-widest text-white">Local Base</p></div><h3 className="text-2xl md:text-3xl font-extrabold text-white">Toronto Station</h3><p className="mt-3 text-sm md:text-base text-white/95 max-w-3xl leading-relaxed font-medium">At the Port of Toronto, that work becomes direct. Here, we offer seafarers a welcoming place where they can rest, connect with loved ones, access practical help, receive a haircut, and know that they are not alone.</p></div></div></div></div></div></div></div><div className="mt-12 text-center max-w-2xl mx-auto"><p className="text-sm text-text-mid italic mb-6">
              Toronto is an important gateway within Canada’s maritime network. Every year, seafarers arrive carrying the goods that keep our communities running, often with limited time ashore and few options once they disembark. We ensure that, when they arrive here, they are welcomed with dignity, kindness, and support.
            </p></div></div></section>{
    /* ─────────── NEWS & UPCOMING EVENTS STRIP ─────────── */
  }{
    /* ─────────── IMAGE GALLERY SECTION ─────────── */
  }{
    /* ─────────── DONATE / VOLUNTEER FOOTER BAND ─────────── */
  }<section
    className="relative py-20 md:py-24 bg-cover bg-center bg-no-repeat bg-warm-gray"
    style={{ backgroundImage: `url("${waterImg}")` }}
  ><div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" /><div className="container-page relative z-10"><div className="text-center max-w-3xl mx-auto mb-10"><span className="eyebrow mx-auto bg-white/50 backdrop-blur px-2 py-1 rounded-md">Support Locally Care Globally.</span><h2 className="mt-5 text-2xl md:text-3xl lg:text-4xl font-extrabold text-navy leading-tight drop-shadow-sm">
              Whether you volunteer, donate, provide a haircut, or simply help us welcome a seafarer, you are part of a connected network of care reaching from Toronto to ports around the world.
            </h2></div><div className="grid md:grid-cols-2 gap-6">{
    /* Volunteer — local */
  }<div className="rounded-3xl bg-white/95 backdrop-blur p-8 md:p-10 shadow-card hover:shadow-card-hover transition-all border-2 border-coral/15 flex flex-col"><span className="grid h-12 w-12 place-items-center rounded-xl bg-coral-pale text-coral"><Users className="h-6 w-6" /></span><p className="mt-5 text-[11px] font-extrabold uppercase tracking-widest text-coral">Get Involved</p><h3 className="mt-2 text-2xl md:text-3xl font-extrabold text-navy leading-tight">
                Help Us Welcome Seafarers to Toronto
              </h3><p className="mt-3 text-base text-text-mid leading-relaxed">
                There are many ways to support the Toronto station and the seafarers we serve. You can:
              </p><ul className="mt-5 space-y-2 text-sm text-text-mid flex-1"><li className="flex gap-2"><HandHeart className="h-4 w-4 text-coral mt-0.5 shrink-0" /> Volunteer at the station or during local events</li><li className="flex gap-2"><HandHeart className="h-4 w-4 text-coral mt-0.5 shrink-0" /> Donate snacks, refreshments, gift cards, furniture, or supplies</li><li className="flex gap-2"><HandHeart className="h-4 w-4 text-coral mt-0.5 shrink-0" /> Support haircut and wellness services for seafarers</li><li className="flex gap-2"><HandHeart className="h-4 w-4 text-coral mt-0.5 shrink-0" /> Help furnish and create a welcoming station space</li><li className="flex gap-2"><HandHeart className="h-4 w-4 text-coral mt-0.5 shrink-0" /> Support a local project or event</li><li className="flex gap-2"><HandHeart className="h-4 w-4 text-coral mt-0.5 shrink-0" /> Become a community or business partner</li></ul><p className="mt-6 mb-4 text-[11px] text-text-mid/80 italic">
                Local volunteers, supporters, and community partners help make Mission to Seafarers Toronto possible.
              </p><Button asChild size="lg" className="w-full bg-coral hover:bg-coral-light text-white font-bold shadow-warm h-12"><Link to="/contact">Contact the Toronto Station <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>{
    /* Donate — national */
  }<div className="rounded-3xl bg-gradient-hero text-white p-8 md:p-10 shadow-soft relative overflow-hidden flex flex-col justify-between"><div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-coral/30 blur-3xl" /><div className="relative flex-1"><span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-coral-light"><Heart className="h-6 w-6" /></span><p className="mt-5 text-[11px] font-extrabold uppercase tracking-widest text-coral-light">Donate</p><h3 className="mt-2 text-2xl md:text-3xl font-extrabold !text-white leading-tight">
                  Help Care for Seafarers
                </h3><p className="mt-3 text-base text-white/90 leading-relaxed">
                  Every gift helps us provide hospitality, transportation, Wi-Fi, refreshments, haircuts, and a welcoming place for seafarers visiting Toronto. You can choose to:
                </p><ul className="mt-5 space-y-2 text-sm text-white/90 font-medium"><li className="flex gap-2"><ChevronRight className="h-4 w-4 text-coral-light mt-0.5 shrink-0" /> Become a monthly donor</li><li className="flex gap-2"><ChevronRight className="h-4 w-4 text-coral-light mt-0.5 shrink-0" /> Make a one-time gift</li><li className="flex gap-2"><ChevronRight className="h-4 w-4 text-coral-light mt-0.5 shrink-0" /> Support Mission to Seafarers Toronto through Mission to Seafarers Canada</li></ul><p className="mt-6 mb-4 text-[11px] text-white/70 italic">
                  National donations and partnerships help strengthen the work of Mission to Seafarers Canada across Canada. All donations are processed through Mission to Seafarers Canada in support of the Toronto station and the wider mission across Canada.
                </p></div><div className="relative mt-auto">{
    /* Updated Donate button to trigger Modal */
  }<Button onClick={() => setIsDonateOpen(true)} size="lg" className="w-full bg-coral hover:bg-coral-light text-white font-bold shadow-warm h-12 px-2 text-sm sm:text-base cursor-pointer">
                  Donate Now <ArrowRight className="ml-2 h-4 w-4" /></Button></div></div></div></div></section>{
    /* ─────────── MODAL: DONATION WIDGET ─────────── */
  }<Dialog open={isDonateOpen} onOpenChange={setIsDonateOpen}><DialogContent className="max-w-5xl h-[95vh] p-0 overflow-hidden flex flex-col"><DialogHeader className="p-[6px] pb-3 shrink-0 border-b"><DialogTitle className="flex items-center gap-3 text-xl font-extrabold text-navy"><Gift className="h-5 w-5 text-coral" />
              Secure Donation Form
            </DialogTitle></DialogHeader><div className="flex-1 overflow-hidden p-2"><div className="w-full h-full bg-white rounded-lg border border-border overflow-hidden"><iframe
    src="https://www.canadahelps.org/en/dn/145961"
    title="CanadaHelps Secure Donation Form"
    className="w-full h-full border-none block bg-transparent"
    allow="payment"
  /></div></div></DialogContent></Dialog>{
    /* ─────────── MODAL: HAIRCUT BOOKING ─────────── */
  }<Dialog open={isHaircutOpen} onOpenChange={setIsHaircutOpen}><DialogContent className="max-w-5xl h-[95vh] p-0 overflow-hidden flex flex-col"><DialogHeader className="p-[6px] pb-3 shrink-0 border-b"><DialogTitle className="flex items-center gap-3 text-xl font-extrabold text-navy"><Scissors className="h-5 w-5 text-coral" />
              Book a Haircut Appointment
            </DialogTitle></DialogHeader><div className="flex-1 overflow-hidden p-2"><div className="w-full h-full bg-white rounded-lg border border-border overflow-hidden"><iframe
    src="https://fadekingzmobilebarber.square.site/"
    title="Toronto Haircut Service Booking"
    className="w-full h-full border-none block bg-transparent"
    allow="payment"
  /></div></div></DialogContent></Dialog></>;
};
export default Index;
