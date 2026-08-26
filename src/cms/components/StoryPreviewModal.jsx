import { X, ExternalLink, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StoryPreviewModal = ({ isOpen, onClose, story, html, css }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 text-slate-900">
        {/* Modal Top Bar */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-coral">Website Live Preview</span>
            <span className="text-slate-500">|</span>
            <span className="text-xs text-slate-300 font-medium truncate max-w-sm">{story?.title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Container simulating MTSSO public website */}
        <div className="flex-1 overflow-y-auto bg-warm-gray p-4 sm:p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-border">
            {/* Story Header Badges */}
            <div className="flex items-center justify-between text-xs text-text-mid mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white bg-coral px-3 py-1 rounded-full uppercase text-[11px] tracking-wider">
                  {story?.stationName || "MTSSO Station"}
                </span>
                <span className="font-bold text-navy bg-warm-gray px-3 py-1 rounded-full text-[11px]">
                  {story?.category || "News"}
                </span>
              </div>
              <span>{new Date(story?.publishedAt || Date.now()).toLocaleDateString()}</span>
            </div>

            {/* Custom GrapesJS HTML and Injected CSS */}
            {css && <style>{css}</style>}
            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Targeting: <strong className="text-navy">{story?.stationName || "All Ports"}</strong>
          </span>
          <Button type="button" onClick={onClose} size="sm" className="bg-navy text-white text-xs">
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryPreviewModal;
