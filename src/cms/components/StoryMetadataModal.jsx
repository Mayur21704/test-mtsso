import { useState, useEffect } from "react";
import { X, Anchor, Tag, Image as ImageIcon, MapPin, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StoryMetadataModal = ({ isOpen, onClose, metadata, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    station: "toronto",
    category: "Station News",
    excerpt: "",
    featuredImage: "",
    location: "Port of Toronto",
    author: "MTSSO Editorial Team",
    status: "published",
  });

  useEffect(() => {
    if (metadata) {
      setFormData({
        title: metadata.title || "",
        slug: metadata.slug || "",
        station: metadata.station || "toronto",
        category: metadata.category || "Station News",
        excerpt: metadata.excerpt || "",
        featuredImage: metadata.featuredImage || "",
        location: metadata.location || "Port of Toronto",
        author: metadata.author || "MTSSO Editorial Team",
        status: metadata.status || "published",
      });
    }
  }, [metadata, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const autoSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug && prev.slug !== autoSlug ? prev.slug : autoSlug,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-coral-pale text-coral rounded-xl">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-navy">Story Settings & Station Tagging</h2>
              <p className="text-xs text-slate-500">Configure which station and category this story publishes to.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-navy mb-1.5">
              Story Title <span className="text-coral">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Seafarers Celebrate Grand Reopening at Port of Toronto"
              className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral"
            />
          </div>

          {/* Station & Category Selector */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Station Target */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-navy mb-1.5 flex items-center gap-1.5">
                <Anchor className="w-3.5 h-3.5 text-coral" /> Target Station <span className="text-coral">*</span>
              </label>
              <select
                value={formData.station}
                onChange={(e) => {
                  const st = e.target.value;
                  let defaultLoc = "Southern Ontario";
                  if (st === "toronto") defaultLoc = "Port of Toronto";
                  if (st === "hamilton") defaultLoc = "Port of Hamilton";
                  if (st === "oshawa") defaultLoc = "Port of Oshawa";
                  if (st === "port-colborne") defaultLoc = "Port Colborne & Lock 8";
                  setFormData((prev) => ({ ...prev, station: st, location: defaultLoc }));
                }}
                className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-coral"
              >
                <option value="toronto">Toronto Station</option>
                <option value="hamilton">Hamilton Station</option>
                <option value="oshawa">Oshawa Station</option>
                <option value="port-colborne">Port Colborne Station</option>
                <option value="mtsso">MTSSO Umbrella (Regional)</option>
                <option value="all">All Stations (Network Wide)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-navy mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-coral" /> Category <span className="text-coral">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-coral"
              >
                <option value="Ship Visits">Ship Visits</option>
                <option value="Events">Events</option>
                <option value="Station News">Station News</option>
                <option value="Stories">Stories & Crew Testimonies</option>
                <option value="Volunteers">Volunteers</option>
                <option value="Community">Community Partnerships</option>
                <option value="Announcements">Announcements</option>
                <option value="Maritime News">Maritime News</option>
              </select>
            </div>
          </div>

          {/* Excerpt / Summary */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-navy mb-1.5">
              Short Summary / Excerpt
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="A short 1-2 sentence preview that appears on the newsfeed cards."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral"
            />
          </div>

          {/* Featured Image URL */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-navy mb-1.5 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-coral" /> Featured Header Image URL / Asset
            </label>
            <input
              type="text"
              value={formData.featuredImage}
              onChange={(e) => setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))}
              placeholder="https://images.unsplash.com/... or /src/assets/event1.jpeg"
              className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral"
            />
          </div>

          {/* Author & Location */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-navy mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-coral" /> Author / Reporter
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-navy mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-coral" /> Port Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral"
              />
            </div>
          </div>

          {/* Publication Status & Slug */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-navy mb-1.5">
                Publish Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full px-3.5 py-2 text-sm font-bold rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-coral"
              >
                <option value="published">🚀 Published (Visible on Website)</option>
                <option value="draft">📝 Draft (Admin Only)</option>
                <option value="archived">📦 Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-navy mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="auto-generated-slug"
                className="w-full px-4 py-2 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-200">
              Cancel
            </Button>
            <Button type="submit" className="bg-coral hover:bg-coral-light text-white font-bold px-6 shadow-warm">
              <CheckCircle2 className="w-4 h-4 mr-2" /> Save Story Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryMetadataModal;
