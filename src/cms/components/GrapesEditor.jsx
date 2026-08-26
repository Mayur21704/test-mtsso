import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import { getGrapesConfig } from "../config/grapesConfig";
import { registerCustomBlocks } from "../config/customBlocks";
import "../styles/grapesCustom.css";

/**
 * GrapesEditor Component
 * Wraps GrapesJS instance with React lifecycle management and responsive toolbars.
 */
export const GrapesEditor = ({
  initialHtml = "",
  initialCss = "",
  initialProjectData = null,
  onEditorReady,
}) => {
  const editorRef = useRef(null);
  const [activeTab, setActiveTab] = useState("blocks"); // "blocks" | "styles" | "layers"
  const [activeDevice, setActiveDevice] = useState("Desktop");

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (editorRef.current) return;

    const config = getGrapesConfig("gjs-canvas-target");
    const editor = grapesjs.init(config);
    editorRef.current = editor;

    // Register MTSSO custom blocks
    registerCustomBlocks(editor);

    // Load initial content or projectData
    editor.on("load", () => {
      if (initialProjectData && Object.keys(initialProjectData).length > 0) {
        editor.loadProjectData(initialProjectData);
      } else if (initialHtml) {
        editor.setComponents(initialHtml);
        if (initialCss) editor.setStyle(initialCss);
      }

      if (onEditorReady) {
        onEditorReady(editor);
      }
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleDeviceChange = (deviceName) => {
    setActiveDevice(deviceName);
    if (editorRef.current) {
      editorRef.current.setDevice(deviceName);
    }
  };

  return (
    <div className="flex h-full w-full bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* ─── MAIN CANVAS AREA ─── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Device Switcher & Quick Canvas Actions Toolbar */}
        <div className="h-12 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {["Desktop", "Tablet", "Mobile"].map((device) => (
              <button
                key={device}
                type="button"
                onClick={() => handleDeviceChange(device)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  activeDevice === device
                    ? "bg-coral text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {device === "Desktop" && "🖥️ "}
                {device === "Tablet" && "📱 "}
                {device === "Mobile" && "📲 "}
                {device}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 font-medium hidden sm:block">
            Drag blocks from the right panel into the canvas · Click any element to edit
          </div>
        </div>

        {/* The GrapesJS Canvas Target */}
        <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-950">
          <div id="gjs-canvas-target" className="h-full w-full" />
        </div>
      </div>

      {/* ─── RIGHT SIDEBAR: BLOCKS / STYLES / LAYERS ─── */}
      <div className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-full shrink-0">
        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950">
          <button
            type="button"
            onClick={() => setActiveTab("blocks")}
            className={`flex-1 py-3 text-xs font-extrabold tracking-wide uppercase transition-colors ${
              activeTab === "blocks"
                ? "text-coral border-b-2 border-coral bg-slate-900"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🧩 Blocks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("styles")}
            className={`flex-1 py-3 text-xs font-extrabold tracking-wide uppercase transition-colors ${
              activeTab === "styles"
                ? "text-coral border-b-2 border-coral bg-slate-900"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🎨 Styles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("layers")}
            className={`flex-1 py-3 text-xs font-extrabold tracking-wide uppercase transition-colors ${
              activeTab === "layers"
                ? "text-coral border-b-2 border-coral bg-slate-900"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            📑 Layers
          </button>
        </div>

        {/* Panel Content Containers */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div
            id="gjs-blocks-container"
            className={activeTab === "blocks" ? "block" : "hidden"}
          />
          <div
            id="gjs-style-container"
            className={activeTab === "styles" ? "block" : "hidden"}
          />
          <div
            id="gjs-layers-container"
            className={activeTab === "layers" ? "block" : "hidden"}
          />
        </div>
      </div>
    </div>
  );
};

export default GrapesEditor;
