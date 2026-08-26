import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Tag, ChevronRight, ArrowRight, Newspaper, Plus } from "lucide-react";
import { storyService } from "@/cms/services/storyService";
import { Button } from "@/components/ui/button";

export const NewsStories = () => {
  const [selectedStation, setSelectedStation] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "all",
    "Ship Visits",
    "Events",
    "Station News",
    "Stories",
    "Community",
    "Announcements",
    "Volunteers",
  ];

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        const data = await storyService.getStories({
          station: selectedStation,
          category: selectedCategory,
          status: "published",
        });
        setStories(data);
      } catch (err) {
        console.error("Failed to load newsfeed", err);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [selectedStation, selectedCategory]);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* ─── HERO ─── */}
      <section className="bg-warm-gray py-16 md:py-20 border-b border-border">
        <div className="container-page max-w-4xl text-center mx-auto space-y-3">
          <span className="eyebrow mx-auto">Central Regional Newsroom</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            News & Stories from Southern Ontario Ports
          </h1>
          <p className="text-base md:text-lg text-text-mid leading-relaxed max-w-2xl mx-auto">
            Central content stream connecting dockside dispatches, community events, ship visiting reports, and seafarer stories across Toronto, Hamilton, Oshawa, and Port Colborne.
          </p>

          <div className="pt-2">
            <Link
              to="/admin/stories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-coral hover:underline"
            >
              <Newspaper className="w-3.5 h-3.5" /> Open CMS Story Admin Studio →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <section className="py-6 bg-white border-b border-border sticky top-20 z-30 shadow-xs">
        <div className="container-page flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Station Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-extrabold uppercase text-navy mr-2">Filter Port:</span>
            {[
              { id: "all", label: "All Ports" },
              { id: "toronto", label: "Toronto" },
              { id: "hamilton", label: "Hamilton" },
              { id: "oshawa", label: "Oshawa" },
              { id: "port-colborne", label: "Port Colborne" },
              { id: "mtsso", label: "MTSSO Regional" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStation(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  selectedStation === st.id
                    ? "bg-navy text-white shadow-sm"
                    : "bg-warm-gray text-navy hover:bg-gray-200"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-extrabold uppercase text-navy mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-coral text-white shadow-sm font-extrabold"
                    : "bg-warm-gray text-navy hover:bg-gray-200"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ─── STORIES FEED ─── */}
      <section className="py-14 md:py-20 bg-warm-gray">
        <div className="container-page">
          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-border p-8 space-y-3">
              <div className="w-8 h-8 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-extrabold uppercase text-navy">Loading Dispatches...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-border p-8 space-y-3 max-w-lg mx-auto">
              <p className="text-navy font-extrabold text-lg">No stories match your current filter.</p>
              <p className="text-text-mid text-xs">Try resetting the station or category selection.</p>
              <Button
                onClick={() => { setSelectedStation("all"); setSelectedCategory("all"); }}
                className="mt-4 bg-coral text-white font-bold text-xs"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story) => (
                <article
                  key={story.id || story.slug}
                  id={story.slug}
                  className="rounded-3xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                      <img
                        src={story.featuredImage || "/src/assets/event1.jpeg"}
                        alt={story.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-extrabold uppercase text-coral shadow-xs">
                        {story.category || "News"}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-text-mid mb-2.5">
                        <span className="font-extrabold text-navy bg-coral-pale px-2.5 py-0.5 rounded-md">
                          {story.stationName || "MTSSO"}
                        </span>
                        <span>{new Date(story.publishedAt || story.createdAt).toLocaleDateString()}</span>
                      </div>

                      <h2 className="text-xl font-extrabold text-navy leading-snug">
                        <Link to={`/news/${story.slug}`} className="hover:text-coral transition-colors">
                          {story.title}
                        </Link>
                      </h2>

                      <p className="mt-3 text-xs text-text-mid leading-relaxed line-clamp-3">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-border mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-text-dim flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-coral" /> {story.location || "Southern Ontario"}
                    </span>
                    <Link
                      to={`/news/${story.slug}`}
                      className="text-xs font-bold text-coral hover:underline inline-flex items-center gap-1"
                    >
                      Read Story <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsStories;
