import { Link } from "react-router-dom";
import {
  ArrowLeft, Save, Send, Settings, Anchor,
  Monitor, Tablet, Smartphone, RotateCcw, RotateCw,
  Image as ImageIcon, Eye
} from "lucide-react";
import logo from "@/assets/logo.jpeg";

export const CmsNavbar = ({
  story,
  activeDevice,
  onChangeDevice,
  onOpenSettings,
  onOpenPreview,
  onOpenAssets,
  onUndo,
  onRedo,
  onSaveDraft,
  onPublish,
  isSaving,
}) => {
  const stationLabels = {
    toronto: "Toronto",
    hamilton: "Hamilton",
    oshawa: "Oshawa",
    "port-colborne": "Port Colborne",
    mtsso: "MTSSO",
    all: "All Stations",
  };

  return (
    <header className="h-14 bg-slate-950/95 backdrop-blur-md text-white px-3 sm:px-6 flex items-center justify-between border-b border-slate-800/80 shadow-md shrink-0 z-40 select-none">
      {/* ─── LEFT: BACK, LOGO & STORY STATUS ─── */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Link
          to="/admin/stories"
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-all shrink-0"
          title="Back to Admin Dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <img
          src={logo}
          alt="MTSSO Logo"
          className="h-7 sm:h-8 w-auto rounded shrink-0 hidden sm:block bg-white p-0.5"
        />

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold text-white truncate max-w-[120px] sm:max-w-[180px] md:max-w-xs">
            {story?.title || "New Story"}
          </span>

          <span className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-300 shrink-0">
            <Anchor className="w-2.5 h-2.5 text-coral" />
            <span className="truncate max-w-[65px] sm:max-w-none">
              {stationLabels[story?.station] || "MTSSO"}
            </span>
          </span>

          {story?.hasDraftChanges ? (
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 shadow-xs" title="You have unpublished draft changes saved">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Draft Changes
            </span>
          ) : story?.status === "published" ? (
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 shadow-xs" title="Live on MTSSO website">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Published
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 shadow-xs" title="Unpublished Draft">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Draft
            </span>
          )}
        </div>
      </div>

      {/* ─── CENTER: FRAMER-STYLE SEGMENTED VIEWPORT PILL ─── */}
      <div className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
        {[
          { id: "Desktop", icon: Monitor, label: "Desktop", width: "1280px" },
          { id: "Tablet", icon: Tablet, label: "Tablet", width: "768px" },
          { id: "Mobile", icon: Smartphone, label: "Mobile", width: "375px" },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeDevice === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeDevice(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-coral text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
              title={`Switch to ${item.label} (${item.width})`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── RIGHT: ACTIONS, PREVIEW & PUBLISH ─── */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Undo / Redo */}
        <div className="hidden sm:flex items-center bg-slate-900 rounded-lg border border-slate-800 p-0.5">
          <button
            type="button"
            onClick={onUndo}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Media Library */}
        <button
          type="button"
          onClick={onOpenAssets}
          className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-all cursor-pointer"
          title="Open Media Library"
        >
          <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
          <span>Media</span>
        </button>

        {/* Live Preview */}
        <button
          type="button"
          onClick={onOpenPreview}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-all cursor-pointer hover:text-white"
          title="Preview Story Page"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>Preview</span>
        </button>

        {/* Station & Settings */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-all cursor-pointer"
          title="Station & Settings"
        >
          <Settings className="w-3.5 h-3.5 text-coral" />
          <span className="hidden sm:inline">Settings</span>
        </button>

        {/* Save Draft */}
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSaving}
          className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? "Saving..." : "Save"}</span>
        </button>

        {/* Publish Story CTA */}
        <button
          type="button"
          onClick={onPublish}
          disabled={isSaving}
          className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-lg bg-coral hover:bg-coral-light text-white text-xs font-extrabold shadow-warm transition-all cursor-pointer disabled:opacity-50 hover:scale-105 active:scale-95"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Publish</span>
        </button>
      </div>
    </header>
  );
};

export default CmsNavbar;
