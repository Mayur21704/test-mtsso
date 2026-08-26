import { PageHero } from "@/components/PageHero";
import { Ship, Anchor, MessageCircle, Heart, LifeBuoy } from "lucide-react";
import imgTheoMain from "@/assets/newimg/S1A Visit to the Theo G Istanbul.jpg";
import imgTheo1 from "@/assets/newimg/S1A Visit to the Theo G Istanbul 1Stimg.jpg";
import imgTheo2 from "@/assets/newimg/S1A Visit to the Theo G Istanbul 2nitimg.jpg";
import imgTheo3 from "@/assets/newimg/S1A Visit to the Theo G Istanbul 3rditimg.jpg";
import imgConversations from "@/assets/newimg/S1 Conversations That Matter.jpg";
import imgMoreThanVisit from "@/assets/newimg/S1More Than a Visit.jpg";
const ShipVisits = () => {
  return <><PageHero
    eyebrow="Ship Visits"
    title="A Simple Visit. A Powerful Impact."
    description="At Mission to Seafarers Canada, one of the most meaningful ways we support seafarers is through ship visits. At first glance, a ship visit may seem simple. A chaplain boards a vessel, greets the crew, and spends time in conversation. But what happens in those moments is far more powerful than it appears."
  />{
    /* Section 1: A Visit to the Theo G Istanbul & Stepping On Board */
  }<section className="py-20 bg-white"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 items-center mb-16"><div className="space-y-6"><div className="flex items-center gap-3 mb-2"><Ship className="text-coral h-8 w-8" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">A Visit to the Theo G Istanbul</h2></div><p className="text-text-mid text-lg leading-relaxed">
                We recently had the opportunity to follow Dan Phannenhour, Port Chaplain at the Hamilton station, during one of his ship visits.
              </p><p className="text-text-mid text-lg leading-relaxed">
                Every visit begins with preparation. Before stepping on board, Dan reviews a full vessel briefing. This includes key details about the ship, its journey, and its crew. At first, it may seem routine, but this information becomes essential. It allows Dan to connect in a way that is personal, relevant, and meaningful.
              </p><p className="text-navy font-semibold text-lg bg-blue-50 inline-block px-5 py-3 rounded-xl border border-blue-100">
                On this visit, the vessel was the Theo G Istanbul (IMO 9415246).
              </p></div><div className="relative group"><img src={imgTheoMain} alt="The Theo G Istanbul" className="rounded-2xl shadow-xl w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div></div><div className="mt-24"><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"><img src={imgTheo1} alt="Ship Visit View 1" className="rounded-xl shadow-md w-full h-72 object-cover" /><img src={imgTheo2} alt="Ship Visit View 2" className="rounded-xl shadow-md w-full h-72 object-cover" /><img src={imgTheo3} alt="Ship Visit View 3" className="rounded-xl shadow-md w-full h-72 object-cover" /></div><div className="max-w-4xl mx-auto text-center space-y-6 mt-12 bg-gray-50 p-12 rounded-3xl shadow-sm border border-gray-200"><div className="flex justify-center mb-4"><Anchor className="text-coral h-12 w-12" /></div><h3 className="text-2xl md:text-3xl font-bold text-navy">Stepping On Board</h3><p className="text-text-mid text-lg md:text-xl leading-relaxed">
                As Dan stepped aboard, he was warmly welcomed by the crew. They offered him coffee. In return, he offered chocolate. It was a small exchange, but it immediately created a sense of comfort and familiarity. That is where the visit truly began.
              </p></div></div></div></section>{
    /* Section 2: Conversations That Matter */
  }<section className="py-24 bg-slate-50 border-y border-slate-200"><div className="container-page mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center"><div className="order-2 lg:order-1 relative"><div className="absolute inset-0 bg-coral/20 rounded-3xl transform -translate-x-4 translate-y-4" /><img src={imgConversations} alt="Conversations That Matter" className="relative rounded-3xl shadow-xl w-full object-cover z-10" /></div><div className="order-1 lg:order-2 space-y-8"><div className="flex items-center gap-3 mb-2"><MessageCircle className="text-coral h-8 w-8" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">Conversations That Matter</h2></div><p className="text-text-mid text-lg leading-relaxed">
              Seated in the crew lounge, the conversation unfolded naturally. It moved from global events and ongoing conflicts to life on board, the realities of work, and the long journeys at sea. Soon, the tone shifted. The crew began sharing photos of their families, stories of their children’s graduations, and memories from past vacations. The conversation was not forced. It flowed.
            </p><div className="border-l-4 border-coral pl-6 py-2 bg-white/50 rounded-r-lg"><p className="text-navy text-xl font-medium italic leading-relaxed">
                What stood out most was not what was said, but what was felt. There was laughter. There was ease. There was a visible shift in energy.
              </p></div><p className="text-text-mid text-lg leading-relaxed">
              For a moment, the crew were not just seafarers fulfilling demanding roles. They were individuals, reconnecting with life beyond the ship.
            </p></div></div></section>{
    /* Section 3: Why Ship Visits Matter & Conclusion */
  }<section className="py-24 bg-white"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-12 gap-16">{
    /* Left Column: Why Ship Visits Matter */
  }<div className="lg:col-span-7 space-y-8 flex flex-col justify-center"><div className="flex items-center gap-3"><Heart className="text-coral h-8 w-8" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">Why Ship Visits Matter</h2></div><p className="text-text-mid text-lg leading-relaxed">
                Ship visits may appear simple, but their impact is profound. For seafarers who spend months at sea, often in isolation, these visits provide something deeply human:
              </p><ul className="space-y-5 bg-slate-50 p-8 rounded-2xl border border-slate-100"><li className="flex items-center gap-4"><div className="bg-white p-2 rounded-full shadow-sm"><LifeBuoy className="text-coral w-6 h-6 flex-shrink-0" /></div><span className="text-navy text-xl font-medium">A chance to speak freely</span></li><li className="flex items-center gap-4"><div className="bg-white p-2 rounded-full shadow-sm"><LifeBuoy className="text-coral w-6 h-6 flex-shrink-0" /></div><span className="text-navy text-xl font-medium">A connection to the outside world</span></li><li className="flex items-center gap-4"><div className="bg-white p-2 rounded-full shadow-sm"><LifeBuoy className="text-coral w-6 h-6 flex-shrink-0" /></div><span className="text-navy text-xl font-medium">A reminder that they are not alone</span></li></ul><p className="text-text-mid text-lg leading-relaxed">
                Sometimes, all it takes is a conversation. A familiar gesture. A moment of presence. And in that moment, everything changes.
              </p></div>{
    /* Right Column: More Than a Visit (Highlighted Card) */
  }<div className="lg:col-span-5 space-y-6 bg-navy text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between"><div className="absolute top-0 right-0 p-8 opacity-5"><Ship className="w-40 h-40 transform translate-x-8 -translate-y-8" /></div><div className="relative z-10 space-y-6"><h3 className="text-3xl md:text-4xl font-extrabold text-white">More Than a Visit</h3><p className="text-white/90 text-lg leading-relaxed">
                  What Dan brings on board is not just support. It is presence.
                </p></div><div className="relative z-10 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 my-6"><img src={imgMoreThanVisit} alt="Port Chaplain Dan Phannenhour" className="w-full h-72 object-cover object-top" /></div><div className="space-y-6 relative z-10"><p className="text-white/90 text-lg leading-relaxed">
                  It is the ability to meet people where they are, to listen without judgment, and to create space for connection in an environment where it is often missing.
                </p><p className="text-white text-xl font-semibold italic border-t border-white/20 pt-6">
                  That is the power of a ship visit. Not grand. Not complicated. But deeply, undeniably important.
                </p></div></div></div></div></section></>;
};
export default ShipVisits;
