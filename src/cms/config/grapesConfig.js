/**
 * GrapesJS Studio Configuration for MTSSO
 * Clean, lightweight, modern studio with complete default values and numeric validation.
 */
export const getGrapesConfig = (containerId = "gjs-canvas-target", options = {}) => {
  const apiRoot = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  const uploadEndpoint = `${apiRoot}/upload`;

  return {
    container: `#${containerId}`,
    fromElement: false,
    height: "100%",
    width: "auto",
    storageManager: false,
    selectorManager: { componentFirst: true },

    // Custom Asset Manager to integrate with MTSSO Media Library Modal
    assetManager: {
      upload: uploadEndpoint,
      uploadName: "files",
      multiUpload: true,
      autoAdd: true,
      embedAsBase64: false,
      custom: {
        open(props) {
          if (options.onCustomAssetOpen) {
            options.onCustomAssetOpen(props);
          }
        },
        close(props) {
          if (options.onCustomAssetClose) {
            options.onCustomAssetClose(props);
          }
        },
      },
    },

    deviceManager: {
      devices: [
        {
          name: "Desktop",
          width: "",
        },
        {
          name: "Tablet",
          width: "768px",
          widthMedia: "992px",
        },
        {
          name: "Mobile",
          width: "375px",
          widthMedia: "480px",
        },
      ],
    },

    canvas: {
      styles: [],
    },

    blockManager: {
      appendTo: "#gjs-blocks-container",
    },

    // Comprehensive Style Manager with rich defaults & explicit units
    styleManager: {
      appendTo: "#gjs-style-container",
      colorPicker: false, // Use native, unbreakable OS/Browser color picker (Figma style)
      sectors: [
        // ─── 1. TYPOGRAPHY ───
        {
          name: "Typography",
          open: true,
          buildProps: [
            "font-family",
            "font-size",
            "font-weight",
            "letter-spacing",
            "color",
            "line-height",
            "text-align",
            "text-decoration",
          ],
          properties: [
            {
              property: "font-family",
              name: "Font",
              type: "select",
              defaults: "Inter, sans-serif",
              default: "Inter, sans-serif",
              options: [
                { id: "Inter, sans-serif", label: "Inter (Modern Sans)" },
                { id: "Nunito, sans-serif", label: "Nunito (MTSSO Default)" },
                { id: "system-ui, -apple-system, sans-serif", label: "System UI" },
                { id: "Georgia, serif", label: "Georgia (Editorial Serif)" },
                { id: "Playfair Display, serif", label: "Playfair Display" },
                { id: "Courier New, monospace", label: "Monospace" },
              ],
            },
            {
              property: "font-size",
              name: "Font Size",
              type: "integer",
              units: ["px", "rem", "em", "%"],
              defaults: "16px",
              default: "16px",
              min: 0,
            },
            {
              property: "font-weight",
              name: "Font Weight",
              type: "select",
              defaults: "400",
              default: "400",
              options: [
                { id: "300", label: "300 - Light" },
                { id: "400", label: "400 - Normal" },
                { id: "500", label: "500 - Medium" },
                { id: "600", label: "600 - SemiBold" },
                { id: "700", label: "700 - Bold" },
                { id: "800", label: "800 - ExtraBold" },
                { id: "900", label: "900 - Black" },
              ],
            },
            {
              property: "letter-spacing",
              name: "Letter Spacing",
              type: "integer",
              units: ["px", "em", "rem"],
              defaults: "0px",
              default: "0px",
            },
            {
              property: "color",
              name: "Text Color",
              type: "color",
              defaults: "#1e2456",
              default: "#1e2456",
            },
            {
              property: "line-height",
              name: "Line Height",
              type: "number",
              units: ["", "px", "rem", "%"],
              defaults: "1.6",
              default: "1.6",
              step: 0.1,
              min: 0,
            },
            {
              property: "text-align",
              name: "Alignment",
              type: "radio",
              defaults: "left",
              default: "left",
              options: [
                { id: "left", label: "Left" },
                { id: "center", label: "Center" },
                { id: "right", label: "Right" },
                { id: "justify", label: "Justify" },
              ],
            },
            {
              property: "text-decoration",
              name: "Decoration",
              type: "radio",
              defaults: "none",
              default: "none",
              options: [
                { id: "none", label: "None" },
                { id: "underline", label: "Underline" },
                { id: "line-through", label: "Strike" },
              ],
            },
          ],
        },

        // ─── 2. LAYOUT & FLEXBOX ───
        {
          name: "Layout & Flexbox",
          open: false,
          buildProps: [
            "display",
            "flex-direction",
            "flex-wrap",
            "justify-content",
            "align-items",
            "gap",
          ],
          properties: [
            {
              property: "display",
              name: "Display",
              type: "select",
              defaults: "block",
              default: "block",
              options: [
                { id: "block", label: "Block" },
                { id: "flex", label: "Flex" },
                { id: "inline-block", label: "Inline Block" },
                { id: "inline", label: "Inline" },
                { id: "grid", label: "Grid" },
                { id: "none", label: "Hidden (None)" },
              ],
            },
            {
              property: "flex-direction",
              name: "Direction",
              type: "select",
              defaults: "row",
              default: "row",
              options: [
                { id: "row", label: "Row (Horizontal)" },
                { id: "column", label: "Column (Vertical)" },
                { id: "row-reverse", label: "Row Reverse" },
                { id: "column-reverse", label: "Column Reverse" },
              ],
            },
            {
              property: "flex-wrap",
              name: "Wrap",
              type: "select",
              defaults: "nowrap",
              default: "nowrap",
              options: [
                { id: "nowrap", label: "No Wrap" },
                { id: "wrap", label: "Wrap" },
                { id: "wrap-reverse", label: "Wrap Reverse" },
              ],
            },
            {
              property: "justify-content",
              name: "Justify Content",
              type: "select",
              defaults: "flex-start",
              default: "flex-start",
              options: [
                { id: "flex-start", label: "Start" },
                { id: "center", label: "Center" },
                { id: "flex-end", label: "End" },
                { id: "space-between", label: "Space Between" },
                { id: "space-around", label: "Space Around" },
                { id: "space-evenly", label: "Space Evenly" },
              ],
            },
            {
              property: "align-items",
              name: "Align Items",
              type: "select",
              defaults: "stretch",
              default: "stretch",
              options: [
                { id: "stretch", label: "Stretch" },
                { id: "flex-start", label: "Start" },
                { id: "center", label: "Center" },
                { id: "flex-end", label: "End" },
                { id: "baseline", label: "Baseline" },
              ],
            },
            {
              property: "gap",
              name: "Gap",
              type: "integer",
              units: ["px", "rem", "em", "%"],
              defaults: "0px",
              default: "0px",
              min: 0,
            },
          ],
        },

        // ─── 3. DIMENSIONS & SPACING ───
        {
          name: "Dimensions & Spacing",
          open: false,
          buildProps: [
            "width",
            "max-width",
            "min-width",
            "height",
            "margin",
            "padding",
          ],
          properties: [
            {
              property: "width",
              name: "Width",
              type: "integer",
              units: ["px", "%", "vw", "auto"],
              defaults: "auto",
              default: "auto",
              min: 0,
            },
            {
              property: "max-width",
              name: "Max Width",
              type: "integer",
              units: ["px", "%", "vw", "none"],
              defaults: "none",
              default: "none",
            },
            {
              property: "min-width",
              name: "Min Width",
              type: "integer",
              units: ["px", "%", "vw"],
              defaults: "0px",
              default: "0px",
              min: 0,
            },
            {
              property: "height",
              name: "Height",
              type: "integer",
              units: ["px", "%", "vh", "auto"],
              defaults: "auto",
              default: "auto",
              min: 0,
            },
            {
              property: "min-height",
              name: "Min Height",
              type: "integer",
              units: ["px", "%", "vh"],
              defaults: "0px",
              default: "0px",
              min: 0,
            },
            {
              property: "max-height",
              name: "Max Height",
              type: "integer",
              units: ["px", "%", "vh", "none"],
              defaults: "none",
              default: "none",
            },
            {
              property: "margin",
              name: "Margin",
              properties: [
                { name: "Top", property: "margin-top", type: "integer", units: ["px", "%", "rem", "auto"], defaults: "0px" },
                { name: "Right", property: "margin-right", type: "integer", units: ["px", "%", "rem", "auto"], defaults: "0px" },
                { name: "Bottom", property: "margin-bottom", type: "integer", units: ["px", "%", "rem", "auto"], defaults: "0px" },
                { name: "Left", property: "margin-left", type: "integer", units: ["px", "%", "rem", "auto"], defaults: "0px" },
              ],
            },
            {
              property: "padding",
              name: "Padding",
              properties: [
                { name: "Top", property: "padding-top", type: "integer", units: ["px", "%", "rem"], defaults: "0px", min: 0 },
                { name: "Right", property: "padding-right", type: "integer", units: ["px", "%", "rem"], defaults: "0px", min: 0 },
                { name: "Bottom", property: "padding-bottom", type: "integer", units: ["px", "%", "rem"], defaults: "0px", min: 0 },
                { name: "Left", property: "padding-left", type: "integer", units: ["px", "%", "rem"], defaults: "0px", min: 0 },
              ],
            },
          ],
        },

        // ─── 4. BACKGROUND & COLORS ───
        {
          name: "Background & Colors",
          open: false,
          buildProps: [
            "background-color",
            "background-image",
            "background-repeat",
            "background-position",
            "background-attachment",
            "background-size",
          ],
          properties: [
            {
              property: "background-color",
              name: "Background Color",
              type: "color",
              defaults: "transparent",
              default: "transparent",
            },
            {
              property: "background-image",
              name: "Background Image",
              type: "file",
              functionName: "url",
              defaults: "none",
            },
            {
              property: "background-repeat",
              name: "Repeat",
              type: "select",
              defaults: "no-repeat",
              default: "no-repeat",
              options: [
                { id: "no-repeat", label: "No Repeat" },
                { id: "repeat", label: "Repeat Both" },
                { id: "repeat-x", label: "Repeat X" },
                { id: "repeat-y", label: "Repeat Y" },
              ],
            },
            {
              property: "background-position",
              name: "Position",
              type: "select",
              defaults: "center center",
              default: "center center",
              options: [
                { id: "center center", label: "Center" },
                { id: "top left", label: "Top Left" },
                { id: "top center", label: "Top Center" },
                { id: "top right", label: "Top Right" },
                { id: "center left", label: "Center Left" },
                { id: "center right", label: "Center Right" },
                { id: "bottom center", label: "Bottom Center" },
              ],
            },
            {
              property: "background-attachment",
              name: "Scroll Effect",
              type: "select",
              defaults: "scroll",
              default: "scroll",
              options: [
                { id: "scroll", label: "Scroll Normal" },
                { id: "fixed", label: "Fixed (Parallax Effect)" },
                { id: "local", label: "Local" },
              ],
            },
            {
              property: "background-size",
              name: "Image Sizing",
              type: "select",
              defaults: "cover",
              default: "cover",
              options: [
                { id: "cover", label: "Cover (Fill Entire Container)" },
                { id: "contain", label: "Contain (Fit Without Cropping)" },
                { id: "100% auto", label: "100% Width (Auto Height)" },
                { id: "auto 100%", label: "100% Height (Auto Width)" },
                { id: "100% 100%", label: "Stretch (100% × 100%)" },
                { id: "auto", label: "Original Resolution (Auto)" },
              ],
            },
          ],
        },

        // ─── 5. BORDERS & SHADOWS ───
        {
          name: "Borders & Shadows",
          open: false,
          buildProps: [
            "border-radius",
            "border-style",
            "border-width",
            "border-color",
            "box-shadow",
          ],
          properties: [
            {
              property: "border-radius",
              name: "Border Radius",
              properties: [
                { name: "Top Left", property: "border-top-left-radius", type: "integer", units: ["px", "%", "rem"], defaults: "0px", min: 0 },
                { name: "Top Right", property: "border-top-right-radius", type: "integer", units: ["px", "%", "rem"], defaults: "0px", min: 0 },
                { name: "Bottom Left", property: "border-bottom-left-radius", type: "integer", units: ["px", "%", "rem"], defaults: "0px", min: 0 },
                { name: "Bottom Right", property: "border-bottom-right-radius", type: "integer", units: ["px", "%", "rem"], defaults: "0px", min: 0 },
              ],
            },
            {
              property: "border-style",
              name: "Border Style",
              type: "select",
              defaults: "none",
              default: "none",
              options: [
                { id: "none", label: "None" },
                { id: "solid", label: "Solid" },
                { id: "dashed", label: "Dashed" },
                { id: "dotted", label: "Dotted" },
                { id: "double", label: "Double" },
              ],
            },
            {
              property: "border-width",
              name: "Border Width",
              type: "integer",
              units: ["px", "rem"],
              defaults: "0px",
              default: "0px",
              min: 0,
            },
            {
              property: "border-color",
              name: "Border Color",
              type: "color",
              defaults: "#e2e8f0",
              default: "#e2e8f0",
            },
            {
              property: "box-shadow",
              name: "Box Shadow",
              type: "stack",
              preview: true,
              properties: [
                { property: "box-shadow-h", name: "X", type: "integer", units: ["px"], defaults: "0px" },
                { property: "box-shadow-v", name: "Y", type: "integer", units: ["px"], defaults: "4px" },
                { property: "box-shadow-blur", name: "Blur", type: "integer", units: ["px"], defaults: "12px", min: 0 },
                { property: "box-shadow-spread", name: "Spread", type: "integer", units: ["px"], defaults: "0px" },
                { property: "box-shadow-color", name: "Color", type: "color", defaults: "rgba(0,0,0,0.08)" },
              ],
            },
          ],
        },

        // ─── 6. POSITION & EFFECTS ───
        {
          name: "Position & Effects",
          open: false,
          buildProps: [
            "position",
            "top",
            "right",
            "bottom",
            "left",
            "z-index",
            "opacity",
            "overflow",
            "cursor",
          ],
          properties: [
            {
              property: "position",
              name: "Position",
              type: "select",
              defaults: "static",
              default: "static",
              options: [
                { id: "static", label: "Static (Default)" },
                { id: "relative", label: "Relative" },
                { id: "absolute", label: "Absolute" },
                { id: "fixed", label: "Fixed" },
                { id: "sticky", label: "Sticky" },
              ],
            },
            {
              property: "top",
              name: "Top",
              type: "integer",
              units: ["px", "%", "vh", "auto"],
              defaults: "auto",
              default: "auto",
            },
            {
              property: "right",
              name: "Right",
              type: "integer",
              units: ["px", "%", "vw", "auto"],
              defaults: "auto",
              default: "auto",
            },
            {
              property: "bottom",
              name: "Bottom",
              type: "integer",
              units: ["px", "%", "vh", "auto"],
              defaults: "auto",
              default: "auto",
            },
            {
              property: "left",
              name: "Left",
              type: "integer",
              units: ["px", "%", "vw", "auto"],
              defaults: "auto",
              default: "auto",
            },
            {
              property: "z-index",
              name: "Z-Index",
              type: "integer",
              defaults: "1",
              default: "1",
              min: 0,
            },
            {
              property: "opacity",
              name: "Opacity",
              type: "number",
              defaults: "1",
              default: "1",
              min: 0,
              max: 1,
              step: 0.05,
            },
            {
              property: "overflow",
              name: "Overflow",
              type: "select",
              defaults: "visible",
              default: "visible",
              options: [
                { id: "visible", label: "Visible" },
                { id: "hidden", label: "Hidden (Clip)" },
                { id: "scroll", label: "Scroll" },
                { id: "auto", label: "Auto" },
              ],
            },
            {
              property: "cursor",
              name: "Cursor",
              type: "select",
              defaults: "auto",
              default: "auto",
              options: [
                { id: "auto", label: "Auto" },
                { id: "pointer", label: "Pointer (Clickable)" },
                { id: "default", label: "Default" },
                { id: "move", label: "Move" },
                { id: "not-allowed", label: "Not Allowed" },
              ],
            },
          ],
        },
      ],
    },

    layerManager: {
      appendTo: "#gjs-layers-container",
    },

    traitManager: {
      appendTo: "#gjs-traits-container",
    },

    panels: {
      defaults: [],
    },
  };
};
