import { PageHero } from "@/components/PageHero";
import { Compass, Users, MapPin, CalendarDays, TrendingUp } from "lucide-react";
import imgGrowing from "@/assets/newimg/MF1 Growing together. Reaching further. Making an impact..png";
import imgHamilton from "@/assets/newimg/MF1-Hamilton Community and Connection.png";
import imgMovingForward from "@/assets/newimg/MF1-Moving Forward, Together.png";
const WhatsAhead = () => {
  return <><PageHero
    eyebrow="Future Outlook"
    title="What’s Ahead for Mission to Seafarers Canada"
    description="Growing together. Reaching further. Making an impact."
  />{
    /* Section 1: Intro & Toronto */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4">{
    /* Intro block with logo */
  }<div className="max-w-4xl mx-auto text-center space-y-8 mb-20"><img
    src={imgGrowing}
    alt="Mission to Seafarers Canada Region Logo"
    className="mx-auto max-w-sm md:max-w-md w-full h-auto drop-shadow-md mb-8"
  /><p className="text-lg md:text-xl text-text-mid leading-relaxed">
              As Mission to Seafarers Canada continues to expand its presence across the country, one truth remains constant. Our strength comes from working together.
            </p><p className="text-lg md:text-xl text-text-mid leading-relaxed">
              Across stations, communities, and partnerships, we are building something that is both national in reach and deeply local in impact. The months ahead reflect that growth, bringing meaningful moments of celebration, recognition, and connection.
            </p></div>{
    /* Toronto Block */
  }<div className="bg-slate-50 p-8 md:p-14 rounded-3xl border border-slate-200 shadow-sm max-w-4xl mx-auto"><div className="flex items-center gap-4 mb-4"><Compass className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">Toronto: A New Chapter Begins</h2></div><p className="text-coral font-bold text-xl mb-6">May 20, 2026</p><div className="space-y-6 text-lg text-text-mid leading-relaxed"><p>
                This spring marks a major milestone with the grand reopening of the Toronto station at the Port of Toronto. After years without a physical presence, the reopening represents more than a return. It signals a renewed commitment to serving seafarers in one of Canada’s most important ports. This moment will also be marked by a celebration of the International Day for Women in Maritime, recognizing the contributions of women across the sector and reinforcing the importance of moving from policy to practice in achieving gender equity at sea.
              </p><p className="font-semibold text-navy">
                Together, this event sets the tone for a stronger, more inclusive future.
              </p></div></div></div></section>{
    /* Section 2: Hamilton */
  }<section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"><div className="order-2 lg:order-1"><img
    src={imgHamilton}
    alt="Celebration Dinner in Hamilton"
    className="w-full h-auto rounded-2xl shadow-xl"
  /></div><div className="order-1 lg:order-2 space-y-6 text-lg text-text-mid leading-relaxed"><div className="flex items-center gap-4 mb-2"><Users className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">Hamilton: Community and Connection</h2></div><p className="text-coral font-bold text-xl mb-6">Celebration Dinner</p><p>
                In Hamilton, we continue to strengthen relationships through community engagement. An upcoming Celebration Dinner will bring together supporters, partners, and volunteers who play a vital role in sustaining the Mission’s work. Moments like these are essential. They remind us that behind every ship visit and every seafarer served is a community making it possible.
              </p></div></div></div></section>{
    /* Section 3: National Moment */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4 max-w-5xl"><div className="text-center space-y-6 mb-12"><div className="flex justify-center mb-4"><CalendarDays className="text-coral w-12 h-12" /></div><h2 className="text-3xl md:text-4xl font-extrabold text-navy">A National Moment: International Day of the Seafarer</h2><p className="text-coral font-bold text-2xl">June 25, 2026</p><p className="text-lg text-text-mid leading-relaxed max-w-3xl mx-auto">
              On June 25, communities across Canada will come together to recognize the people who keep the world moving. Seafarers transport over <strong>90 percent of global trade</strong>, yet their work often goes unseen. This year, multiple cities will host <strong>official proclamations and flag-raising ceremonies</strong>, shining a national spotlight on their contribution.
            </p></div>{
    /* Cleaned up Grid for Event Locations */
  }<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"><div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm text-center space-y-2"><MapPin className="text-navy w-6 h-6 mx-auto mb-2" /><p className="font-bold text-navy text-lg">St. John’s, Newfoundland and Labrador</p><p className="text-text-mid">9:00 AM at City Hall</p><p className="text-text-mid">1:00 PM at City Hall</p></div><div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm text-center space-y-2"><MapPin className="text-navy w-6 h-6 mx-auto mb-2" /><p className="font-bold text-navy text-lg">Halifax, Nova Scotia</p><p className="text-text-mid">9:00 AM at Grand Parade</p></div><div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm text-center space-y-2"><MapPin className="text-navy w-6 h-6 mx-auto mb-2" /><p className="font-bold text-navy text-lg">Oshawa, Ontario</p><p className="text-text-mid">9:00 AM at City Hall</p></div><div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm text-center space-y-2"><MapPin className="text-navy w-6 h-6 mx-auto mb-2" /><p className="font-bold text-navy text-lg">Toronto, Ontario</p><p className="text-text-mid">10:00 AM at Toronto City Hall</p></div><div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm text-center space-y-2 sm:col-span-2 lg:col-span-1"><MapPin className="text-navy w-6 h-6 mx-auto mb-2" /><p className="font-bold text-navy text-lg">Hamilton, Ontario</p><p className="text-text-mid">Hamilton City Hall</p></div></div><div className="space-y-6 text-lg text-text-mid leading-relaxed"><p>
              This moment brings together municipal leaders, maritime partners, and the broader community to recognize the essential role seafarers play in keeping global trade moving. Through the Port of Hamilton, goods connect Canada to the world, and behind every shipment are individuals whose work often goes unseen.
            </p><p>
              The ceremony is more than symbolic. It is an opportunity to acknowledge the people who spend months at sea, away from their families, ensuring the flow of goods that sustain our daily lives. By raising the Mission to Seafarers Canada flag, we are honoring the global seafaring community.
            </p><p>
              In addition, <strong>CBC Newfoundland has confirmed a one-hour lunchtime radio feature</strong>, highlighting Seafarers Day, the Newfoundland and Labrador station, and the work of Mission to Seafarers Canada. These moments of recognition matter. They bring visibility to an essential workforce and connect communities to the people behind global trade.
            </p></div></div></section>{
    /* Section 4: Moving Forward */
  }<section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200"><div className="container-page mx-auto px-4 max-w-5xl"><div className="text-center space-y-6 mb-12"><div className="flex justify-center mb-4"><TrendingUp className="text-coral w-12 h-12" /></div><h2 className="text-3xl md:text-4xl font-extrabold text-navy">Moving Forward, Together</h2><p className="text-lg text-text-mid leading-relaxed max-w-3xl mx-auto">
              Across the country, various stations are in discussion about planning a major annual event that will bring communities closer to the work of the Mission to Seafarers.
            </p></div><img
    src={imgMovingForward}
    alt="Map of Mission Across Canada"
    className="w-full h-auto rounded-3xl shadow-xl border border-slate-200 mb-12"
  /><div className="space-y-6 text-lg text-text-mid leading-relaxed max-w-4xl mx-auto"><p>
              As we continue to grow, these conversations reflect a shared vision. One that focuses on visibility, engagement, and creating meaningful opportunities for the public to connect with seafarers and the maritime world.
            </p><p>
              In Newfoundland and Labrador, Toronto, and Hamilton (MTSSO), this vision is already beginning to take shape. Each station continues to expand its reach and presence. From serving more vessels to building meaningful partnerships, these locations are becoming vital hubs of support for both local and international seafarers.
            </p><p>
              Looking ahead, plans are underway for major community-driven initiatives, including a Port Walk inspired by global Mission to Seafarers efforts. These events will bring communities closer to the port, creating awareness, engagement, and support for seafarers in a powerful and visible way.
            </p><p>
              Each of these moments reflects something bigger.Growth is not just about expanding services. It is about strengthening connection. Deepening impact. Building a network of care that stretches from coast to coast. Because when we work together, we do more than support seafarers. We ensure they are seen, valued, and never alone.
            </p><div className="pt-10 pb-6 border-t border-slate-300 mt-10"><p className="text-3xl md:text-4xl font-extrabold text-navy text-center">
                This is how we grow. Together.
              </p></div></div></div></section></>;
};
export default WhatsAhead;
