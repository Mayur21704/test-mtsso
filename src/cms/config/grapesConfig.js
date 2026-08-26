/**
 * GrapesJS Studio Configuration for MTSSO
 * Defines viewports, panels, canvas styles, and editor behavior.
 */
export const getGrapesConfig = (containerId = "gjs-editor") => ({
  container: `#${containerId}`,
  fromElement: false,
  height: "100%",
  width: "auto",
  storageManager: false, // Managed by React & REST API
  selectorManager: { componentFirst: true },
  
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
    styles: [
      "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300..900;1,300..900&display=swap",
      `
      * { box-sizing: border-box; }
      body {
        font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #2d3580;
        background-color: #ffffff;
        margin: 0;
        padding: 30px 20px;
        line-height: 1.65;
      }
      a { color: #e05a2b; text-decoration: none; font-weight: bold; }
      img { max-width: 100%; height: auto; display: block; border-radius: 12px; }
      `,
    ],
  },

  blockManager: {
    appendTo: "#gjs-blocks-container",
  },

  styleManager: {
    appendTo: "#gjs-style-container",
    sectors: [
      {
        name: "Typography",
        open: true,
        buildProps: [
          "font-family",
          "font-size",
          "font-weight",
          "color",
          "line-height",
          "text-align",
          "text-decoration",
        ],
      },
      {
        name: "Dimensions & Layout",
        open: false,
        buildProps: ["width", "max-width", "height", "margin", "padding", "display", "flex-direction", "justify-content", "align-items"],
      },
      {
        name: "Colors & Background",
        open: false,
        buildProps: ["background-color", "background-image", "border-radius", "border", "box-shadow"],
      },
      {
        name: "Extra",
        open: false,
        buildProps: ["opacity", "overflow", "cursor"],
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
});
