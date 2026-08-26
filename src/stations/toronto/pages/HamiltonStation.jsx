import { PageHero } from "@/components/PageHero";
import { Anchor, Home, Users, MapPin, Coffee } from "lucide-react";
import imgGangway from "@/assets/newimg/MS1A Different World, Just Beyond the Gangway.jpg";
import imgBuilding from "@/assets/newimg/MS1 More Than a Building.jpg";
import imgConnection from "@/assets/newimg/MS1A Space for Connection.jpg";
import imgPhysical from "@/assets/newimg/MS1Why Physical Stations Matter.jpg";
import imgLookingAhead from "@/assets/newimg/MS1 Looking Ahead.jpg";
const HamiltonStation = () => {
  return <><PageHero
    eyebrow="Inside Our Stations"
    title="A Glimpse into Hamilton"
    description="A different world, just beyond the gangway. How our Hamilton station provides a sanctuary of rest and connection for seafarers arriving in port."
  />{
    /* Section 1: A Different World */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 items-center"><div className="space-y-6 text-lg text-text-mid leading-relaxed"><div className="flex items-center gap-4 mb-4"><Anchor className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">
                  A Different World, Just Beyond the Gangway
                </h2></div><p>
                For seafarers, life is defined by routine, responsibility, and long stretches of time at sea. Days blend into nights. Work continues regardless of weather, time zone, or distance from home.
              </p><p>
                Ships are places of purpose. But they are not always places of rest. That is why stepping ashore matters. At the Port of Hamilton, the Mission to Seafarers Canada station offers something simple, yet profoundly important. A change of environment. A moment to breathe. A space to just be.
              </p></div><div><img
    src={imgGangway}
    alt="Pool table at the Hamilton Station"
    className="w-full h-auto rounded-2xl shadow-xl"
  /></div></div></div></section>{
    /* Section 2: More Than a Building & Life On Board */
  }<section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"><div className="order-2 lg:order-1"><img
    src={imgBuilding}
    alt="Lounge area inside the station"
    className="w-full h-auto rounded-2xl shadow-xl"
  /></div><div className="order-1 lg:order-2 space-y-10 text-lg text-text-mid leading-relaxed"><div className="space-y-6"><div className="flex items-center gap-4"><Home className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl font-extrabold text-navy">More Than a Building</h2></div><p>
                  At first glance, a seafarers’ centre may look modest. A few chairs. A warm drink. Wi-Fi. A quiet room. But inside, something much deeper is happening. The Hamilton station is a home away from home. It is where seafarers can sit without the pressure of duty, speak freely outside the hierarchy of the ship, connect with family, and rest in a space that feels human rather than operational.
                </p></div><div className="space-y-6"><h3 className="text-2xl font-bold text-navy">Life On Board</h3><p>
                  Seafarers work long hours under intense conditions. Their responsibilities are critical. The cargo must move. The vessel must operate. Safety must be maintained at all times. There is little separation between work and rest. Even when off duty, seafarers remain within the same environment. The same walls. The same routines. Over time, this can take a toll.
                </p><p className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm font-medium text-navy">
                  When a seafarer leaves the ship and enters a space like the Hamilton station, something shifts.
                </p><p>
                  The air feels different. The pace slows. The mind begins to relax. It is not just about comfort. It is a psychological reset. Ashore, seafarers regain a sense of normalcy, personal space beyond their role, and human connection outside of work structures.
                </p></div></div></div></div></section>{
    /* Section 3: A Space for Connection */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 items-center"><div className="space-y-6 text-lg text-text-mid leading-relaxed"><div className="flex items-center gap-4 mb-4"><Users className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">
                  A Space for Connection
                </h2></div><p>
                Inside the station, connection happens naturally. Seafarers talk about their families, their journeys, their challenges, and their hopes. They laugh. They share. They decompress.
              </p><p>
                For many, this is one of the few opportunities to engage in genuine, unstructured interaction outside of ship life. And in that space, something important happens.
              </p><p className="text-2xl font-bold text-navy border-l-4 border-coral pl-6 py-2">
                They feel seen.
              </p></div><div><img
    src={imgConnection}
    alt="Foosball table at the station"
    className="w-full h-auto rounded-2xl shadow-xl"
  /></div></div></div></section>{
    /* Section 4: Why Physical Stations Matter & Moments of Rest */
  }<section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"><div className="order-2 lg:order-1"><img
    src={imgPhysical}
    alt="Seafarers and volunteer posing together"
    className="w-full h-auto rounded-2xl shadow-xl"
  /></div><div className="order-1 lg:order-2 space-y-10 text-lg text-text-mid leading-relaxed"><div className="space-y-6"><div className="flex items-center gap-4"><MapPin className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl font-extrabold text-navy">Why Physical Stations Matter</h2></div><p>
                  In an increasingly digital world, it is easy to assume that connection can happen anywhere. But for seafarers, physical space still matters deeply. A station is not just a service hub. It is a place of belonging. It provides a safe and neutral environment, a break from the confined space of the vessel, and access to support that feels personal and immediate.
                </p></div><div className="space-y-6"><h3 className="text-2xl font-bold text-navy">Moments of Rest</h3><p>
                  Sometimes, what matters most is not what is offered, but what is felt. A quiet chair. A moment of stillness. A space with no expectations. These are the moments that restore people. At its core, the Hamilton station is about dignity. It is about recognizing that seafarers deserve spaces where they can rest, connect, and feel valued. Not as workers, but as people.
                </p></div></div></div></div></section>{
    /* Section 5: Looking Ahead */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4"><div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center bg-navy text-white rounded-3xl overflow-hidden shadow-2xl"><div className="p-10 md:p-14 space-y-8"><div className="flex items-center gap-4 mb-2"><Coffee className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl font-extrabold text-white">Looking Ahead</h2></div><p className="text-lg text-white/90 leading-relaxed">
                Honouring these spaces means understanding their impact. Because no matter how advanced ships become, one thing does not change. People need connection. People need space. People need moments away from the demands of their work. And sometimes, all it takes is stepping ashore.
              </p><div className="bg-white/10 p-6 rounded-xl border border-white/20"><p className="text-xl font-bold text-white text-center">
                  A simple step off the ship. A powerful return to self.
                </p></div></div><div className="h-full"><img
    src={imgLookingAhead}
    alt="Small altar table with literature"
    className="w-full h-full object-cover min-h-[300px]"
  /></div></div></div></section></>;
};
export default HamiltonStation;
