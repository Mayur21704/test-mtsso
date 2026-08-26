import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import {
  Ship, Anchor, Users, Heart, CheckCircle2, Navigation,
  Calendar, ArrowRight, BookOpen, Clock, RefreshCw
} from "lucide-react";
import { storyService } from "@/cms/services/storyService";
import { getStoryThumbnail, formatStoryDate } from "@/cms/utils/storyHelpers";
import imgM1 from "@/assets/M/M1A Mission Rooted in the Port.png";
import imgM2 from "@/assets/M/M2Leadership That Reflects the Future.png";
import imgM3 from "@/assets/M/M3The Return of a Harbour Home.jpg";
import imgM4 from "@/assets/M/M4.png";
import imgV1 from "@/assets/M/V1.png";
import imgV2 from "@/assets/M/V2A Life of Service in Thunder Bay.jpg";

const Newsletter = () => {
  const [publishedStories, setPublishedStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(true);

  useEffect(() => {
    const fetchTorontoStories = async () => {
      try {
        const stories = await storyService.getStories({
          station: "toronto",
          status: "published",
        });
        setPublishedStories(stories || []);
      } catch (err) {
        console.error("Failed to load Toronto stories", err);
      } finally {
        setLoadingStories(false);
      }
    };

    fetchTorontoStories();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* ─── HERO SECTION ─── */}
      <PageHero
        eyebrow="Port of Toronto Dispatches"
        title="Station Newsletters & Stories"
        description="Discover the latest news from the Port of Toronto, updates on our returning Harbour Home, and inspiring stories from visiting crews and volunteers."
      />

      {/* ─── DYNAMIC PUBLISHED STORIES & NEWSLETTERS ─── */}
      {publishedStories.length > 0 && (
        <section className="py-16 bg-warm-gray border-b border-border">
          <div className="container-page">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-coral bg-coral-pale px-3 py-1 rounded-full border border-coral/20 mb-2">
                  <Anchor className="w-3.5 h-3.5" /> Latest Toronto Dispatches
                </span>
                <h2 className="text-3xl font-extrabold text-navy">
                  Published Station Stories
                </h2>
              </div>
              <p className="text-xs text-text-mid max-w-md">
                Articles, newsletters, and announcements published directly by the Toronto Station team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedStories.map((story) => {
                const thumbnail = getStoryThumbnail(story);
                return (
                  <article
                    key={story.id || story.slug}
                    className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-coral/40 transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    {thumbnail ? (
                      <div className="relative aspect-video overflow-hidden bg-slate-100">
                        <img
                          src={thumbnail}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <span className="absolute top-3 left-3 bg-navy text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                          {story.category || "Station News"}
                        </span>
                      </div>
                    ) : (
                      <div className="h-28 bg-gradient-to-br from-navy to-navy-dark p-4 flex flex-col justify-between text-white relative">
                        <span className="bg-coral text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full w-fit">
                          {story.category || "Station News"}
                        </span>
                        <Anchor className="w-8 h-8 text-white/20 absolute right-4 bottom-4" />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-[11px] text-text-mid font-semibold">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-coral" />
                            {formatStoryDate(story.publishedAt || story.createdAt)}
                          </span>
                          {story.author && <span>· {story.author}</span>}
                        </div>

                        <h3 className="text-lg font-extrabold text-navy leading-snug group-hover:text-coral transition-colors">
                          {story.title}
                        </h3>

                        {story.excerpt && (
                          <p className="text-xs text-text-mid line-clamp-3 leading-relaxed">
                            {story.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          to={`/news/${story.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-coral hover:text-coral-dark transition-colors"
                        >
                          Read Full Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── MARITIME NEWS INTRO & MISSION ─── */}
      <section className="py-24 bg-white relative">
        <div className="container-page">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-navy/5 text-navy font-semibold tracking-wide text-sm uppercase">
              <Ship className="w-4 h-4 text-coral" /> Maritime News
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-8 tracking-tight text-balance">
              Port of Toronto: A Harbour of Trade, A Place of Care, A New Chapter Begins
            </h2>
            <div className="space-y-6 text-lg text-text-mid leading-relaxed text-justify md:text-center">
              <p>
                Most people never think about the Port of Toronto. Yet every day, it quietly keeps Canada moving. 
                Ships arrive carrying the goods that shape daily life, materials for our cities, food for our tables, 
                and supplies that fuel entire industries. Like ports around the world, it is part of a global system 
                where around 80 to 90 percent of global trade by volume is transported by sea.
              </p>
              <p>
                But beyond cargo and commerce, the Port of Toronto is also a place of people. Every vessel carries 
                seafarers, individuals who spend months at sea, far from home, working long hours in often isolating 
                conditions. For many, arriving in port is one of the few opportunities to rest, reconnect with loved 
                ones, and access support on land.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center justify-center p-3 bg-coral/10 rounded-2xl mb-4">
                <Anchor className="text-coral h-8 w-8" />
              </div>
              <h3 className="text-3xl font-extrabold text-navy tracking-tight">A Mission Rooted in the Port</h3>
              <p className="text-lg text-text-mid leading-relaxed">
                For over six decades, Mission to Seafarers Canada has been part of that story in Toronto. Through 
                the Mission to Seafarers Southern Ontario, the organization has supported seafarers since the early 
                1960s, offering something simple, yet powerful: a place of welcome.
              </p>
              <p className="text-lg text-text-mid leading-relaxed">
                Guided by a dedicated Board of Directors and regional leadership, the Mission to Seafarers Southern 
                Ontario continues to strengthen its impact across ports in the region, ensuring that care for 
                seafarers remains consistent, coordinated, and deeply human.
              </p>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl bg-white">
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={imgM1}
                  alt="A Mission Rooted in the Port"
                  className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP & HARBOUR HOME ─── */}
      <section className="py-24 bg-warm-gray relative border-y border-border/50">
        <div className="container-page space-y-24">
          {/* Leadership Section */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative group overflow-hidden rounded-3xl shadow-xl bg-white flex items-center justify-center">
                <img
                  src={imgM2}
                  alt="Leadership That Reflects the Future"
                  className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-extrabold text-navy tracking-tight">Leadership That Reflects the Future</h3>
              <p className="text-lg text-text-mid leading-relaxed">
                At the heart of this work is Judith Alltree, a leader whose impact has shaped seafarer welfare 
                across Canada. From expanding services across Southern Ontario to supporting national coordination 
                during the COVID-19 pandemic, her leadership reflects decades of commitment to those who are often 
                unseen. And it carries deeper meaning.
              </p>
              <p className="text-lg text-text-mid leading-relaxed">
                In a sector historically led by men, seafarer welfare at the Port of Toronto has long been guided 
                by a woman. As the maritime industry continues to evolve, this leadership stands not just as 
                progress, but as proof of what is possible.
              </p>
            </div>
          </div>

          {/* Harbour Home Section */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-3xl font-extrabold text-navy tracking-tight">The Return of a Harbour Home</h3>
              <p className="text-lg text-text-mid leading-relaxed">
                In 2019, the Mission’s physical presence in the port was lost following a devastating flood. 
                For seven years, the work continued, but without a place to gather, something was missing. 
                Because for seafarers, space matters. A place to sit. A place to call home. A place to simply be.
              </p>
              <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm">
                <p className="text-lg text-navy font-semibold leading-relaxed">
                  Now, with the support of the Port of Toronto, that space is returning. A new station is reopening 
                  within the port, restoring a place where seafarers can connect with loved ones, receive practical 
                  support, and experience the care that has defined this Mission for generations.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative group overflow-hidden rounded-3xl shadow-xl bg-white">
                <img
                  src={imgM3}
                  alt="The Return of a Harbour Home"
                  className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WOMEN IN MARITIME 2026 ─── */}
      <section className="py-24 bg-white relative">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <h3 className="text-3xl font-extrabold text-navy tracking-tight">Marking the Moment: Women in Maritime 2026</h3>
                <p className="text-lg text-text-mid leading-relaxed">
                  This reopening will be marked by Women in Maritime 2026, hosted in partnership with SeaLight 
                  Sisters Society and Georgian College, and aligned with the International Day for Women in 
                  Maritime led by the International Maritime Organization. 
                </p>
                <p className="text-lg text-text-mid leading-relaxed">
                  Guided by the theme <em className="text-navy font-semibold">From Policy to Practice: Advancing Gender Equality for Maritime Excellence</em>, 
                  the event brings together industry leaders, educators, and emerging voices to move beyond 
                  conversation and into action. The choice to mark this reopening in this way is intentional. It 
                  reflects the leadership already shaping this work. The voices that must continue to be elevated. 
                  And the future the maritime industry is building toward.
                </p>
              </div>

              {/* Elevated Card */}
              <div className="relative bg-gradient-to-br from-warm-gray to-white rounded-3xl p-8 md:p-10 border border-border shadow-lg">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                  <Navigation className="w-32 h-32" />
                </div>
                <h3 className="text-2xl font-extrabold text-navy mb-4 flex items-center gap-3">
                  <span className="p-2 bg-coral/10 rounded-lg">
                    <Navigation className="text-coral w-6 h-6" />
                  </span>
                  More Than a Port
                </h3>
                <p className="text-lg text-text-mid mb-8 relative z-10">
                  The Port of Toronto will always be a place of trade. But through the work of the Mission to 
                  Seafarers, it is also a place of care. A place where a seafarer can step off a ship and find:
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 mb-8 relative z-10">
                  <li className="flex gap-3 items-center bg-white p-3 rounded-xl border border-border/50 shadow-sm">
                    <CheckCircle2 className="text-coral w-6 h-6 shrink-0" />
                    <span className="font-semibold text-navy">A warm drink</span>
                  </li>
                  <li className="flex gap-3 items-center bg-white p-3 rounded-xl border border-border/50 shadow-sm">
                    <CheckCircle2 className="text-coral w-6 h-6 shrink-0" />
                    <span className="font-semibold text-navy">A connection home</span>
                  </li>
                  <li className="flex gap-3 items-center bg-white p-3 rounded-xl border border-border/50 shadow-sm">
                    <CheckCircle2 className="text-coral w-6 h-6 shrink-0" />
                    <span className="font-semibold text-navy">A moment of rest</span>
                  </li>
                  <li className="flex gap-3 items-center bg-white p-3 rounded-xl border border-border/50 shadow-sm">
                    <CheckCircle2 className="text-coral w-6 h-6 shrink-0" />
                    <span className="font-semibold text-navy">A reminder that they are not invisible</span>
                  </li>
                </ul>
                <div className="inline-block bg-navy text-white px-6 py-3 rounded-full font-bold italic relative z-10 shadow-md">
                  Because behind every shipment is a person.
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="sticky top-32 group overflow-hidden rounded-3xl shadow-2xl bg-white">
                <img
                  src={imgM4}
                  alt="Women in Maritime 2026"
                  className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VOLUNTEER SPOTLIGHT ─── */}
      <section className="py-24 md:py-32 bg-navy text-white overflow-hidden relative">
        <div className="container-page relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-coral/20 text-coral font-semibold tracking-wide text-sm uppercase border border-coral/30">
              <Heart className="w-4 h-4" /> Volunteer Spotlight
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance">
              Celebrating Those Who Serve Behind the Scenes
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div className="space-y-6 order-2 lg:order-1">
              <p className="text-xl text-white/90 leading-relaxed text-balance">
                At the Mission to Seafarers Canada, our work does not begin with programs, buildings, or events. 
                It begins with people. Volunteers are the quiet force behind everything we do. They are the ones 
                who show up, who listen, who care, and who make it possible for seafarers to feel seen in moments 
                when they are far from home.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="group overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl relative bg-white/5 flex items-center justify-center">
                <img
                  src={imgV1}
                  alt="Volunteers in action"
                  className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <div className="order-2 lg:order-1">
              <div className="group overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl relative bg-white/5 flex items-center justify-center">
                <img
                  src={imgV2}
                  alt="Ed Swayze in Thunder Bay"
                  className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">A Life of Service in Thunder Bay</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                At our Thunder Bay station, Ed Swayze, Senior Chaplain, understands this deeply. His work is not 
                done alone. It is shared. Day by day and visit by visit, Ed divides his time between seafarers 
                and the dedicated volunteers who stand beside him.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CALL TO ACTION ─── */}
      <section className="py-24 bg-coral text-white text-center relative overflow-hidden">
        <div className="container-page max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight text-balance">
            Every Act of Kindness Makes a Difference
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            From reading our latest news to lending a hand, your involvement helps remind seafarers that they 
            are not alone. Join us in making a difference today.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 px-4 sm:px-0">
            <Button size="lg" asChild className="w-full sm:w-auto bg-white hover:bg-gray-100 text-coral font-bold h-14 px-10 rounded-xl shadow-lg">
              <Link to="/get-involved#donate">Donate Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-2 border-white/80 text-white hover:bg-white hover:text-coral font-bold h-14 px-8 rounded-xl backdrop-blur-sm shadow-lg">
              <Link to="/get-involved#ways-to-help">Become a Volunteer</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-2 border-white/80 text-white hover:bg-white hover:text-coral font-bold h-14 px-8 rounded-xl backdrop-blur-sm shadow-lg">
              <Link to="/contact">Contact the Station</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
