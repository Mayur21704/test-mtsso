import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar, MapPin, ChevronRight, Newspaper, Anchor,
  Search, X, RotateCcw, ChevronDown
} from "lucide-react";
import { storyService } from "@/cms/services/storyService";
import { getStoryThumbnail, formatStoryDate } from "@/cms/utils/storyHelpers";
import { Button } from "@/components/ui/button";

export const NewsStories = () => {
  const [selectedStation, setSelectedStation] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const stations = [
    { id: "all", label: "All Ports" },
    { id: "toronto", label: "Toronto Station" },
    { id: "hamilton", label: "Hamilton Station" },
    { id: "oshawa", label: "Oshawa Station" },
    { id: "port-colborne", label: "Port Colborne" },
    { id: "mtsso", label: "MTSSO Regional" },
  ];

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "Ship Visits", label: "Ship Visits" },
    { id: "Events", label: "Events" },
    { id: "Station News", label: "Station News" },
    { id: "Stories", label: "Stories" },
    { id: "Community", label: "Community" },
    { id: "Announcements", label: "Announcements" },
    { id: "Volunteers", label: "Volunteers" },
  ];

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        const data = await storyService.getStories({
          station: selectedStation,
          category: selectedCategory,
          search: searchQuery,
          status: "published",
        });
        setStories(data || []);
      } catch (err) {
        console.error("Failed to load newsfeed", err);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [selectedStation, selectedCategory, searchQuery]);

  const hasActiveFilters = selectedStation !== "all" || selectedCategory !== "all" || searchQuery.trim() !== "";

  const resetFilters = () => {
    setSelectedStation("all");
    setSelectedCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* ─── HERO SECTION ─── */}
      <section className="bg-navy text-white py-14 md:py-20 border-b border-navy-dark relative overflow-hidden">
        <div className="container-page max-w-4xl text-center mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-coral-light border border-white/15 text-xs font-extrabold uppercase tracking-wider">
            <Anchor className="w-3.5 h-3.5 text-coral" /> Central Regional Newsroom
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight text-balance">
            News & Stories from Southern Ontario Ports
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
            Dockside dispatches, community updates, ship visiting reports, and seafarer stories across Toronto, Hamilton, Oshawa, and Port Colborne.
          </p>
        </div>
      </section>

      {/* ─── SPACIOUS, BULLETPROOF FILTER SECTION ─── */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="container-page py-4 space-y-3.5">
          
          {/* Row 1: Search + Port Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search Input Box */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 h-11 flex-1 min-w-[240px] focus-within:bg-white focus-within:border-coral focus-within:ring-2 focus-within:ring-coral/20 transition-all shadow-xs">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Search stories, vessels, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-navy placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-navy p-1 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Port Station Selector Box */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 h-11 sm:w-60 shrink-0 focus-within:bg-white focus-within:border-coral focus-within:ring-2 focus-within:ring-coral/20 transition-all shadow-xs">
              <Anchor className="w-4 h-4 text-coral shrink-0 mr-2.5" />
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-navy focus:outline-none cursor-pointer pr-1"
              >
                {stations.map((st) => (
                  <option key={st.id} value={st.id} className="text-navy bg-white py-1 font-bold">
                    {st.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Row 2: Category Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-coral text-white shadow-xs font-black"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy border border-slate-200/60"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Row 3: Active Results Counter & Reset */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-1 border-t border-slate-100">
            <span>
              Showing <strong className="text-navy">{stories.length}</strong> {stories.length === 1 ? "story" : "stories"}
              {selectedStation !== "all" && (
                <> in <span className="text-navy font-bold">{stations.find((s) => s.id === selectedStation)?.label}</span></>
              )}
              {selectedCategory !== "all" && (
                <> under <span className="text-coral font-bold">"{selectedCategory}"</span></>
              )}
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-extrabold text-coral hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset all filters
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ─── STORIES GRID FEED ─── */}
      <section className="py-10 md:py-16">
        <div className="container-page">
          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3 max-w-md mx-auto shadow-xs">
              <div className="w-8 h-8 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-extrabold uppercase text-navy">Loading Dispatches...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3 max-w-md mx-auto shadow-xs">
              <Anchor className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-navy font-extrabold text-lg">No stories match your filter</h3>
              <p className="text-slate-500 text-xs">Try selecting another station or category.</p>
              <Button
                type="button"
                onClick={resetFilters}
                className="mt-3 bg-coral hover:bg-coral-light text-white font-extrabold text-xs px-4 shadow-warm cursor-pointer"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {stories.map((story) => {
                const thumbnail = getStoryThumbnail(story);
                return (
                  <article
                    key={story.id || story.slug}
                    id={story.slug}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:border-coral/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {thumbnail ? (
                        <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                          <img
                            src={thumbnail}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <span className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase text-coral shadow-xs border border-coral/20">
                            {story.category || "News"}
                          </span>
                        </div>
                      ) : (
                        <div className="h-32 bg-gradient-to-br from-navy to-navy-dark p-5 flex flex-col justify-between text-white relative">
                          <span className="bg-coral text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full w-fit">
                            {story.category || "News"}
                          </span>
                          <Anchor className="w-10 h-10 text-white/10 absolute right-4 bottom-4" />
                        </div>
                      )}

                      <div className="p-5 sm:p-6">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2.5 font-semibold">
                          <span className="font-extrabold text-navy bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                            {story.stationName || "MTSSO"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-coral" />
                            {formatStoryDate(story.publishedAt || story.createdAt)}
                          </span>
                        </div>

                        <h2 className="text-lg font-extrabold text-navy leading-snug group-hover:text-coral transition-colors">
                          <Link to={`/news/${story.slug}`}>
                            {story.title}
                          </Link>
                        </h2>

                        {story.excerpt && (
                          <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {story.excerpt}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {story.author ? `By ${story.author}` : "MTSSO Dispatch"}
                      </span>
                      <Link
                        to={`/news/${story.slug}`}
                        className="text-xs font-extrabold text-coral hover:text-coral-dark inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Read Story <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsStories;
