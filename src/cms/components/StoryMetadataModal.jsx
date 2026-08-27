import { useState, useEffect } from "react";
import { X, Anchor, Tag, Image as ImageIcon, User, CheckCircle2, ChevronDown, FolderOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaLibraryModal } from "./MediaLibraryModal";

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

  const [mediaModalOpen, setMediaModalOpen] = useState(false);

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
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
        {/* ─── SEAMLESS 100% PURE WHITE MODAL ─── */}
        <div className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
          
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-coral/10 flex items-center justify-center text-coral">
                <Anchor className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-navy uppercase tracking-wider">
                  Story Station & Settings
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Assign target port stations, news categories, and author metadata.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body / Form */}
          <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
            
            {/* Row 1: Target Port Station & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-navy uppercase tracking-wider flex items-center gap-1.5">
                  <Anchor className="w-3.5 h-3.5 text-coral" /> Target Port Station
                </label>
                <div className="relative">
                  <select
                    value={formData.station}
                    onChange={(e) => handleStationChange(e.target.value)}
                    className="w-full h-11 bg-slate-50/70 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm font-bold text-navy focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all appearance-none cursor-pointer shadow-xs"
                  >
                    {stations.map((st) => (
                      <option key={st.id} value={st.id} className="text-navy font-medium bg-white">
                        {st.name} {st.id === "mtsso" || st.id === "all" ? "(Regional)" : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-navy uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-coral" /> Category
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-11 bg-slate-50/70 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm font-bold text-navy focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all appearance-none cursor-pointer shadow-xs"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="text-navy font-medium bg-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 2: Headline Title */}
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

            {/* Row 3: News Card Excerpt / Summary */}
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

            {/* Row 4: Dedicated Full-Width Featured Thumbnail Section */}
            <div className="space-y-2 p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black text-navy uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-coral" /> Featured Thumbnail Image
                </label>
                {formData.featuredImage && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, featuredImage: "" })}
                    className="text-[11px] font-bold text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Clear Image
                  </button>
                )}
              </div>

              {/* Input with Integrated Browse Button */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="flex-1 h-10 bg-white border border-slate-200 rounded-xl px-3.5 text-xs sm:text-sm font-medium text-navy focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all shadow-2xs"
                  placeholder="Paste external image URL or select from library..."
                />
                <button
                  type="button"
                  onClick={() => setMediaModalOpen(true)}
                  className="h-10 px-4 bg-coral hover:bg-coral-light text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Browse Media</span>
                </button>
              </div>

              {/* Live Image Preview Card if URL attached */}
              {formData.featuredImage && (
                <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200 shadow-2xs animate-in fade-in duration-150">
                  <img
                    src={formData.featuredImage}
                    alt="Thumbnail preview"
                    className="w-12 h-12 object-cover rounded-lg border border-slate-100 bg-slate-50 shrink-0"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-navy truncate">{formData.featuredImage}</p>
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Active thumbnail for news cards
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Row 5: Author / Reporter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-navy uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-600" /> Author / Reporter Name
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full h-11 bg-slate-50/70 border border-slate-200 rounded-xl px-4 text-xs sm:text-sm font-bold text-navy focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all shadow-xs"
                placeholder="e.g. Chaplain Dan Phannenhour"
              />
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

      {/* ─── MEDIA LIBRARY MODAL FOR THUMBNAIL ─── */}
      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        selectMode={true}
        onSelect={(src) => {
          setFormData((prev) => ({ ...prev, featuredImage: src }));
          setMediaModalOpen(false);
        }}
      />
    </>
  );
};

export default StoryMetadataModal;
