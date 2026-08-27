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
  const [previewData, setPreviewData] = useState({ html: "", css: "" });
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [assetTargetProps, setAssetTargetProps] = useState(null);

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

  // Handler for Save Draft & Publish
  const handleSave = async (targetStatus = "published") => {
    const editor = editorRef.current;
    if (!editor) return;

    setIsSaving(true);
    try {
      const htmlContent = editor.getHtml();
      const cssContent = editor.getCss();
      const projectData = editor.getProjectData();

      const payload = {
        ...story,
        htmlContent,
        cssContent,
        projectData,
        status: targetStatus,
        hasDraftChanges: targetStatus === "draft",
      };

      if (id) {
        const updated = await storyService.updateStory(id, payload);
        setStory((prev) => ({
          ...prev,
          ...payload,
          ...(updated || {}),
          status: targetStatus,
          hasDraftChanges: targetStatus === "draft",
        }));
        showToast(
          "success",
          targetStatus === "published" ? "Story Published!" : "Draft Saved",
          targetStatus === "published"
            ? "Your story is now live and updated across all station pages."
            : "Draft progress saved securely. Readers will continue seeing previous live version."
        );
      } else {
        const newStory = await storyService.createStory(payload);
        setStory((prev) => ({
          ...prev,
          ...payload,
          ...(newStory || {}),
          status: targetStatus,
          hasDraftChanges: targetStatus === "draft",
        }));
        showToast(
          "success",
          targetStatus === "published" ? "Story Created & Published!" : "Draft Created",
          `Story "${story.title}" has been saved.`
        );
        if (newStory?.id) {
          navigate(`/admin/stories/edit/${newStory.id}`, { replace: true });
        }
      }
    } catch (err) {
      console.error("Save story error", err);
      showToast("error", "Save Failed", err.message || "Could not save story to the server.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenPreview = () => {
    const html = editorRef.current ? editorRef.current.getHtml() : story.htmlContent;
    const css = editorRef.current ? editorRef.current.getCss() : story.cssContent;
    setPreviewData({ html: html || "", css: css || "" });
    setPreviewModalOpen(true);
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

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-100 font-sans">
      {/* ─── CMS TOP NAVBAR ─── */}
      <CmsNavbar
        story={story}
        activeDevice={activeDevice}
        onChangeDevice={(device) => setActiveDevice(device)}
        onOpenSettings={() => setMetadataModalOpen(false) || setMetadataModalOpen(true)}
        onOpenPreview={handleOpenPreview}
        onOpenAssets={() => {
          setAssetTargetProps(null);
          setMediaLibraryOpen(true);
        }}
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
          onRequestOpenAssets={(props) => {
            setAssetTargetProps(props || null);
            setMediaLibraryOpen(true);
          }}
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
        html={previewData.html}
        css={previewData.css}
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
        onClose={() => {
          setMediaLibraryOpen(false);
          setAssetTargetProps(null);
        }}
        selectMode={true}
        onSelect={(src, file) => {
          const editor = editorRef.current;
          if (!editor) return;
          const gjsEditor = editor.getEditor?.() || editor;
          if (!gjsEditor) return;

          const isBackgroundRequest =
            assetTargetProps?.target?.get?.("property") === "background-image" ||
            assetTargetProps?.types?.includes?.("image");

          // 1. Tell GrapesJS asset manager about the selection if it provided a callback
          if (assetTargetProps?.select) {
            try {
              assetTargetProps.select(src, true);
            } catch (e) {
              console.warn("Could not call assetTargetProps.select", e);
            }
          }

          // 2. If GrapesJS StyleManager property was targeted, update its value directly
          if (assetTargetProps?.target?.setValue) {
            try {
              assetTargetProps.target.setValue(`url("${src}")`);
            } catch (e) {
              try {
                assetTargetProps.target.setValue(src);
              } catch (e2) {}
            }
          }

          const selected = gjsEditor.getSelected?.();
          const isVideo = file?.type === "video" || /\.(mp4|webm|ogg|mov|m4v|avi|mkv)$/i.test(src);
          const isPdf = file?.type === "document" && /\.pdf$/i.test(src);

          if (selected) {
            const tag = (selected.get("tagName") || "").toUpperCase();
            const type = selected.get("type");
            const mtssoType = selected.getAttributes?.()?.["data-mtsso-type"];

            if (isBackgroundRequest || (assetTargetProps && tag !== "IMG" && type !== "image")) {
              // Apply as background-image directly
              selected.addStyle({ "background-image": `url("${src}")` });
            } else if (tag === "IMG" || type === "image") {
              selected.set("src", src);
              selected.addAttributes({ src });
            } else if (type === "mtsso-video" || mtssoType === "video-embed") {
              selected.set("video_url", src);
            } else if (type === "mtsso-pdf-embed" || mtssoType === "pdf-embed") {
              selected.set("pdf_url", src);
            } else if (tag === "A" || type === "link") {
              selected.addAttributes({ href: src });
            } else {
              // If none of the above, set as background-image if style manager was active, else insert
              if (assetTargetProps) {
                selected.addStyle({ "background-image": `url("${src}")` });
              } else if (isVideo) {
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
          setAssetTargetProps(null);
          showToast("success", "Media Applied", `"${file?.name || "Image"}" applied.`);
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
