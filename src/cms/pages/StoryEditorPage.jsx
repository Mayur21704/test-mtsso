import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GrapesEditor } from "../components/GrapesEditor";
import { CmsNavbar } from "../components/CmsNavbar";
import { StoryMetadataModal } from "../components/StoryMetadataModal";
import { StoryPreviewModal } from "../components/StoryPreviewModal";
import { MediaLibraryModal } from "../components/MediaLibraryModal";
import { CmsNotification } from "../components/CmsNotification";
import { CmsConfirmModal } from "../components/CmsConfirmModal";
import { storyService } from "../services/storyService";
import { getDefaultArticleTemplate } from "../config/defaultTemplate";

export const StoryEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editorRef = useRef(null);
  const [activeDevice, setActiveDevice] = useState("Desktop");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [metadataModalOpen, setMetadataModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);

  // Small popup toast state
  const [toast, setToast] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const showToast = (type, title, message) => {
    setToast({ isOpen: true, type, title, message });
  };

  const [story, setStory] = useState({
    title: "New Seafarers Port Story",
    slug: "",
    station: "toronto",
    stationName: "Toronto Station",
    category: "Station News",
    excerpt: "",
    featuredImage: "",
    location: "Port of Toronto",
    author: "MTSSO Editorial Team",
    htmlContent: "",
    cssContent: "",
    projectData: {},
    status: "published",
  });

  // Load existing story or seed template
  useEffect(() => {
    const loadStory = async () => {
      if (id) {
        try {
          const data = await storyService.getStoryById(id);
          if (data) {
            setStory(data);
          }
        } catch (err) {
          console.error("Could not load story for editing", err);
          showToast("error", "Error Loading", "Could not load story for editing.");
        }
      } else {
        // Default new story template
        setStory((prev) => ({
          ...prev,
          htmlContent: getDefaultArticleTemplate("New Seafarers Port Story", "Toronto Station"),
        }));
      }
      setLoading(false);
    };

    loadStory();
  }, [id]);

  const handleSave = async (statusOverride = null) => {
    if (!editorRef.current) return;
    setIsSaving(true);

    try {
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      const projectData = editorRef.current.getProjectData();

      const nextStatus = statusOverride || story.status || "published";

      const payload = {
        ...story,
        htmlContent: html,
        cssContent: css,
        projectData,
        status: nextStatus,
      };

      let saved = null;
      if (id) {
        saved = await storyService.updateStory(id, payload);
      } else {
        saved = await storyService.createStory(payload);
        if (saved?.id) {
          navigate(`/admin/stories/edit/${saved.id}`, { replace: true });
        }
      }

      // Update local state so UI instantly reflects "Published" or "Draft Changes"
      setStory((prev) => ({
        ...prev,
        ...(saved || payload),
        hasDraftChanges: nextStatus === "draft" && Boolean(saved?.publishedHtml || prev.publishedHtml),
      }));

      if (nextStatus === "draft") {
        showToast("success", "Draft Saved", "Working draft saved. Live website remains unchanged.");
      } else {
        showToast("success", "Story Published", "Live across MTSSO station feeds!");
      }
    } catch (err) {
      console.error("Failed to save story", err);
      showToast("error", "Save Failed", err.message || "Could not save story.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-white font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Loading Visual Studio...</p>
        </div>
      </div>
    );
  }

  const currentHtml = editorRef.current ? editorRef.current.getHtml() : story.htmlContent;
  const currentCss = editorRef.current ? editorRef.current.getCss() : story.cssContent;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-100 font-sans">
      {/* ─── CMS TOP NAVBAR ─── */}
      <CmsNavbar
        story={story}
        activeDevice={activeDevice}
        onChangeDevice={(device) => setActiveDevice(device)}
        onOpenSettings={() => setMetadataModalOpen(false) || setMetadataModalOpen(true)}
        onOpenPreview={() => setPreviewModalOpen(true)}
        onOpenAssets={() => setMediaLibraryOpen(true)}
        onUndo={() => editorRef.current?.undo()}
        onRedo={() => editorRef.current?.redo()}
        onSaveDraft={() => handleSave("draft")}
        onPublish={() => handleSave("published")}
        isSaving={isSaving}
      />

      {/* ─── GRAPESJS VISUAL STUDIO WORKSPACE ─── */}
      <div className="flex-1 w-full overflow-hidden">
        <GrapesEditor
          ref={editorRef}
          initialHtml={story.htmlContent}
          initialCss={story.cssContent}
          initialProjectData={story.projectData}
          activeDevice={activeDevice}
          onRequestClear={() => setClearConfirmOpen(true)}
        />
      </div>

      {/* ─── STORY SETTINGS MODAL ─── */}
      <StoryMetadataModal
        isOpen={metadataModalOpen}
        onClose={() => setMetadataModalOpen(false)}
        metadata={story}
        onSave={(newMeta) => {
          setStory((prev) => ({ ...prev, ...newMeta }));
          showToast("info", "Settings Updated", "Story station and category metadata saved.");
        }}
      />

      {/* ─── LIVE PREVIEW MODAL ─── */}
      <StoryPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        story={story}
        html={currentHtml}
        css={currentCss}
      />

      {/* ─── CLEAR CANVAS CONFIRMATION POPUP ─── */}
      <CmsConfirmModal
        isOpen={clearConfirmOpen}
        onClose={() => setClearConfirmOpen(false)}
        onConfirm={() => {
          editorRef.current?.clear();
          showToast("info", "Canvas Cleared", "The canvas workspace has been reset.");
        }}
        title="Clear Visual Canvas?"
        message="This will remove all components from the current canvas layout."
        confirmLabel="Clear Canvas"
        isDestructive={true}
      />

      {/* ─── MEDIA LIBRARY MODAL ─── */}
      <MediaLibraryModal
        isOpen={mediaLibraryOpen}
        onClose={() => setMediaLibraryOpen(false)}
        selectMode={true}
        onSelect={(src, file) => {
          const editor = editorRef.current;
          if (!editor) return;
          const gjsEditor = editor.getEditor?.() || editor;
          if (!gjsEditor) return;

          const selected = gjsEditor.getSelected?.();
          const isVideo = file?.type === "video" || /\.(mp4|webm|ogg|mov|m4v|avi|mkv)$/i.test(src);
          const isPdf = file?.type === "document" && /\.pdf$/i.test(src);

          if (selected) {
            const tag = (selected.get("tagName") || "").toUpperCase();
            const type = selected.get("type");
            const mtssoType = selected.getAttributes?.()?.["data-mtsso-type"];

            if (tag === "IMG" || type === "image") {
              selected.set("src", src);
              selected.addAttributes({ src });
            } else if (type === "mtsso-video" || mtssoType === "video-embed") {
              selected.set("video_url", src);
            } else if (type === "mtsso-pdf-embed" || mtssoType === "pdf-embed") {
              selected.set("pdf_url", src);
            } else if (tag === "A" || type === "link") {
              selected.addAttributes({ href: src });
            } else {
              // Insert into canvas next to selected
              if (isVideo) {
                gjsEditor.addComponents({
                  type: "mtsso-video",
                  video_url: src,
                });
              } else if (isPdf) {
                gjsEditor.addComponents({
                  type: "mtsso-pdf-embed",
                  pdf_url: src,
                });
              } else {
                gjsEditor.addComponents({
                  tagName: "img",
                  type: "image",
                  attributes: { src, alt: file?.name || "Uploaded image" },
                  style: { "max-width": "100%", height: "auto", "border-radius": "12px", margin: "20px 0" },
                });
              }
            }
          } else {
            // Append to canvas
            if (isVideo) {
              gjsEditor.addComponents({
                type: "mtsso-video",
                video_url: src,
              });
            } else if (isPdf) {
              gjsEditor.addComponents({
                type: "mtsso-pdf-embed",
                pdf_url: src,
              });
            } else {
              gjsEditor.addComponents({
                tagName: "img",
                type: "image",
                attributes: { src, alt: file?.name || "Uploaded image" },
                style: { "max-width": "100%", height: "auto", "border-radius": "12px", margin: "20px 0" },
              });
            }
          }
          showToast("success", "Media Inserted", `"${file?.name || "Media file"}" applied to your story.`);
        }}
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

export default StoryEditorPage;
