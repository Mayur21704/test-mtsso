import { Link } from "react-router-dom";
import { ArrowLeft, Save, Send, Settings, Eye, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

export const CmsNavbar = ({
  story,
  onOpenSettings,
  onOpenPreview,
  onSaveDraft,
  onPublish,
  isSaving,
}) => {
  const stationLabels = {
    toronto: "Toronto Station",
    hamilton: "Hamilton Station",
    oshawa: "Oshawa Station",
    "port-colborne": "Port Colborne",
    mtsso: "MTSSO Regional",
    all: "All Stations",
  };

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between text-white shrink-0 z-40">
      {/* Left: Back Link, Logo & Story Title */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
        <Link
          to="/admin/stories"
          className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-900 transition-colors shrink-0"
          title="Back to Admin Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <img
          src={logo}
          alt="MTSSO Logo"
          className="h-9 w-auto rounded shrink-0 hidden xs:block"
        />

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {story?.title || "Untitled Story"}
            </span>
            <span className="inline-flex items-center gap-1 bg-coral/20 text-coral-light border border-coral/30 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0">
              <Anchor className="w-2.5 h-2.5" />
              {stationLabels[story?.station] || "MTSSO"}
            </span>
            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase hidden md:inline shrink-0">
              {story?.category || "News"}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {story?.status === "published" ? "🟢 Published on Website" : "📝 Working Draft"}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Story Settings Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onOpenSettings}
          className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white text-xs font-bold"
        >
          <Settings className="w-3.5 h-3.5 mr-1.5 text-coral" />
          <span className="hidden sm:inline">Station & </span>Settings
        </Button>

        {/* Live Preview Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onOpenPreview}
          className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white text-xs font-bold"
        >
          <Eye className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
          Preview
        </Button>

        {/* Save Draft */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onSaveDraft}
          disabled={isSaving}
          className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold hidden md:inline-flex"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {isSaving ? "Saving..." : "Save Draft"}
        </Button>

        {/* Publish Story CTA */}
        <Button
          type="button"
          size="sm"
          onClick={onPublish}
          disabled={isSaving}
          className="bg-coral hover:bg-coral-light text-white text-xs font-extrabold px-4 shadow-warm"
        >
          <Send className="w-3.5 h-3.5 mr-1.5" />
          Publish Story
        </Button>
      </div>
    </header>
  );
};

export default CmsNavbar;
