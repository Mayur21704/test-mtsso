import { PageHero } from "@/components/PageHero";
import { HandHeart, Heart, Share2, Gift, CalendarPlus, Users, Linkedin, Youtube, Instagram, Facebook, Navigation } from "lucide-react";
import imgPrayer from "@/assets/newimg/GT1The Power of Prayer.jpg";
import imgGive from "@/assets/newimg/GT1 Give With Purpose.jpg";
import imgHost from "@/assets/newimg/GT1 Host Your Own Fundraiser.jpg";
import imgBePart from "@/assets/newimg/GT1Be Part of the Mission.jpg";
const WaysToGetInvolvedArticle = () => {
  return <><PageHero
    eyebrow="Take Action"
    title="Ways to Get Involved"
    description="Turning compassion into action."
  />{
    /* Intro Section */
  }<section className="py-16 bg-white border-b border-slate-100"><div className="container-page mx-auto px-4 max-w-4xl text-center space-y-6"><p className="text-xl md:text-2xl font-bold text-navy">
            At Mission to Seafarers Canada, every act of support matters.
          </p><p className="text-lg text-text-mid leading-relaxed">
            Whether it is a simple prayer, a shared post, or a meaningful gift, your involvement helps transform the lives of seafarers who spend months at sea, often far from family, community, and connection. Your support helps seafarers stay safe, connected, and cared for. Together, we can turn moments of isolation into moments of hope.
          </p></div></section>{
    /* The Power of Prayer */
  }<section className="py-16 md:py-24 bg-slate-50"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 items-center"><div className="order-2 lg:order-1 relative group"><img
    src={imgPrayer}
    alt="Woman holding a Bible in prayer"
    className="rounded-2xl shadow-xl w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
  /></div><div className="order-1 lg:order-2 space-y-6 text-lg text-text-mid leading-relaxed"><div className="flex items-center gap-4 mb-4"><HandHeart className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">The Power of Prayer</h2></div><p>
                This month, we are inviting you to take part in something deeply meaningful.
              </p><p>
                Our <strong>May Appeal</strong> is centered on our <a href="#" className="text-coral font-bold hover:underline">Prayer Wall</a>. Sending a prayer to a seafarer is simple. On our website, click the <em>Prayer Wall</em> button and submit your message.
              </p><p className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-navy italic">
                It takes only a moment, but for someone at sea, it can mean everything. Prayer has the power to comfort, to uplift, and to remind seafarers that they are not alone. Across oceans and continents, these messages become a quiet but powerful connection between those at sea and those on land.
              </p></div></div></div></section>{
    /* Stay Connected */
  }<section className="py-16 md:py-24 bg-navy text-white"><div className="container-page mx-auto px-4 max-w-5xl"><div className="text-center space-y-6 mb-12"><div className="flex justify-center mb-4"><Share2 className="text-coral w-10 h-10" /></div><h2 className="text-3xl md:text-4xl font-extrabold text-white">Stay Connected</h2><p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
              One of the simplest ways to support our work is by staying engaged. Follow us on social media. Share our stories. Help us amplify the voices of seafarers and bring visibility to a workforce that carries over 90 percent of the world’s goods.
            </p></div><div className="flex justify-center items-center gap-8 md:gap-12 max-w-2xl mx-auto bg-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-white/20"><a href="https://linkedin.com/company/mission-to-seafarers-canada/" target="_blank" rel="noreferrer" className="text-white hover:text-coral transition-all hover:scale-110"><Linkedin className="w-8 h-8 md:w-10 md:h-10" /></a><a href="https://www.youtube.com/@MissiontoSeafarersCanada" target="_blank" rel="noreferrer" className="text-white hover:text-coral transition-all hover:scale-110"><Youtube className="w-8 h-8 md:w-10 md:h-10" /></a><a href="https://www.instagram.com/missiontoseafarerscanada/" target="_blank" rel="noreferrer" className="text-white hover:text-coral transition-all hover:scale-110"><Instagram className="w-8 h-8 md:w-10 md:h-10" /></a><a href="https://www.facebook.com/SeafarersCanada/" target="_blank" rel="noreferrer" className="text-white hover:text-coral transition-all hover:scale-110"><Facebook className="w-8 h-8 md:w-10 md:h-10" /></a><a href="https://www.tiktok.com/@seafarerscanada" target="_blank" rel="noreferrer" className="text-white hover:text-coral transition-all hover:scale-110"><Navigation className="w-8 h-8 md:w-10 md:h-10" /> {
    /* Using Navigation as generic icon since TikTok isn't in standard Lucide */
  }</a></div><div className="text-center mt-12"><p className="text-2xl font-bold text-coral">
              Awareness leads to action. And action leads to impact.
            </p></div></div></section>{
    /* Give with Purpose */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-12 gap-12 items-center mb-16"><div className="lg:col-span-5"><img
    src={imgGive}
    alt="Illustration of hands holding hearts"
    className="rounded-2xl shadow-lg w-full h-auto"
  /></div><div className="lg:col-span-7 space-y-6"><div className="flex items-center gap-4 mb-4"><Gift className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">Give with Purpose</h2></div><p className="text-lg text-text-mid leading-relaxed">
                Mission to Seafarers Canada is part of a global ministry dedicated to caring for seafarers, the men and women who keep global trade moving. You can support this work in many ways:
              </p></div></div>{
    /* 6 Grid Cards for exact text matching */
  }<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"><div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow"><h3 className="text-xl font-bold text-coral mb-3">Make a Donation</h3><p className="text-text-mid">Give a one-time gift or become a monthly supporter. Your contribution directly supports seafarers across 10 ports nationwide.</p></div><div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow"><h3 className="text-xl font-bold text-coral mb-3">Tribute Gifts</h3><p className="text-text-mid">Honour someone special by making a gift in their name.</p></div><div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow"><h3 className="text-xl font-bold text-coral mb-3">Donor-Advised Funds (DAFs)</h3><p className="text-text-mid">Recommend a gift and make an immediate impact.</p></div><div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow"><h3 className="text-xl font-bold text-coral mb-3">Securities</h3><p className="text-text-mid">Donate stocks or mutual funds to maximize your impact.</p></div><div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow"><h3 className="text-xl font-bold text-coral mb-3">Corporate Support</h3><p className="text-text-mid">Partner with us to support both seafarers and Canada’s economic wellbeing.</p></div><div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow"><h3 className="text-xl font-bold text-coral mb-3">Legacy Giving</h3><p className="text-text-mid">Leave a lasting legacy and continue supporting seafarers for generations to come.</p></div></div></div></section>{
    /* Host Your Own Fundraiser */
  }<section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 items-center"><div className="space-y-6 text-lg text-text-mid leading-relaxed"><div className="flex items-center gap-4 mb-4"><CalendarPlus className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">Host Your Own Fundraiser</h2></div><p>
                Want to make an even bigger impact? Our <strong>Host an Event</strong> page makes it easy with a simple three-step process.
              </p><p className="font-semibold text-navy">You can:</p><ul className="grid sm:grid-cols-2 gap-4"><li className="flex items-start gap-3"><div className="bg-coral/10 p-1 rounded-full mt-1"><Heart className="w-4 h-4 text-coral" /></div><span>Turn your birthday into a fundraiser</span></li><li className="flex items-start gap-3"><div className="bg-coral/10 p-1 rounded-full mt-1"><Heart className="w-4 h-4 text-coral" /></div><span>Host a community event</span></li><li className="flex items-start gap-3"><div className="bg-coral/10 p-1 rounded-full mt-1"><Heart className="w-4 h-4 text-coral" /></div><span>Celebrate an anniversary with purpose</span></li><li className="flex items-start gap-3"><div className="bg-coral/10 p-1 rounded-full mt-1"><Heart className="w-4 h-4 text-coral" /></div><span>Invite others to support your cause</span></li></ul><p className="pt-4 font-bold text-navy text-xl">
                Every moment can become an opportunity to give back.
              </p></div><div><img
    src={imgHost}
    alt="People celebrating at a party with confetti"
    className="rounded-2xl shadow-xl w-full h-auto"
  /></div></div></div></section>{
    /* Be Part of the Mission */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4 max-w-5xl space-y-12"><div className="flex items-center justify-center gap-4 mb-4 text-center"><Users className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">Be Part of the Mission</h2></div><img
    src={imgBePart}
    alt="Group of women knitting together around a table"
    className="rounded-3xl shadow-xl w-full h-auto object-cover max-h-[500px]"
  /><div className="space-y-6 text-center text-lg md:text-xl text-text-mid leading-relaxed max-w-3xl mx-auto"><p>
              Seafarers keep the world moving. And together, we can make sure they are never forgotten.
            </p><p>
              Whether you give, share, host, or pray, you are part of something bigger. A global movement of care, compassion, and connection.
            </p><p className="text-2xl md:text-3xl font-extrabold text-navy pt-6">
              Get involved today. Because no seafarer should feel alone.
            </p></div></div></section></>;
};
export default WaysToGetInvolvedArticle;
