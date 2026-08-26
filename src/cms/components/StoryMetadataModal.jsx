import { useState, useEffect } from "react";
import { X, Anchor, Tag, Image as ImageIcon, User, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StoryMetadataModal = ({ isOpen, onClose, metadata, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    station: "toronto",
    stationName: "Toronto Station",
    category: "Station News",
    excerpt: "",
    featuredImage: "",
    location: "Port of Toronto",
    author: "MTSSO Editorial Team",
    status: "published",
  });

  const stations = [
    { id: "toronto", name: "Toronto Station" },
    { id: "hamilton", name: "Hamilton Station" },
    { id: "oshawa", name: "Oshawa Station" },
    { id: "port-colborne", name: "Port Colborne Station" },
    { id: "mtsso", name: "MTSSO Regional" },
    { id: "all", name: "All Stations" },
  ];

  const categories = [
    "Ship Visits",
    "Events",
    "Station News",
    "Stories",
    "Volunteers",
    "Community",
    "Announcements",
    "Maritime News",
  ];

  useEffect(() => {
    if (metadata) {
      setFormData({
        title: metadata.title || "",
        slug: metadata.slug || "",
        station: metadata.station || "toronto",
        stationName: metadata.stationName || "Toronto Station",
        category: metadata.category || "Station News",
        excerpt: metadata.excerpt || "",
        featuredImage: metadata.featuredImage || "",
        location: metadata.location || "Port of Toronto",
        author: metadata.author || "MTSSO Editorial Team",
        status: metadata.status || "published",
      });
    }
  }, [metadata]);

  if (!isOpen) return null;

  const stationLocations = {
    toronto: "Port of Toronto",
    hamilton: "Port of Hamilton",
    oshawa: "Port of Oshawa",
    "port-colborne": "Port Colborne",
    mtsso: "Southern Ontario",
    all: "All Regional Ports",
  };

  const handleStationChange = (stId) => {
    const found = stations.find((s) => s.id === stId);
    setFormData((prev) => ({
      ...prev,
      station: stId,
      stationName: found ? found.name : "MTSSO Regional",
      location: stationLocations[stId] || "Southern Ontario",
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      {/* ─── SEAMLESS 100% PURE WHITE MODAL ─── */}
      <div className="bg-white border border-slate-200/90 rounded-[28px] w-full max-w-xl shadow-2xl text-slate-900 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-4 flex items-start justify-between gap-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-coral-pale flex items-center justify-center text-coral shadow-xs shrink-0">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-navy leading-tight">
                Story Settings & Tagging
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Assign this story to stations and configure metadata
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-4.5 overflow-y-auto custom-scrollbar">
          
          {/* Target Station Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-navy uppercase tracking-wider flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5 text-coral" /> Target Station
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {stations.map((st) => (
                <button
                  type="button"
                  key={st.id}
                  onClick={() => handleStationChange(st.id)}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                    formData.station === st.id
                      ? "bg-coral text-white border-coral shadow-xs font-black"
                      : "bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <span className="truncate">{st.name}</span>
                  {formData.station === st.id && (
                    <CheckCircle2 className="w-4 h-4 shrink-0 ml-1 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Category Dropdown (Consistent h-11 Height & Custom Arrow) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-navy uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-coral" /> Category
            </label>
            <div className="relative">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-11 bg-slate-50/70 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm font-bold text-navy focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all appearance-none cursor-pointer pr-10 shadow-xs"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="text-navy bg-white py-1 font-bold">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Story Title */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-navy uppercase tracking-wider">
              Headline Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-11 bg-slate-50/70 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm font-bold text-navy focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all shadow-xs"
              placeholder="e.g. Seafarers Celebrate Port Reopening in Toronto"
            />
          </div>

          {/* Excerpt / Summary */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-navy uppercase tracking-wider">
              News Card Excerpt / Summary
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-navy placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all resize-none leading-relaxed shadow-xs"
              placeholder="A brief 1-2 sentence preview for the central newsroom card..."
            />
          </div>

          {/* Featured Image & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-navy uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-coral" /> Featured Thumbnail URL
              </label>
              <input
                type="text"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="w-full h-11 bg-slate-50/70 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm font-medium text-navy focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all shadow-xs"
                placeholder="https://... or /uploads/image.jpg"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-navy uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-600" /> Author / Reporter
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full h-11 bg-slate-50/70 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm font-bold text-navy focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all shadow-xs"
                placeholder="e.g. Chaplain Dan Phannenhour"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold px-4 h-10 rounded-xl cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-coral hover:bg-coral-light text-white text-xs font-black px-6 h-10 rounded-xl shadow-warm cursor-pointer"
            >
              Save Story Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryMetadataModal;
