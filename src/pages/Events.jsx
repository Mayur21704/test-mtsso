import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Ship,
  Users,
  Lightbulb,
  Anchor,
  Handshake,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import eventHeroImg from "@/assets/eventheroimg.avif";
import eventImg1 from "@/assets/GlipmsOfevents.avif";
import eventImg2 from "@/assets/GlipmsOfevents2.avif";
import eventImg3 from "@/assets/GlipmsOfevents3.avif";
import eventImg4 from "@/assets/GettingSupport.avif";
import eventImg5 from "@/assets/event6.jpeg";
import eventImg6 from "@/assets/event7.jpeg";
import eventImg7 from "@/assets/event8.jpeg";
import womenInMaritimeImg from "@/assets/newimg/Ho1Honouring Women in Maritime – From Policy to Practice.jpg";
export default function Events() {
  const [isHighlightsModalOpen, setIsHighlightsModalOpen] = useState(false);
  const scrollToUpcoming = () => {
    document.getElementById("upcoming-events")?.scrollIntoView({ behavior: "smooth" });
  };
  return <div className="flex flex-col min-h-screen bg-white">{
    /* 1. HERO SECTION */
  }<section className="relative bg-navy text-white py-24 lg:py-32 overflow-hidden"><div className="absolute inset-0 z-0 opacity-20"><img
    src={eventHeroImg}
    alt="Documentary style maritime event"
    className="w-full h-full object-cover"
  /><div className="absolute inset-0 bg-navy/60 mix-blend-multiply" /></div><div className="container relative z-10 max-w-5xl mx-auto px-4 md:px-6"><h1 className="text-4xl text-gray-200 md:text-5xl lg:text-6xl font-extrabold mb-6">
            Events & Community Gatherings
          </h1><p className="text-lg md:text-xl max-w-3xl mb-10 text-gray-200 leading-relaxed">
            Mission to Seafarers Toronto hosts events, conversations, awareness initiatives, 
            and waterfront gatherings that help connect people to maritime life and the 
            seafarers who help keep global trade moving.
          </p><Button
    onClick={scrollToUpcoming}
    size="lg"
    className="bg-coral hover:bg-coral-light text-white font-bold text-base md:text-lg px-8 h-14"
  >
            View Upcoming Events
            <ArrowRight className="ml-2 w-5 h-5" /></Button></div></section>{
    /* 2. FEATURED EVENT SECTION */
  }<section id="upcoming-events" className="py-20 lg:py-28 bg-warm-gray/30"><div className="container max-w-6xl mx-auto px-4 md:px-6"><div className="bg-white rounded-2xl shadow-soft border border-border overflow-hidden flex flex-col lg:flex-row">{
    /* Event Image / Visual side */
  }<div className="lg:w-2/5 bg-navy relative min-h-[300px]"><img
    src={womenInMaritimeImg}
    alt="Women in Maritime"
    className="absolute inset-0 w-full h-full object-cover opacity-60 "
  /><div className="absolute inset-0 p-8 flex flex-col justify-end"><span className="inline-block bg-coral text-white font-bold px-3 py-1 text-sm uppercase tracking-wider w-max mb-4 rounded-sm">
                  Featured Event
                </span><h2 className="text-3xl font-extrabold text-white">Women in Maritime 2026</h2></div></div>{
    /* Event Details side */
  }<div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center"><div className="mb-6 space-y-3"><h3 className="text-xl md:text-2xl font-bold text-navy">
                  Theme: From Policy to Practice: Advancing Gender Equality for Maritime Excellence
                </h3><p className="text-coral font-semibold text-lg">
                  International Day for Women in Maritime & Reopening of the Mission to Seafarers Toronto Station
                </p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"><div className="flex items-start gap-3"><Calendar className="w-6 h-6 text-coral shrink-0 mt-0.5" /><div><p className="font-semibold text-navy">When</p><p className="text-gray-600">Wednesday, May 20, 2026</p></div></div><div className="flex items-start gap-3"><MapPin className="w-6 h-6 text-coral shrink-0 mt-0.5" /><div><p className="font-semibold text-navy">Where</p><p className="text-gray-600">Port of Toronto Cruise Ship Terminal</p></div></div></div><div className="space-y-4 text-gray-700 leading-relaxed mb-8"><p>
                  This gathering brings together maritime leaders, cadets, labour voices, 
                  educators, seafarers, and community partners for a day of conversation, 
                  reflection, and collaboration focused on the realities shaping women's 
                  experiences across the maritime sector.
                </p><p>
                  The event also marks the reopening of the Mission to Seafarers Toronto 
                  Station, helping restore a welcoming place of care and connection for 
                  seafarers arriving at the Port of Toronto.
                </p></div>{
    /* Trigger for Popup */
  }<div><Button
    onClick={() => setIsHighlightsModalOpen(true)}
    size="lg"
    variant="outline"
    className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold"
  >
                  View Event Highlights
                </Button></div></div></div></div></section>{
    /* 3. STORIES FROM OUR EVENTS (CAROUSEL SECTION) */
  }<section className="pb-20 md:pb-24 pt-10 bg-white"><div className="container-page"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
              Stories From Our Events
            </h2><div className="w-24 h-1 bg-coral mx-auto" /></div><Carousel opts={{ align: "start", loop: true }} className="w-full"><CarouselContent className="-ml-4">{[eventImg1, eventImg2, eventImg3, eventImg4, eventImg5, eventImg6, eventImg7].map((img, i) => <CarouselItem key={i} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"><div className="overflow-hidden rounded-2xl shadow-sm group"><img src={img} alt={`Event moment ${i + 1}`} className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /></div></CarouselItem>)}</CarouselContent><CarouselPrevious className="-left-4 md:-left-6" /><CarouselNext className="-right-4 md:-right-6" /></Carousel></div></section>{
    /* 4. FINAL CTA */
  }<section className="py-20 lg:py-28 bg-navy text-white text-center"><div className="container max-w-4xl mx-auto px-4 md:px-6"><h2 className="text-3xl md:text-5xl text-gray-200  font-extrabold mb-6">
            Be Part of the Conversation
          </h2><p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Whether through attending an event, volunteering, donating, partnering with us, 
            or supporting the station, every act of involvement helps strengthen care and 
            visibility for seafarers visiting Toronto.
          </p><div className="flex flex-col sm:flex-row justify-center items-center gap-4"><Button asChild size="lg" className="bg-coral hover:bg-coral-light text-white font-bold w-full sm:w-auto h-14 px-8"><Link to="/contact"><Handshake className="w-5 h-5 mr-2" />
                Partner With Us
              </Link></Button><Button asChild size="lg" variant="outline" className="border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-navy font-bold w-full sm:w-auto h-14 px-8"><Link to="/get-involved"><Users className="w-5 h-5 mr-2" />
                Volunteer
              </Link></Button><Button asChild size="lg" variant="outline" className="border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-navy font-bold w-full sm:w-auto h-14 px-8"><Link to="/support"><Heart className="w-5 h-5 mr-2" />
                Support the Toronto Station
              </Link></Button></div></div></section>{
    /* --- POPUP (DIALOG) FOR EVENT HIGHLIGHTS --- */
  }<Dialog open={isHighlightsModalOpen} onOpenChange={setIsHighlightsModalOpen}><DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0"><DialogHeader className="p-6 md:p-8 border-b bg-warm-gray/30 sticky top-0 z-10 backdrop-blur-md"><DialogTitle className="text-2xl md:text-3xl font-extrabold text-navy">
              What the Day Includes
            </DialogTitle></DialogHeader><div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">{
    /* Highlight 1 */
  }<div className="flex gap-4"><div className="bg-coral/10 p-3 h-fit rounded-lg shrink-0"><Lightbulb className="w-7 h-7 text-coral" /></div><div><h4 className="text-xl font-bold text-navy mb-2">Leadership Conversations</h4><p className="text-gray-600 leading-relaxed">
                  Interactive discussions exploring: leadership, workplace culture, retention, mentorship, operational realities, and the future of maritime excellence in Canada.
                </p></div></div>{
    /* Highlight 2 */
  }<div className="flex gap-4"><div className="bg-coral/10 p-3 h-fit rounded-lg shrink-0"><Anchor className="w-7 h-7 text-coral" /></div><div><h4 className="text-xl font-bold text-navy mb-2">Toronto Station Reopening</h4><p className="text-gray-600 leading-relaxed">
                  Celebrating the reopening of a dedicated support and hospitality space for seafarers visiting Toronto.
                </p></div></div>{
    /* Highlight 3 */
  }<div className="flex gap-4"><div className="bg-coral/10 p-3 h-fit rounded-lg shrink-0"><Users className="w-7 h-7 text-coral" /></div><div><h4 className="text-xl font-bold text-navy mb-2">Maritime Community Gathering</h4><p className="text-gray-600 leading-relaxed">
                  An opportunity for maritime professionals, cadets, labour leaders, volunteers, and community partners to connect and collaborate.
                </p></div></div>{
    /* Highlight 4 */
  }<div className="flex gap-4"><div className="bg-coral/10 p-3 h-fit rounded-lg shrink-0"><Ship className="w-7 h-7 text-coral" /></div><div><h4 className="text-xl font-bold text-navy mb-2">Waterfront & Port Atmosphere</h4><p className="text-gray-600 leading-relaxed">
                  A uniquely maritime setting at the Port of Toronto connecting public awareness directly to the realities of global movement and trade.
                </p></div></div></div>{
    /* Popup Footer */
  }<div className="p-6 md:p-8 border-t bg-gray-50 flex justify-end"><Button
    onClick={() => setIsHighlightsModalOpen(false)}
    className="bg-navy hover:bg-navy/90 text-white font-bold"
  >
              Close Details
            </Button></div></DialogContent></Dialog></div>;
}
