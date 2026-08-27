import { X, Eye, Anchor, Calendar, MapPin, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Story Preview Modal
 * Renders the article EXACTLY like the published ArticleViewPage
 * so users see a true WYSIWYG preview before publishing.
 */
export const StoryPreviewModal = ({ isOpen, onClose, story, html, css }) => {
  if (!isOpen) return null;

  const stationName = story?.stationName || "MTSSO Regional";
  const category = story?.category || "Station News";
  const author = story?.author || "MTSSO Editorial Team";
  const location = story?.location || "Southern Ontario";
  const publishDate = new Date(story?.publishedAt || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-warm-gray rounded-3xl max-w-5xl w-full h-[95vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        
        {/* ─── Preview Chrome Bar ─── */}
        <div className="px-5 py-3 bg-slate-900 text-white flex items-center justify-between shrink-0 rounded-t-3xl">
          <div className="flex items-center gap-3">
            {/* Fake browser dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="ml-3 flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-400 font-medium min-w-0">
              <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">mtsso.org/news/{story?.slug || "preview"}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ─── Article Content (mirrors ArticleViewPage exactly) ─── */}
        <div className="flex-1 overflow-y-auto bg-warm-gray">
          
          {/* Breadcrumbs */}
          <div className="bg-white border-b border-border py-4">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 flex items-center gap-2 text-xs text-text-mid">
              <span className="font-bold">Home</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="font-bold">News & Stories</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-navy font-bold truncate max-w-xs">{story?.title}</span>
            </div>
          </div>

          {/* Navy Hero Header */}
          <section className="bg-navy-dark text-white py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4 text-center">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 bg-coral text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Anchor className="w-3.5 h-3.5" /> {stationName}
                </span>
                <span className="bg-white/10 text-white/90 text-xs font-bold px-3 py-1 rounded-full">
                  {category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {story?.title || "Untitled Story"}
              </h1>

              <div className="pt-2 flex items-center justify-center gap-4 sm:gap-6 text-xs text-white/70 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-coral-light" /> {author}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-coral-light" /> {location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-coral-light" /> {publishDate}
                </span>
              </div>
            </div>
          </section>

          {/* Article Body */}
          <main className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-6 sm:px-8">
              <article className="bg-white rounded-3xl p-6 sm:p-12 md:p-16 border border-border shadow-sm">
                {/* Injected GrapesJS CSS */}
                {css && <style>{css}</style>}

                {/* Injected GrapesJS HTML — same class as published page */}
                <div
                  className="cms-article-rendered-body"
                  dangerouslySetInnerHTML={{ __html: html }}
                />

                {/* Bottom Station Card */}
                <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-xs font-extrabold uppercase text-coral">Part of the MTSSO Network</span>
                    <p className="text-sm font-bold text-navy">
                      Supporting seafarers calling on {stationName}.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-5 py-2 rounded-xl bg-coral text-white font-bold text-xs shadow-warm">
                      Visit {stationName}
                    </span>
                    <span className="px-5 py-2 rounded-xl border border-navy text-navy text-xs font-bold">
                      More Stories
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </main>
        </div>

        {/* ─── Footer ─── */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0 rounded-b-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Eye className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-bold">Live Preview</span>
            <span className="text-slate-300">|</span>
            <span>This is exactly how the story will appear to readers</span>
          </div>
          <Button type="button" onClick={onClose} size="sm" className="bg-navy text-white text-xs font-bold cursor-pointer">
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryPreviewModal;
