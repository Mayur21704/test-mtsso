import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar, MapPin, User, Anchor, ArrowLeft,
  Share2, ChevronRight, Phone, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { storyService } from "../services/storyService";

export const ArticleViewPage = () => {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const data = await storyService.getStoryBySlug(slug);
        setStory(data);
      } catch (err) {
        console.error("Failed to load article", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-gray flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-wider text-navy">Loading Story...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-warm-gray flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-border text-center shadow-lg space-y-4">
          <span className="text-4xl">⚓</span>
          <h1 className="text-2xl font-extrabold text-navy">Story Not Found</h1>
          <p className="text-sm text-text-mid">
            The article you are looking for might have been moved or is no longer available.
          </p>
          <Button asChild className="bg-coral text-white font-bold text-xs">
            <Link to="/news">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to News & Stories
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-warm-gray min-h-screen font-sans">
      {/* ─── BREADCRUMBS & TOP BAR ─── */}
      <div className="bg-white border-b border-border py-4">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-text-mid flex-wrap">
            <Link to="/" className="hover:text-coral font-bold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/news" className="hover:text-coral font-bold transition-colors">News & Stories</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-navy font-bold truncate max-w-xs">{story.title}</span>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-coral font-extrabold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Stories
          </Link>
        </div>
      </div>

      {/* ─── ARTICLE HEADER HERO ─── */}
      <section className="bg-navy-dark text-white py-12 md:py-16">
        <div className="container-page max-w-4xl mx-auto space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-coral text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              <Anchor className="w-3.5 h-3.5" /> {story.stationName || "MTSSO Regional"}
            </span>
            <span className="bg-white/10 text-white/90 text-xs font-bold px-3 py-1 rounded-full">
              {story.category || "Station News"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {story.title}
          </h1>

          <div className="pt-2 flex items-center justify-center gap-4 sm:gap-6 text-xs text-white/70 flex-wrap">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-coral-light" /> {story.author || "MTSSO Editorial Team"}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-coral-light" /> {story.location || "Southern Ontario"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-coral-light" /> {new Date(story.publishedAt || story.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE BODY (RENDERING GRAPESJS CONTENT) ─── */}
      <main className="py-12 md:py-16">
        <div className="container-page max-w-4xl mx-auto">
          <article className="bg-white rounded-3xl p-6 sm:p-12 md:p-16 border border-border shadow-sm">
            {/* Injected GrapesJS CSS */}
            {story.cssContent && <style>{story.cssContent}</style>}

            {/* Injected GrapesJS HTML */}
            <div
              className="cms-article-rendered-body"
              dangerouslySetInnerHTML={{ __html: story.htmlContent }}
            />

            {/* Bottom Station Share & Action Card */}
            <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-extrabold uppercase text-coral">Part of the MTSSO Network</span>
                <p className="text-sm font-bold text-navy">
                  Supporting seafarers calling on {story.stationName || "Southern Ontario ports"}.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button asChild className="bg-coral hover:bg-coral-light text-white font-bold text-xs px-5 shadow-warm">
                  <Link to={story.station && story.station !== "all" && story.station !== "mtsso" ? `/stations/${story.station}` : "/stations"}>
                    Visit {story.stationName || "Station"}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-navy text-navy text-xs font-bold">
                  <Link to="/news">
                    More Stories
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default ArticleViewPage;
