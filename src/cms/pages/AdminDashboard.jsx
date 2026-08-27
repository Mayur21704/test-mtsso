import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus, Edit, Trash2, Search, Anchor, Newspaper,
  RefreshCw, FileText, CheckCircle2, Eye, Calendar, ArrowLeft, LogOut, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { storyService } from "../services/storyService";
import { formatStoryDate } from "../utils/storyHelpers";
import { CmsNotification } from "../components/CmsNotification";
import { CmsConfirmModal } from "../components/CmsConfirmModal";
import { useAuth } from "../context/AuthContext";
import logo from "@/assets/logo.jpeg";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Confirmation modal & toast state
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, title }
  const [toast, setToast] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const showToast = (type, title, message) => {
    setToast({ isOpen: true, type, title, message });
  };

  const fetchStories = async () => {
    setLoading(true);
    try {
      const data = await storyService.getStories({
        station: selectedStation,
        search: searchQuery,
      });
      setStories(data || []);
    } catch (err) {
      console.error("Failed to load stories", err);
      showToast("error", "Error Loading", "Failed to retrieve stories from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [selectedStation, searchQuery]);

  const confirmDeleteStory = async () => {
    if (!deleteTarget) return;
    try {
      await storyService.deleteStory(deleteTarget.id);
      showToast("info", "Story Deleted", `"${deleteTarget.title}" has been deleted.`);
      fetchStories();
    } catch (err) {
      showToast("error", "Delete Failed", err.message || "Could not delete story.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleToggleStatus = async (story) => {
    const nextStatus = story.status === "published" ? "draft" : "published";
    try {
      await storyService.updateStory(story.id, {
        status: nextStatus,
        hasDraftChanges: false,
      });
      showToast(
        "success",
        nextStatus === "published" ? "Story Published" : "Moved to Draft",
        `"${story.title}" is now ${nextStatus}.`
      );
      setStories((prev) =>
        prev.map((s) => (s.id === story.id ? { ...s, status: nextStatus } : s))
      );
    } catch (err) {
      showToast("error", "Status Update Failed", err.message || "Could not update status.");
    }
  };

  const stationBadges = {
    toronto: { name: "Toronto", bg: "bg-blue-50 text-blue-800 border-blue-200" },
    hamilton: { name: "Hamilton", bg: "bg-amber-50 text-amber-800 border-amber-200" },
    oshawa: { name: "Oshawa", bg: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    "port-colborne": { name: "Port Colborne", bg: "bg-purple-50 text-purple-800 border-purple-200" },
    mtsso: { name: "MTSSO Regional", bg: "bg-coral-pale text-coral border-coral/20" },
    all: { name: "All Stations", bg: "bg-slate-100 text-slate-800 border-slate-200" },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* ─── TOP HEADER ─── */}
      <header className="bg-navy text-white px-4 sm:px-6 py-3.5 sm:py-4 sticky top-0 z-30 shadow-md border-b border-navy-dark">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img src={logo} alt="MTSSO" className="h-9 sm:h-10 w-auto rounded-md bg-white p-0.5 shrink-0" />
            <div>
              <h1 className="text-sm sm:text-base md:text-lg font-extrabold text-white leading-tight">
                MTSSO Story Studio
              </h1>
              <p className="text-[10px] sm:text-xs text-white/70 hidden xs:block">
                Visual GrapesJS Builder & Station Content Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/"
              className="text-xs font-bold text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Website
            </Link>
            <Button
              asChild
              className="bg-coral hover:bg-coral-light text-white font-extrabold text-xs px-3 sm:px-4 h-9 sm:h-10 shadow-warm"
            >
              <Link to="/admin/stories/new">
                <Plus className="w-4 h-4 mr-1" /> New Story
              </Link>
            </Button>

            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
              className="text-xs font-bold text-slate-300 hover:text-rose-400 px-2.5 py-1.5 rounded-lg hover:bg-rose-950/40 border border-slate-700/60 transition-colors inline-flex items-center gap-1 cursor-pointer"
              title={`Signed in as ${admin?.email || "Admin"} • Click to Sign Out`}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        
        {/* Banner Card */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-coral bg-coral-pale px-3 py-0.5 rounded-full border border-coral/20">
              <Newspaper className="w-3 h-3" /> Station Dispatches & Articles
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-navy">
              Published Stories & Newsletters
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Design pages with drag-and-drop maritime components. Stories publish live to Toronto, Hamilton, Oshawa, and Port Colborne stations.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-coral hover:bg-coral-light text-white font-extrabold text-xs sm:text-sm px-5 h-11 shadow-warm shrink-0 w-full sm:w-auto cursor-pointer"
          >
            <Link to="/admin/stories/new">
              <Plus className="w-4 h-4 mr-1.5" /> Design New Story
            </Link>
          </Button>
        </div>

        {/* ─── FILTERS & SEARCH BAR ─── */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Station Filter Tabs (Smooth horizontal touch scroll on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <span className="text-[11px] font-extrabold uppercase text-slate-400 mr-1 shrink-0">Filter:</span>
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
                type="button"
                onClick={() => setSelectedStation(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedStation === st.id
                    ? "bg-navy text-white shadow-xs font-extrabold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-navy placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-coral transition-colors"
            />
          </div>
        </div>

        {/* ─── STORIES LIST (DUAL VIEW: CARDS ON MOBILE, TABLE ON DESKTOP) ─── */}
        {loading ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6 space-y-2.5 shadow-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-coral" />
            <p className="text-xs font-extrabold uppercase tracking-wider text-navy">Loading Stories...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <FileText className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-extrabold text-navy">No stories found matching your filter.</p>
            <Button asChild size="sm" className="bg-coral text-white font-extrabold text-xs">
              <Link to="/admin/stories/new">Create Your First Story</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="bg-slate-50 text-navy uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-6">Story Title & Excerpt</th>
                      <th className="py-3.5 px-4">Station</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {stories.map((story) => {
                      const badge = stationBadges[story.station] || stationBadges.mtsso;
                      return (
                        <tr key={story.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 max-w-sm">
                            <div className="font-extrabold text-navy text-sm line-clamp-1 mb-1">
                              {story.title}
                            </div>
                            <p className="text-slate-500 text-xs line-clamp-1">
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
                            <span className="text-navy bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                              {story.category || "Station News"}
                            </span>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(story)}
                              title="Click to toggle between Published and Draft"
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all hover:scale-105 cursor-pointer shadow-2xs ${
                                story.status === "published"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 ring-1 ring-emerald-400/20"
                                  : "bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 ring-1 ring-amber-400/20"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  story.status === "published" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                                }`}
                              />
                              {story.status === "published" ? "Published" : "Draft"}
                            </button>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                            {formatStoryDate(story.publishedAt || story.createdAt)}
                          </td>

                          <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                            <Link
                              to={`/news/${story.slug}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-navy rounded-lg text-xs font-bold transition-colors"
                              title="View on Website"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>

                            <Button
                              asChild
                              size="sm"
                              className="bg-navy hover:bg-navy-light text-white text-xs font-bold px-3 shadow-xs"
                            >
                              <Link to={`/admin/stories/edit/${story.id}`}>
                                <Edit className="w-3.5 h-3.5 mr-1" /> Edit Builder
                              </Link>
                            </Button>

                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ id: story.id, title: story.title })}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
            </div>
        )}
      </main>

      {/* ─── CONFIRM DELETE MODAL ─── */}
      <CmsConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteStory}
        title="Delete Story?"
        message={deleteTarget ? `Are you sure you want to permanently delete "${deleteTarget.title}"?` : ""}
        confirmLabel="Delete Story"
        isDestructive={true}
      />

      {/* ─── SMALL BRAND TOAST NOTIFICATION ─── */}
      <CmsNotification
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        type={toast.type}
        title={toast.title}
        message={toast.message}
      />
    </div>
  );
};

export default AdminDashboard;
