import { PageHero } from "@/components/PageHero";
import { Navigation, ShieldCheck, HeartHandshake, Ship } from "lucide-react";
import imgMain1 from "@/assets/newimg/Ho1Honouring Women in Maritime \u2013 From Policy to Practice.jpg";
import imgMain2 from "@/assets/newimg/Ho1Honouring Women in Maritime \u2013 From Policy to Practice2.jpg";
import imgChangingTide from "@/assets/newimg/Ho1 A Changing Tide.jpg";
import imgReality from "@/assets/newimg/Ho1 Responsibility And reality.jpg";
import imgConnection from "@/assets/newimg/Ho1 The Power of Connection.png";
import imgRole from "@/assets/newimg/Ho1 The Role We Play.jpg";
import imgLookingAhead from "@/assets/newimg/Ho1 Looking Ahead.jpg";
const WomenInMaritime = () => {
  return <><PageHero
    eyebrow="May 18 Recognition"
    title="Honouring Women in Maritime"
    description="From Policy to Practice: A global recognition led by the International Maritime Organization. A moment to reflect, recognize, and renew our commitment."
  />{
    /* Intro Section */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4"><div className="grid lg:grid-cols-2 gap-12 items-center"><div className="space-y-6 text-lg text-text-mid leading-relaxed"><h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-6">
                Honouring Women in Maritime – From Policy to Practice
              </h2><p>
                May 18 marks the <strong>International Day for Women in Maritime</strong>, a global recognition led by the International Maritime Organization.
              </p><p>
                It is a day that goes beyond celebration. It is a moment of reflection, recognition, and renewed commitment.
              </p><p>
                A moment to acknowledge the women who have long been part of this industry, often unseen. And a moment to ask what it truly means to move from policy to practice.
              </p></div><div><img
    src={imgMain1}
    alt="Woman in hardhat at port"
    className="w-full h-auto rounded-2xl shadow-xl"
  /></div></div></div></section>{
    /* A Changing Tide */
  }<section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200"><div className="container-page mx-auto px-4"><div className="max-w-4xl mx-auto space-y-8"><div className="flex items-center gap-4 mb-8"><Navigation className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl md:text-4xl font-extrabold text-navy">A Changing Tide</h2></div><img
    src={imgMain2}
    alt="Woman in yellow maritime jacket"
    className="w-full h-auto rounded-2xl shadow-lg mb-8"
  /><div className="space-y-6 text-lg text-text-mid leading-relaxed"><p>
                For generations, the maritime industry has been shaped by resilience, endurance, and tradition.
              </p><p>
                For women, however, the journey into this space has often required something more. It has required determination in the face of barriers, strength in environments not designed for them, and the courage to step into roles where representation has been limited.
              </p><p className="font-medium text-navy text-xl border-l-4 border-coral pl-6 py-2">
                Today, that tide is changing.
              </p><p>
                Across vessels and ports around the world, women are not only participating, they are leading. They are navigating ships, managing cargo operations, and shaping an industry that moves over <strong>90 percent of the world’s goods</strong>.
              </p><p>
                Among them is <strong>Chief Officer Reshma Nilofer Naha</strong>.
              </p></div><div className="pt-12"><img
    src={imgChangingTide}
    alt="Chief Officer Reshma Nilofer Naha"
    className="w-full h-auto rounded-2xl shadow-lg mb-8"
  /><div className="space-y-6 text-lg text-text-mid leading-relaxed"><p>
                  A trailblazing mariner with Fednav, Reshma Naha represents a new generation of leadership in maritime. She is notably the first Indian woman to become a marine pilot and today serves as a Chief Officer, the second in command aboard a merchant vessel.
                </p><p>
                  Her role is critical. On vessels like the <em>Federal Hamilton</em>, a bulk carrier transporting cargo such as grain from ports like Hamilton to destinations around the world, the Chief Officer is responsible for ensuring operations run safely, efficiently, and precisely. It is a role defined by responsibility and trust.
                </p></div></div></div></div></section>{
    /* Choosing a Different Path & Responsibility */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4 max-w-4xl space-y-16">{
    /* Path */
  }<div className="space-y-6 text-lg text-text-mid leading-relaxed"><h2 className="text-3xl font-extrabold text-navy">Choosing a Different Path</h2><p>
              For Reshma, entering maritime was a deliberate choice. “I chose this because I wanted to do something different, something not many girls choose.”Her words reflect a quiet but powerful truth. Many women in maritime are not simply following a path, they are creating one.
            </p><p>
              While the work is demanding, she is clear about one thing. “It is not that this job belongs to men or women. It is not about gender.”
            </p></div>{
    /* Responsibility */
  }<div className="space-y-8"><div className="flex items-center gap-4"><ShieldCheck className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl font-extrabold text-navy">Responsibility and Reality</h2></div><img
    src={imgReality}
    alt="Cargo operations on deck"
    className="w-full h-auto rounded-2xl shadow-lg"
  /><div className="space-y-6 text-lg text-text-mid leading-relaxed pt-4"><p>As Chief Officer, her responsibilities are extensive.</p><p>
                She oversees cargo operations from start to finish, including planning, loading, monitoring, and discharge, ensuring everything aligns with strict operational and safety standards. “My role is to handle the cargo, how much to load, how much to discharge, and to take care of it throughout the voyage. It is a big responsibility.” With that responsibility comes pressure.
              </p><p>
                “Yes, sometimes it is difficult. There is pressure and a lot of work.”Her perspective, however, offers insight into what truly defines leadership at sea. “It depends on how you handle the situation, how you respond.”
              </p></div></div></div></section>{
    /* Strength & Connection */
  }<section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200"><div className="container-page mx-auto px-4 max-w-4xl space-y-16"><div className="space-y-6 text-lg text-text-mid leading-relaxed"><h2 className="text-3xl font-extrabold text-navy">Strength, Resilience, and Purpose</h2><p>
              What stands out most is not the challenge, but the mindset. Reshma’s journey reflects the resilience required not only to succeed in maritime, but to thrive. Despite the demands of the role, her conclusion is both simple and powerful. “I enjoy this work. I enjoy it very much.”
            </p><p>
              That sense of purpose continues to drive change across the industry.
            </p></div><div className="space-y-8"><div className="flex items-center gap-4"><HeartHandshake className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl font-extrabold text-navy">The Power of Connection</h2></div><img
    src={imgConnection}
    alt="Honouring Women in Maritime Poster"
    className="w-full h-auto rounded-2xl shadow-lg"
  /><div className="space-y-6 text-lg text-text-mid leading-relaxed pt-4"><p>
                During her time in port, Reshma also reflected on something equally important, connection.
              </p><p>
                Speaking about ship visits, she shared: “It is very thoughtful. It feel great getting a vistor.” In an environment where seafarers spend months away from home, these moments matter. They provide familiarity. They provide care. They provide a reminder that no one is alone at sea.
              </p></div></div></div></section>{
    /* Belonging, Role, and Looking Ahead */
  }<section className="py-16 md:py-24 bg-white"><div className="container-page mx-auto px-4 max-w-4xl space-y-20">{
    /* Presence to Belonging */
  }<div className="space-y-6 text-lg text-text-mid leading-relaxed"><h2 className="text-3xl font-extrabold text-navy">From Presence to Belonging</h2><p>
              Representation is often the first milestone. True progress, however, is measured by something deeper, belonging. Women in maritime are not asking simply to be present. They are calling for environments where they are respected, supported, and able to thrive. This is where the shift from policy to practice becomes real.Policies can open doors. Culture, leadership, and everyday actions determine whether those doors remain open.
            </p></div>{
    /* The Role We Play */
  }<div className="space-y-8"><h2 className="text-3xl font-extrabold text-navy">The Role We Play</h2><img
    src={imgRole}
    alt="Silhouette of a ship at sunset"
    className="w-full h-auto rounded-2xl shadow-lg"
  /><p className="text-lg text-text-mid leading-relaxed">
              At Mission to Seafarers Canada, our commitment to women in maritime is not symbolic. It is active. It is reflected in the support we provide through ship visits, the relationships we build with seafarers, the stories we elevate, and the spaces we create for connection and care.Real change does not happen in statements alone. It happens in real moments, with real people.
            </p></div>{
    /* Looking Ahead */
  }<div className="space-y-8 pt-8"><div className="flex items-center gap-4"><Ship className="text-coral w-8 h-8 flex-shrink-0" /><h2 className="text-3xl font-extrabold text-navy">Looking Ahead</h2></div><img
    src={imgLookingAhead}
    alt="Wake of a ship looking out to the horizon"
    className="w-full h-auto rounded-2xl shadow-lg"
  /><p className="text-lg text-text-mid leading-relaxed bg-blue-50 p-6 md:p-8 rounded-2xl border border-blue-100 mt-6">
              Honouring Women in Maritime is not only about recognizing how far we have come. It is about acknowledging how far we still have to go and committing to that journey together. The future of maritime depends on diversity. It depends on equity. It depends on creating a sector where women like Reshma are not the exception, but the norm. Most importantly, it depends on turning intention into action.
            </p></div></div></section></>;
};
export default WomenInMaritime;
