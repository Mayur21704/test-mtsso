import { useState } from "react";
import { Link } from "react-router-dom";
import { STORIES } from "@/data/newsData";
import { Calendar, MapPin, Tag, ChevronRight, ArrowRight } from "lucide-react";

export const NewsStories = () => {
  const [selectedStation, setSelectedStation] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Ship Visits", "Events", "Station News", "Stories", "Community"];

  const filteredStories = STORIES.filter((story) => {
    const matchesStation = selectedStation === "all" || story.station === selectedStation || story.station === "all";
    const matchesCategory = selectedCategory === "all" || story.category === selectedCategory;
    return matchesStation && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="bg-warm-gray py-16 md:py-20 border-b border-border">
        <div className="container-page max-w-4xl text-center mx-auto">
          <span className="eyebrow mx-auto">Regional Newsfeed</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            News & Stories from Southern Ontario Ports
          </h1>
          <p className="mt-4 text-base md:text-lg text-text-mid leading-relaxed">
            Central content stream connecting dockside dispatches, community events, ship visiting reports, and seafarer stories across Toronto, Hamilton, Oshawa, and Port Colborne.
          </p>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <section className="py-6 bg-white border-b border-border sticky top-20 z-30 shadow-xs">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Station Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-extrabold uppercase text-navy mr-2">Filter by Port:</span>
            {[
              { id: "all", label: "All Ports" },
              { id: "toronto", label: "Toronto" },
              { id: "hamilton", label: "Hamilton" },
              { id: "oshawa", label: "Oshawa" },
              { id: "port-colborne", label: "Port Colborne" },
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
          {filteredStories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-border p-8">
              <p className="text-navy font-extrabold text-lg">No stories match your current filter.</p>
              <p className="text-text-mid text-xs mt-1">Try resetting the station or category selection.</p>
              <button
                onClick={() => { setSelectedStation("all"); setSelectedCategory("all"); }}
                className="mt-4 bg-coral text-white font-bold px-4 py-2 rounded-lg text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <article
                  key={story.id}
                  id={story.slug}
                  className="rounded-3xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase text-coral">
                        {story.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-text-mid mb-2.5">
                        <span className="font-extrabold text-navy bg-coral-pale px-2.5 py-0.5 rounded-md">
                          {story.stationName}
                        </span>
                        <span>{story.date}</span>
                      </div>

                      <h2 className="text-xl font-extrabold text-navy leading-snug">
                        {story.title}
                      </h2>

                      <p className="mt-3 text-xs text-text-mid leading-relaxed">
                        {story.overview}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-border mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-text-dim flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-coral" /> {story.location}
                    </span>
                    <Link
                      to={story.station !== "all" && story.station !== "mtsso" ? `/stations/${story.station}` : "/"}
                      className="text-xs font-bold text-coral hover:underline inline-flex items-center gap-1"
                    >
                      Station Info <ChevronRight className="w-3.5 h-3.5" />
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
