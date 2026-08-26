import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GrapesEditor } from "../components/GrapesEditor";
import { CmsNavbar } from "../components/CmsNavbar";
import { StoryMetadataModal } from "../components/StoryMetadataModal";
import { StoryPreviewModal } from "../components/StoryPreviewModal";
import { storyService } from "../services/storyService";
import { getDefaultArticleTemplate } from "../config/defaultTemplate";

export const StoryEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editorInstanceRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [metadataModalOpen, setMetadataModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

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

  const handleEditorReady = (editor) => {
    editorInstanceRef.current = editor;
  };

  const handleSave = async (statusOverride = null) => {
    if (!editorInstanceRef.current) return;
    setIsSaving(true);

    try {
      const editor = editorInstanceRef.current;
      const html = editor.getHtml();
      const css = editor.getCss();
      const projectData = editor.getProjectData();

      const payload = {
        ...story,
        htmlContent: html,
        cssContent: css,
        projectData,
        status: statusOverride || story.status,
      };

      if (id) {
        await storyService.updateStory(id, payload);
      } else {
        const created = await storyService.createStory(payload);
        if (created?.id) {
          navigate(`/admin/stories/edit/${created.id}`, { replace: true });
        }
      }

      alert(
        statusOverride === "draft"
          ? "Draft saved successfully!"
          : "Story published successfully to the MTSSO network!"
      );
    } catch (err) {
      console.error("Failed to save story", err);
      alert("Error saving story: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-950 text-white font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading Visual Studio...</p>
        </div>
      </div>
    );
  }

  const currentHtml = editorInstanceRef.current ? editorInstanceRef.current.getHtml() : story.htmlContent;
  const currentCss = editorInstanceRef.current ? editorInstanceRef.current.getCss() : story.cssContent;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-950 font-sans">
      {/* CMS Top Navbar */}
      <CmsNavbar
        story={story}
        onOpenSettings={() => setMetadataModalOpen(true)}
        onOpenPreview={() => setPreviewModalOpen(true)}
        onSaveDraft={() => handleSave("draft")}
        onPublish={() => handleSave("published")}
        isSaving={isSaving}
      />

      {/* GrapesJS Visual Canvas */}
      <div className="flex-1 w-full overflow-hidden">
        <GrapesEditor
          initialHtml={story.htmlContent}
          initialCss={story.cssContent}
          initialProjectData={story.projectData}
          onEditorReady={handleEditorReady}
        />
      </div>

      {/* Story Settings & Station Tagging Modal */}
      <StoryMetadataModal
        isOpen={metadataModalOpen}
        onClose={() => setMetadataModalOpen(false)}
        metadata={story}
        onSave={(newMeta) => {
          setStory((prev) => ({ ...prev, ...newMeta }));
        }}
      />

      {/* Live Preview Modal */}
      <StoryPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        story={story}
        html={currentHtml}
        css={currentCss}
      />
    </div>
  );
};

export default StoryEditorPage;
