import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus, Edit, Trash2, ExternalLink, Filter, Search,
  Anchor, Newspaper, RefreshCw, FileText, CheckCircle2, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { storyService } from "../services/storyService";
import logo from "@/assets/logo.jpeg";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStories = async () => {
    setLoading(true);
    try {
      const data = await storyService.getStories({
        station: selectedStation,
        search: searchQuery,
      });
      setStories(data);
    } catch (err) {
      console.error("Failed to load stories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [selectedStation, searchQuery]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await storyService.deleteStory(id);
      fetchStories();
    }
  };

  const stationBadges = {
    toronto: { name: "Toronto", bg: "bg-blue-50 text-blue-700 border-blue-200" },
    hamilton: { name: "Hamilton", bg: "bg-amber-50 text-amber-700 border-amber-200" },
    oshawa: { name: "Oshawa", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    "port-colborne": { name: "Port Colborne", bg: "bg-purple-50 text-purple-700 border-purple-200" },
    mtsso: { name: "MTSSO Regional", bg: "bg-coral-pale text-coral border-coral/20" },
    all: { name: "All Stations", bg: "bg-slate-100 text-slate-700 border-slate-200" },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* ─── TOP HEADER ─── */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MTSSO" className="h-10 w-auto rounded-md" />
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-white leading-none">
              MTSSO Story & News CMS Studio
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Visual Page Builder (GrapesJS) & Central Content Manager
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-xs font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            ← View Main Website
          </Link>
          <Button
            asChild
            className="bg-coral hover:bg-coral-light text-white font-extrabold text-xs px-4 shadow-warm"
          >
            <Link to="/admin/stories/new">
              <Plus className="w-4 h-4 mr-1.5" /> Create New Story
            </Link>
          </Button>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Banner Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-navy-dark p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-coral bg-coral-pale/10 px-3 py-1 rounded-full border border-coral/20">
              <Newspaper className="w-3.5 h-3.5" /> Central Content Distribution
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Station Story Management
            </h2>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Create and visually design blog posts, ship visiting dispatches, and event announcements. 
              Assign stories to specific port stations (<strong>Toronto</strong>, <strong>Hamilton</strong>, <strong>Oshawa</strong>, <strong>Port Colborne</strong>) or publish network-wide across the MTSSO umbrella.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-coral hover:bg-coral-light text-white font-extrabold text-sm px-6 shadow-warm shrink-0"
          >
            <Link to="/admin/stories/new">
              <Plus className="w-5 h-5 mr-2" /> Design New Story
            </Link>
          </Button>
        </div>

        {/* ─── FILTERS & SEARCH BAR ─── */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Station Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            <span className="text-xs font-extrabold uppercase text-slate-400 mr-2">Filter Station:</span>
            {[
              { id: "all", label: "All Stations" },
              { id: "toronto", label: "Toronto" },
              { id: "hamilton", label: "Hamilton" },
              { id: "oshawa", label: "Oshawa" },
              { id: "port-colborne", label: "Port Colborne" },
              { id: "mtsso", label: "MTSSO Regional" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStation(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedStation === st.id
                    ? "bg-coral text-white shadow-xs"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search story title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-coral"
            />
          </div>
        </div>

        {/* ─── STORIES TABLE ─── */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          {loading ? (
            <div className="text-center py-20 text-slate-400 space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-coral" />
              <p className="text-xs font-bold uppercase tracking-wider">Loading Stories...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20 text-slate-400 space-y-4">
              <FileText className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-base font-bold text-slate-300">No stories found matching your filter.</p>
              <Button asChild size="sm" className="bg-coral text-white font-bold text-xs">
                <Link to="/admin/stories/new">Create Your First Story</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-6">Story Title & Excerpt</th>
                    <th className="py-3.5 px-4">Station</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {stories.map((story) => {
                    const badge = stationBadges[story.station] || stationBadges.mtsso;
                    return (
                      <tr key={story.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-4 px-6 max-w-sm">
                          <div className="font-extrabold text-white text-sm line-clamp-1 mb-1">
                            {story.title}
                          </div>
                          <p className="text-slate-400 text-xs line-clamp-1">
                            {story.excerpt || "No excerpt provided."}
                          </p>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${badge.bg}`}
                          >
                            <Anchor className="w-3 h-3" />
                            {badge.name}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                            {story.category || "Station News"}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                              story.status === "published"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                                : "bg-amber-950 text-amber-400 border border-amber-800/40"
                            }`}
                          >
                            {story.status === "published" ? "🟢 Published" : "📝 Draft"}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                          {new Date(story.publishedAt || story.createdAt).toLocaleDateString()}
                        </td>

                        <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                          {/* Live view button */}
                          <Link
                            to={`/news/${story.slug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-colors"
                            title="View on Website"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          {/* Edit Visual Builder Button */}
                          <Button
                            asChild
                            size="sm"
                            className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-3 shadow-xs"
                          >
                            <Link to={`/admin/stories/edit/${story.id}`}>
                              <Edit className="w-3.5 h-3.5 mr-1" /> Edit Builder
                            </Link>
                          </Button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDelete(story.id, story.title)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                            title="Delete Story"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
