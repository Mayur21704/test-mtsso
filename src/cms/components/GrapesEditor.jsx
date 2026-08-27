import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import grapesjs from "grapesjs";
import { getGrapesConfig } from "../config/grapesConfig";
import { registerCustomBlocks } from "../config/customBlocks";
import { Layers, Palette, LayoutGrid, Search, Trash2, X, SlidersHorizontal, ChevronLeft, Link2 } from "lucide-react";
import "../styles/grapesCustom.css";

/**
 * Clean Modern Visual Studio Editor
 * Responsive Artboard Canvas + Drawer for Mobile / Tablet + Fixed Sidebar for Desktop
 */
export const GrapesEditor = forwardRef(({
  initialHtml = "",
  initialCss = "",
  initialProjectData = null,
  activeDevice = "Desktop",
  onRequestClear,
  onRequestOpenAssets,
  onEditorReady,
}, ref) => {
  const editorRef = useRef(null);
  const [activeTab, setActiveTab] = useState("blocks"); // "blocks" | "styles" | "layers"
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Expose editor actions to parent via ref
  useImperativeHandle(ref, () => ({
    undo: () => {
      if (!editorRef.current) return;
      try {
        editorRef.current.runCommand("core:undo");
      } catch (e) {
        editorRef.current.UndoManager?.undo();
      }
    },
    redo: () => {
      if (!editorRef.current) return;
      try {
        editorRef.current.runCommand("core:redo");
      } catch (e) {
        editorRef.current.UndoManager?.redo();
      }
    },
    clear: () => editorRef.current?.runCommand("core:canvas-clear"),
    openAssets: (opts) => {
      if (onRequestOpenAssets) {
        onRequestOpenAssets(opts || {});
      } else {
        editorRef.current?.runCommand("open-assets", opts);
      }
    },
    getEditor: () => editorRef.current,
    getSelected: () => editorRef.current?.getSelected(),
    setDevice: (device) => editorRef.current?.setDevice(device),
    getHtml: () => editorRef.current?.getHtml(),
    getCss: () => editorRef.current?.getCss(),
    getProjectData: () => editorRef.current?.getProjectData(),
  }));

  useEffect(() => {
    if (editorRef.current) return;

    const config = getGrapesConfig("gjs-canvas-target", {
      onCustomAssetOpen: (props) => {
        if (onRequestOpenAssets) {
          onRequestOpenAssets(props);
        }
      },
    });
    const editor = grapesjs.init(config);
    editorRef.current = editor;

    // Route open-assets command directly to custom MTSSO Media Library
    editor.Commands.add("open-assets", {
      run(ed, sender, opts = {}) {
        if (onRequestOpenAssets) {
          onRequestOpenAssets(opts);
        }
      },
    });

    // Register modern MTSSO blocks & grids
    registerCustomBlocks(editor);

    editor.on("load", () => {
      // Ensure all custom block categories start open
      try {
        const categories = editor.BlockManager.getCategories();
        if (categories) {
          categories.forEach((cat) => cat.set("open", true));
        }
      } catch (e) {
        // ignore
      }

      if (initialProjectData && Object.keys(initialProjectData).length > 0) {
        editor.loadProjectData(initialProjectData);
      } else if (initialHtml) {
        editor.setComponents(initialHtml);
        if (initialCss) editor.setStyle(initialCss);
      }

      // 1-Tap Tap-to-Insert for Mobile touch screens & Desktop convenience
      const blockContainer = document.getElementById("gjs-blocks-container");
      if (blockContainer) {
        blockContainer.addEventListener("click", (e) => {
          if (e.target.closest(".gjs-title")) return;

          const blockEl = e.target.closest(".gjs-block");
          if (!blockEl) return;

          const all = editor.BlockManager.getAll();
          const blockText = blockEl.innerText.trim();
          const blockElements = Array.from(blockContainer.querySelectorAll(".gjs-block"));
          const idx = blockElements.indexOf(blockEl);
          let targetBlock = (all.models && all.models[idx]) ? all.models[idx] : null;

          if (!targetBlock) {
            targetBlock = all.find((b) => {
              const label = typeof b.get("label") === "string" ? b.get("label") : "";
              return label.includes(blockText) || (b.get("id") || "").includes(blockText);
            });
          }

          if (targetBlock) {
            const content = targetBlock.get("content");
            if (content) {
              const selected = editor.getSelected();
              if (selected) {
                selected.append(content);
              } else {
                editor.addComponents(content);
              }

              // On mobile screen, close drawer so user sees their new component on canvas
              if (window.innerWidth < 1024) {
                setMobileDrawerOpen(false);
              }
            }
          }
        });
      }

      // Native OS / Browser Color Picker Direct Overlay (100% unbreakable Figma/Canva style)
      const setupNativeColorPickers = () => {
        const styleContainer = document.getElementById("gjs-style-container");
        if (!styleContainer) return;

        const swatches = styleContainer.querySelectorAll(".gjs-field-color-picker, .gjs-field-colorp, .gjs-field-color-picker__preview");
        swatches.forEach((swatch) => {
          const parentSwatch = swatch.classList.contains("gjs-field-color-picker") || swatch.classList.contains("gjs-field-colorp")
            ? swatch
            : swatch.parentElement;

          if (!parentSwatch || parentSwatch.querySelector(".mtsso-color-input-overlay")) return;

          parentSwatch.style.position = "relative";
          parentSwatch.style.overflow = "hidden";
          parentSwatch.style.cursor = "pointer";

          const field = parentSwatch.closest(".gjs-field-color, .gjs-field");
          const textInput = field?.querySelector("input[type='text'], input:not([type='color'])");

          const colorInput = document.createElement("input");
          colorInput.type = "color";
          colorInput.className = "mtsso-color-input-overlay";
          colorInput.style.position = "absolute";
          colorInput.style.top = "0";
          colorInput.style.left = "0";
          colorInput.style.width = "100%";
          colorInput.style.height = "100%";
          colorInput.style.opacity = "0";
          colorInput.style.cursor = "pointer";
          colorInput.style.border = "none";
          colorInput.style.padding = "0";
          colorInput.style.margin = "0";
          colorInput.style.zIndex = "10";

          let val = textInput ? textInput.value.trim() : "#1e2456";
          if (val.startsWith("#") && val.length === 4) {
            val = `#${val[1]}${val[1]}${val[2]}${val[2]}${val[3]}${val[3]}`;
          }
          if (/^#[0-9A-F]{6}$/i.test(val)) {
            colorInput.value = val;
          }

          colorInput.addEventListener("input", (event) => {
            const newColor = event.target.value;
            if (textInput) {
              textInput.value = newColor;
              textInput.dispatchEvent(new Event("change", { bubbles: true }));
              textInput.dispatchEvent(new Event("input", { bubbles: true }));
            }
            const preview = parentSwatch.querySelector(".gjs-field-colorp-c, .gjs-field-color-picker__preview, [style*='background']");
            if (preview) {
              preview.style.backgroundColor = newColor;
            }
          });

          parentSwatch.appendChild(colorInput);
        });
      };

      // Enforce strict numeric-only input on all dimension & number style fields
      const setupNumericInputRestrictions = () => {
        const styleContainer = document.getElementById("gjs-style-container");
        if (!styleContainer || styleContainer.__numericRestricted) return;
        styleContainer.__numericRestricted = true;

        styleContainer.addEventListener("keydown", (e) => {
          const input = e.target.closest("input");
          if (!input) return;

          const field = input.closest(
            ".gjs-field-integer, .gjs-field-number, .gjs-field-unit, .gjs-sm-field-integer, .gjs-sm-field-number, .gjs-field-range"
          );
          if (!field) return;

          // Allow system navigation & shortcuts (Ctrl/Cmd + A, C, V, X, Z)
          if (e.ctrlKey || e.metaKey) return;

          const allowedControlKeys = [
            "Backspace", "Tab", "Enter", "Delete", "Escape",
            "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
            "Home", "End", ".", "-",
          ];

          if (allowedControlKeys.includes(e.key)) return;

          // Block any non-digit character (prevent typing letters/words)
          if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
          }
        });

        // Sanitize pasted or typed content
        styleContainer.addEventListener("input", (e) => {
          const input = e.target.closest("input");
          if (!input) return;

          const field = input.closest(
            ".gjs-field-integer, .gjs-field-number, .gjs-field-unit, .gjs-sm-field-integer, .gjs-sm-field-number, .gjs-field-range"
          );
          if (!field) return;

          if (input.value && typeof input.value === "string") {
            const clean = input.value.replace(/[^0-9.-]/g, "");
            if (clean !== input.value) {
              input.value = clean;
            }
          }
        });
      };

      // Run on selection and style sector updates
      editor.on("component:selected", (model) => {
        setTimeout(setupNativeColorPickers, 50);
        setTimeout(setupNumericInputRestrictions, 50);

        if (!model) return;

        // ─── HELPER: Walk up parent tree to find closest ancestor with a given tagName ───
        const findParent = (comp, tagName) => {
          let p = comp?.parent?.();
          while (p) {
            if ((p.get("tagName") || "").toUpperCase() === tagName.toUpperCase()) return p;
            p = p.parent?.();
          }
          return null;
        };

        const findParentByAttr = (comp, attr, val) => {
          let p = comp?.parent?.();
          while (p) {
            if (p.getAttributes?.()?.[attr] === val) return p;
            p = p.parent?.();
          }
          return null;
        };

        // ─── AUTO-SELECT: If user clicked inside a Video embed, select the video container ───
        const isVideo = model.getAttributes?.()["data-mtsso-type"] === "video-embed";
        const videoParent = !isVideo ? findParentByAttr(model, "data-mtsso-type", "video-embed") : null;
        if (videoParent) { editor.select(videoParent); return; }

        // ─── AUTO-SELECT: If user clicked inside a PDF embed, select the pdf container ───
        const isPdf = model.getAttributes?.()["data-mtsso-type"] === "pdf-embed";
        const pdfParent = !isPdf ? findParentByAttr(model, "data-mtsso-type", "pdf-embed") : null;
        if (pdfParent) { editor.select(pdfParent); return; }

        // ─── AUTO-SELECT: If user clicked a child (span/text) inside an <a>, select the <a> ───
        const isLink = (model.get("tagName") || "").toUpperCase() === "A";
        if (!isLink) {
          const linkParent = findParent(model, "A");
          if (linkParent) { editor.select(linkParent); return; }
        }

        // ─── Now assign traits based on element type (exclusive: only one match) ───
        const tag = (model.get("tagName") || "").toUpperCase();

        if (isVideo || model.get("type") === "mtsso-video") {
          // VIDEO EMBED
          model.set("traits", [
            { type: "text", name: "video_url", label: "YouTube / Video URL", placeholder: "Paste YouTube or Vimeo URL...", changeProp: 1 },
            { type: "select", name: "ratio", label: "Aspect Ratio", options: [
              { id: "56.25%", name: "16:9 (Standard Widescreen)" },
              { id: "75%", name: "4:3 (Classic)" },
              { id: "100%", name: "1:1 (Square)" },
            ], changeProp: 1 },
          ]);
        } else if (isPdf || model.get("type") === "mtsso-pdf-embed") {
          // PDF EMBED
          model.set("traits", [
            { type: "text", name: "pdf_url", label: "PDF Document URL", placeholder: "Paste PDF link...", changeProp: 1 },
            { type: "select", name: "pdf_height", label: "Viewer Height", options: [
              { id: "500px", name: "Compact (500px)" },
              { id: "650px", name: "Standard (650px)" },
              { id: "850px", name: "Large (850px)" },
              { id: "100vh", name: "Full Screen Height (100vh)" },
            ], changeProp: 1 },
          ]);
        } else if (tag === "A") {
          // BUTTON / LINK — Always show: Button Text (live edit), Link URL, Open In, Tooltip
          model.set("traits", [
            { type: "link-title-editor", name: "link_text", label: "Button / Link Text", placeholder: "e.g. Explore Port Stories →" },
            { type: "text", name: "href", label: "Link URL / PDF URL", placeholder: "https://... or /contact or /file.pdf" },
            { type: "select", name: "target", label: "Open In", options: [
              { id: "_blank", name: "New Tab (Recommended for PDFs)" },
              { id: "_self", name: "Same Window" },
            ]},
            { type: "text", name: "title", label: "Hover Tooltip (Title)", placeholder: "Optional hover tooltip" },
          ]);
        } else if (tag === "IMG") {
          // IMAGE — changeProp:1 needed because GrapesJS image stores src as a property
          model.set("traits", [
            { type: "text", name: "src", label: "Image URL (src)", placeholder: "Paste image link or double-click to upload", changeProp: 1 },
            { type: "text", name: "alt", label: "Alt Description", placeholder: "Accessibility description" },
            { type: "text", name: "title", label: "Hover Title", placeholder: "Image tooltip" },
          ]);
        } else if (tag === "IFRAME") {
          // IFRAME (direct embed)
          model.set("traits", [
            { type: "text", name: "src", label: "Video / Embed URL", placeholder: "Paste YouTube or Vimeo embed URL..." },
            { type: "text", name: "title", label: "Title / Description" },
          ]);
        } else if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(tag)) {
          // HEADING
          model.set("traits", [
            { type: "element-text-editor", name: "content", label: "Headline / Heading Text", placeholder: "Type your heading..." },
            { type: "text", name: "title", label: "Hover Tooltip (Title)", placeholder: "Optional mouseover tooltip" },
          ]);
        } else if (tag === "P" || tag === "BLOCKQUOTE") {
          // PARAGRAPH / BLOCKQUOTE
          model.set("traits", [
            { type: "element-text-editor", name: "content", label: "Paragraph / Content Text", placeholder: "Type your text content..." },
            { type: "text", name: "title", label: "Hover Tooltip (Title)", placeholder: "Optional mouseover tooltip" },
          ]);
        }

        // Force TraitManager to re-render
        setTimeout(() => {
          try {
            const trm = editor.TraitManager;
            const target = editor.getSelected();
            if (trm && target) trm.select(target);
          } catch (e) {}
        }, 10);
      });
      editor.on("style:custom", () => {
        setTimeout(setupNativeColorPickers, 50);
        setTimeout(setupNumericInputRestrictions, 50);
      });

      const styleContainer = document.getElementById("gjs-style-container");
      if (styleContainer) {
        setupNativeColorPickers();
        setupNumericInputRestrictions();
        const observer = new MutationObserver(() => {
          setupNativeColorPickers();
          setupNumericInputRestrictions();
        });
        observer.observe(styleContainer, { childList: true, subtree: true });
        styleContainer.addEventListener("mouseenter", () => {
          setupNativeColorPickers();
          setupNumericInputRestrictions();
        });
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

  // Sync device changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setDevice(activeDevice);
    }
  }, [activeDevice]);

  // Filter blocks by search query
  const handleSearchBlocks = (query) => {
    setSearchQuery(query);
    const container = document.getElementById("gjs-blocks-container");
    if (!container) return;

    const blocks = container.querySelectorAll(".gjs-block");
    blocks.forEach((b) => {
      const text = b.textContent.toLowerCase();
      if (!query || text.includes(query.toLowerCase())) {
        b.style.display = "flex";
      } else {
        b.style.display = "none";
      }
    });
  };

  const deviceDimensions = {
    Desktop: "1280px • Desktop Artboard",
    Tablet: "768px • Tablet Artboard",
    Mobile: "375px • Mobile Artboard",
  };

  return (
    <div className="flex h-full w-full bg-slate-100 text-slate-800 overflow-hidden select-none font-sans mtsso-studio-root relative">
      {/* ─── MAIN CANVAS WORKSPACE (FULL WIDTH ON MOBILE) ─── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        
        {/* Canvas Dimension Header Bar */}
        <div className="h-9 bg-white border-b border-slate-200 px-3 sm:px-4 flex items-center justify-between shrink-0 text-[11px] text-slate-500 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-navy truncate">
              {deviceDimensions[activeDevice] || "1280px • Artboard"}
            </span>
          </div>

          <span className="hidden md:inline text-slate-400 font-semibold truncate max-w-sm">
            Drag components from the sidebar · Click any element to edit
          </span>

          <div className="flex items-center gap-3">
            {/* Mobile / Tablet Toggle Sidebar Button */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden inline-flex items-center gap-1 text-xs font-bold text-coral bg-coral-pale px-2.5 py-1 rounded-md border border-coral/30 cursor-pointer shadow-xs"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Components</span>
            </button>

            <button
              type="button"
              onClick={onRequestClear || (() => editorRef.current?.runCommand("core:canvas-clear"))}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
              title="Clear entire canvas"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* The GrapesJS Canvas Target */}
        <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-100">
          <div id="gjs-canvas-target" className="h-full w-full" />
        </div>

        {/* Floating Mobile Studio Button (Always visible on small screens for easy access) */}
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="lg:hidden absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-navy text-white px-4 py-3 rounded-full shadow-2xl border border-white/20 font-extrabold text-xs cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <LayoutGrid className="w-4 h-4 text-coral" />
          <span>Studio Drawer</span>
        </button>
      </div>

      {/* ─── MOBILE BACKDROP (When drawer is open on screens < 1024px) ─── */}
      {mobileDrawerOpen && (
        <div
          onClick={() => setMobileDrawerOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-navy/60 backdrop-blur-xs animate-in fade-in duration-200"
        />
      )}

      {/* ─── SIDEBAR / DRAWER (Fixed on desktop >=1024px, Sliding drawer on mobile <1024px) ─── */}
      <aside
        className={`
          fixed lg:static top-0 right-0 z-50 lg:z-30 h-full w-[85vw] max-w-[340px] lg:w-80 xl:w-88
          bg-white border-l border-slate-200 flex flex-col shadow-2xl lg:shadow-sm transition-transform duration-300 ease-out
          ${mobileDrawerOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Drawer Header on Mobile */}
        <div className="p-3 border-b border-slate-200 bg-slate-50/90 flex flex-col gap-2">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-coral-pale flex items-center justify-center text-coral">
                <LayoutGrid className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black text-navy uppercase tracking-wider">
                Studio Tools
              </span>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-slate-200/60 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Tap-to-Insert Hint */}
          <div className="lg:hidden bg-coral-pale/80 border border-coral/20 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-bold text-coral">
            <span>✨</span>
            <span>Tap any block to instantly add it to your canvas!</span>
          </div>

          {/* Segmented Tab Switcher */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("blocks")}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer ${
                activeTab === "blocks"
                  ? "bg-white text-navy shadow-xs"
                  : "text-slate-600 hover:text-navy"
              }`}
              title="Drag & Drop Components"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-coral shrink-0" />
              <span>Blocks</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("styles")}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer ${
                activeTab === "styles"
                  ? "bg-white text-navy shadow-xs"
                  : "text-slate-600 hover:text-navy"
              }`}
              title="Design & Style Manager"
            >
              <Palette className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Styles</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("traits");
                setTimeout(() => {
                  try {
                    const target = editorRef.current?.getSelected();
                    if (target) {
                      editorRef.current?.TraitManager?.select(target);
                    }
                  } catch (e) {}
                }, 20);
              }}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer ${
                activeTab === "traits"
                  ? "bg-white text-navy shadow-xs"
                  : "text-slate-600 hover:text-navy"
              }`}
              title="Link URLs & Element Settings"
            >
              <Link2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Links</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("layers")}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer ${
                activeTab === "layers"
                  ? "bg-white text-navy shadow-xs"
                  : "text-slate-600 hover:text-navy"
              }`}
              title="Layer Tree"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Layers</span>
            </button>
          </div>

          {/* Search Box when Components Tab is Active */}
          {activeTab === "blocks" && (
            <div className="relative mt-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => handleSearchBlocks(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-navy placeholder-slate-400 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
              />
            </div>
          )}
        </div>

        {/* Panel Content Containers */}
        <div className="flex-1 overflow-y-auto p-3.5 custom-scrollbar bg-slate-50/30">
          {/* Blocks Container */}
          <div
            id="gjs-blocks-container"
            className={activeTab === "blocks" ? "block" : "hidden"}
          />

          {/* Styles Container */}
          <div
            id="gjs-style-container"
            className={activeTab === "styles" ? "block" : "hidden"}
          />

          {/* Traits / Links Container */}
          <div
            id="gjs-traits-container"
            className={activeTab === "traits" ? "block" : "hidden"}
          />

          {/* Layers Container */}
          <div
            id="gjs-layers-container"
            className={activeTab === "layers" ? "block" : "hidden"}
          />
        </div>
      </aside>
    </div>
  );
});

export default GrapesEditor;
