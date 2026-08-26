/**
 * Custom MTSSO Drag-and-Drop Blocks for GrapesJS
 * Inspired by WordPress Gutenberg & modern editorial newsrooms.
 * Clean, rich, 100% responsive micro-cards with bold titles on white cards.
 */
export const registerCustomBlocks = (editor) => {
  const bm = editor.BlockManager;
  const domComps = editor.DomComponents;

  // ─── 1. VIDEO COMPONENT WITH AUTO-CONVERTING YOUTUBE/VIMEO TRAITS ───
  domComps.addType("mtsso-video", {
    isComponent: (el) => el.getAttribute?.("data-mtsso-type") === "video-embed",
    model: {
      defaults: {
        tagName: "div",
        attributes: { "data-mtsso-type": "video-embed" },
        traits: [
          {
            type: "text",
            name: "video_url",
            label: "YouTube / Video URL",
            placeholder: "Paste YouTube link (e.g. https://www.youtube.com/watch?v=...)",
            changeProp: 1,
          },
          {
            type: "select",
            name: "ratio",
            label: "Aspect Ratio",
            options: [
              { id: "56.25%", name: "16:9 (Standard Widescreen)" },
              { id: "75%", name: "4:3 (Classic)" },
              { id: "100%", name: "1:1 (Square)" },
            ],
            changeProp: 1,
          },
        ],
        video_url: "",
        ratio: "56.25%",
      },
      init() {
        // When loaded from saved HTML, extract existing iframe or video src so traits are preserved!
        const existingIframe = this.find("iframe")[0];
        const existingVideo = this.find("video")[0];
        if (existingVideo) {
          const rawSrc = existingVideo.getAttributes()?.src || "";
          if (rawSrc && !this.get("video_url")) {
            this.set("video_url", rawSrc, { silent: true });
          }
        } else if (existingIframe) {
          const rawSrc = existingIframe.getAttributes()?.src || "";
          if (rawSrc && !this.get("video_url")) {
            this.set("video_url", rawSrc, { silent: true });
          }
        }
        this.on("change:video_url", this.updateVideo);
        this.on("change:ratio", this.updateVideo);

        // If it has no children yet (newly dragged block), render initial view
        if (this.components().length === 0) {
          this.updateVideo();
        }
      },
      updateVideo() {
        let url = this.get("video_url") || "";
        const ratio = this.get("ratio") || "56.25%";

        if (!url) {
          this.components(`
            <div style="margin: 28px 0; border: 2px dashed #cbd5e1; border-radius: 16px; padding: 36px 20px; text-align: center; background-color: #f8fafc;">
              <div style="font-size: 28px; margin-bottom: 8px;">🎥</div>
              <div style="color: #1e2456; font-size: 15px; font-weight: 800; margin-bottom: 4px;">Video Player / Embed</div>
              <p style="color: #64748b; font-size: 13px; margin: 0 auto; max-width: 440px;">
                Select this block and enter your <strong>Uploaded Video URL, YouTube, or Vimeo link</strong> in the <strong>🔗 Links</strong> tab.
              </p>
            </div>
          `);
        } else {
          const isDirectVideo = /\.(mp4|webm|ogg|mov|m4v|avi|mkv)($|\?)/i.test(url) || (url.includes("/uploads/") && !url.includes("youtube") && !url.includes("vimeo"));
          
          if (isDirectVideo) {
            this.components(`
              <div style="position: relative; padding-bottom: ${ratio}; height: 0; overflow: hidden; max-width: 100%; border-radius: 16px; margin: 24px 0; box-shadow: 0 4px 14px rgba(0,0,0,0.08); background-color: #000000;">
                <video src="${url}" controls style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; background: #000000; border-radius: 16px;"></video>
              </div>
            `);
          } else {
            if (url.includes("youtube.com/watch?v=")) {
              const id = url.split("v=")[1]?.split("&")[0];
              if (id) url = `https://www.youtube.com/embed/${id}`;
            } else if (url.includes("youtu.be/")) {
              const id = url.split("youtu.be/")[1]?.split("?")[0];
              if (id) url = `https://www.youtube.com/embed/${id}`;
            } else if (url.includes("vimeo.com/")) {
              const id = url.split("vimeo.com/")[1]?.split("?")[0];
              if (id && !url.includes("player.vimeo.com")) url = `https://player.vimeo.com/video/${id}`;
            }

            this.components(`
              <div style="position: relative; padding-bottom: ${ratio}; height: 0; overflow: hidden; max-width: 100%; border-radius: 16px; margin: 24px 0; box-shadow: 0 4px 14px rgba(0,0,0,0.08); background-color: #000000;">
                <iframe src="${url}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
              </div>
            `);
          }
        }
      },
    },
  });

  // ─── 2. EMBEDDED PDF DOCUMENT VIEWER COMPONENT ───
  domComps.addType("mtsso-pdf-embed", {
    isComponent: (el) => el.getAttribute?.("data-mtsso-type") === "pdf-embed",
    model: {
      defaults: {
        tagName: "div",
        attributes: { "data-mtsso-type": "pdf-embed" },
        traits: [
          {
            type: "text",
            name: "pdf_url",
            label: "PDF Document URL",
            placeholder: "Paste PDF link (e.g. /uploads/guide.pdf)",
            changeProp: 1,
          },
          {
            type: "select",
            name: "pdf_height",
            label: "Viewer Height",
            options: [
              { id: "500px", name: "Compact (500px)" },
              { id: "650px", name: "Standard (650px)" },
              { id: "850px", name: "Large (850px)" },
              { id: "100vh", name: "Full Screen Height (100vh)" },
            ],
            changeProp: 1,
          },
        ],
        pdf_url: "",
        pdf_height: "650px",
      },
      init() {
        // When loaded from saved HTML, extract existing URL & height so traits are preserved!
        const existingIframe = this.find("iframe")[0];
        if (existingIframe) {
          const rawSrc = existingIframe.getAttributes()?.src || "";
          const cleanSrc = rawSrc.replace("#toolbar=1", "").trim();
          if (cleanSrc && !this.get("pdf_url")) {
            this.set("pdf_url", cleanSrc, { silent: true });
          }
        }
        this.on("change:pdf_url", this.updatePdf);
        this.on("change:pdf_height", this.updatePdf);

        // If it has no children yet (newly dragged block), render initial view
        if (this.components().length === 0) {
          this.updatePdf();
        }
      },
      updatePdf() {
        const url = this.get("pdf_url") || "";
        const height = this.get("pdf_height") || "650px";

        if (!url) {
          this.components(`
            <div style="margin: 28px 0; border: 2px dashed #cbd5e1; border-radius: 14px; padding: 32px 20px; text-align: center; background-color: #f8fafc;">
              <div style="font-size: 28px; margin-bottom: 8px;">📄</div>
              <div style="color: #1e2456; font-size: 15px; font-weight: 800; margin-bottom: 4px;">Embedded PDF Viewer</div>
              <p style="color: #64748b; font-size: 13px; margin: 0 auto; max-width: 420px;">
                Please select this block and paste your <strong>PDF Document URL</strong> in the <strong>🔗 Links</strong> tab.
              </p>
            </div>
          `);
        } else {
          const embedSrc = url.includes("#") ? url : `${url}#toolbar=1`;
          this.components(`
            <div style="margin: 28px 0; border: 1px solid #cbd5e1; border-radius: 14px; overflow: hidden; background-color: #f8fafc; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
              <div style="background-color: #1e2456; color: #ffffff; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; font-weight: 800;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span>📄</span>
                  <span>Interactive PDF Document Viewer</span>
                </div>
                <a href="${url}" target="_blank" style="color: #ffffff; background-color: #e05a2b; padding: 4px 12px; border-radius: 6px; text-decoration: none; font-size: 11px; font-weight: 800;">Open External ↗</a>
              </div>
              <iframe src="${embedSrc}" style="width: 100%; height: ${height}; border: none; display: block;" title="Embedded PDF Viewer"></iframe>
            </div>
          `);
        }
      },
    },
  });

  // ─── 3. IFRAME COMPONENT TRAITS (FOR VIDEO & EMBEDS) ───
  domComps.addType("iframe", {
    isComponent: (el) => el.tagName === "IFRAME",
    model: {
      defaults: {
        traits: [
          {
            type: "text",
            name: "src",
            label: "Video / Embed URL",
            placeholder: "Paste YouTube or Vimeo URL...",
          },
          {
            type: "text",
            name: "title",
            label: "Title / Description",
          },
        ],
      },
    },
  });

  // ─── 4. IMAGE COMPONENT WITH DIRECT SRC TRAIT ───
  domComps.addType("image", {
    isComponent: (el) => el.tagName === "IMG",
    model: {
      defaults: {
        traits: [
          {
            type: "text",
            name: "src",
            label: "Image URL (src)",
            placeholder: "https://... or upload via Media button",
            changeProp: 1,
          },
          {
            type: "text",
            name: "alt",
            label: "Alt Description",
            placeholder: "Accessibility description",
          },
          {
            type: "text",
            name: "title",
            label: "Hover Title",
            placeholder: "Image tooltip",
          },
        ],
      },
      init() {
        this.on("change:src", () => {
          const src = this.get("src");
          if (src) {
            this.addAttributes({ src });
          }
        });
      },
    },
  });

  // ─── CUSTOM TRAIT TYPE: LIVE BUTTON / LINK TITLE EDITOR ───
  try {
    editor.TraitManager.addType("link-title-editor", {
      createInput({ trait }) {
        const el = document.createElement("input");
        el.type = "text";
        el.placeholder = trait.get("placeholder") || "e.g. Button Label...";
        el.style.cssText =
          "width:100%;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#1e2456;font-weight:700;font-size:12px;padding:8px 10px;box-sizing:border-box;outline:none;";
        return el;
      },
      onUpdate({ component, elInput }) {
        if (!component || !elInput) return;
        // Populate input with the current button text
        const text = component.view?.el?.innerText || "";
        elInput.value = text.trim();
        // Attach live input listener — typing immediately updates the button text on canvas
        elInput.oninput = () => {
          component.components(elInput.value);
        };
      },
    });

    editor.TraitManager.addType("element-text-editor", {
      createInput({ trait }) {
        const el = document.createElement("textarea");
        el.rows = 3;
        el.placeholder = trait.get("placeholder") || "Type text here...";
        el.style.cssText =
          "width:100%;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#1e2456;font-weight:700;font-size:12px;padding:8px 10px;box-sizing:border-box;outline:none;font-family:inherit;resize:vertical;";
        return el;
      },
      onUpdate({ component, elInput }) {
        if (!component || !elInput) return;
        const text = component.view?.el?.innerText || "";
        elInput.value = text.trim();
        elInput.oninput = () => {
          component.components(elInput.value);
        };
      },
    });
  } catch (e) {
    // Type already registered
  }

  // ─── 5. LINKS & BUTTONS TRAITS ───
  domComps.addType("link", {
    isComponent: (el) => el.tagName === "A",
    model: {
      defaults: {
        tagName: "a",
        droppable: false,
        traits: [
          {
            type: "link-title-editor",
            name: "link_text",
            label: "Button / Link Text",
            placeholder: "e.g. Contact Station →",
          },
          {
            type: "text",
            name: "href",
            label: "Link URL / PDF URL",
            placeholder: "https://... or /contact or /file.pdf",
          },
          {
            type: "select",
            name: "target",
            label: "Open In",
            options: [
              { id: "_blank", name: "New Tab (Recommended for PDFs)" },
              { id: "_self", name: "Same Window" },
            ],
          },
          {
            type: "text",
            name: "title",
            label: "Hover Tooltip (Title)",
            placeholder: "Optional hover description tooltip",
          },
        ],
      },
    },
  });

  // Helper to render clean 2-column block card
  const createBlockCard = (iconSvg, title, badgeColor = "#e05a2b", badgeBg = "#fdf2ee") => `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 6px; width: 100%;">
      <div style="width: 32px; height: 32px; border-radius: 8px; background: ${badgeBg}; border: 1px solid rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center; color: ${badgeColor};">
        ${iconSvg}
      </div>
      <span style="font-size: 11.5px; font-weight: 800; color: #1e2456; line-height: 1.2; text-align: center;">
        ${title}
      </span>
    </div>
  `;

  // ═══════════════════════════════════════════════════════════
  // ─── 1. EDITORIAL & STORY ───
  // ═══════════════════════════════════════════════════════════
  bm.add("mtsso-hero-header", {
    id: "mtsso-hero-header",
    attributes: { "data-block-id": "mtsso-hero-header" },
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`,
      "Article Header",
      "#e05a2b",
      "#fdf2ee"
    ),
    category: "Editorial & Story",
    content: `
      <div style="text-align: center; max-width: 820px; margin: 15px auto 40px auto; padding: 24px 16px;">
        <span style="display: inline-block; background-color: #fdf2ee; color: #e05a2b; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; padding: 5px 16px; border-radius: 999px; margin-bottom: 14px; border: 1px solid rgba(224, 90, 43, 0.2);">
          Station Dispatch
        </span>
        <h1 style="color: #1e2456; font-size: 2.5rem; font-weight: 900; line-height: 1.2; margin: 0 0 16px 0; letter-spacing: -0.02em;">
          Headline Title for This Port Story
        </h1>
        <p style="color: #64748b; font-size: 1.15rem; font-weight: 500; line-height: 1.6; margin: 0 auto; max-width: 660px;">
          A captivating introductory overview summarizing ship visits, port hospitality, crew welfare, or community milestones.
        </p>
        <div style="width: 64px; height: 3px; background-color: #e05a2b; border-radius: 2px; margin: 24px auto 0 auto;"></div>
      </div>
    `,
  });

  bm.add("mtsso-quote-callout", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>`,
      "Chaplain Quote",
      "#0284c7",
      "#f0f9ff"
    ),
    category: "Editorial & Story",
    content: `
      <div style="background-color: #f7f4f1; border-left: 5px solid #e05a2b; border-radius: 0 16px 16px 0; padding: 26px 30px; margin: 32px 0;">
        <p style="color: #1e2456; font-size: 1.2rem; font-weight: 700; line-height: 1.65; margin: 0 0 16px 0; font-style: italic;">
          “When a seafarer steps off the gangway after weeks in rough waters, a warm welcome, reliable connectivity, and genuine pastoral support bring immense comfort.”
        </p>
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 42px; height: 42px; border-radius: 50%; background-color: #2d3580; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: bold;">
            ⚓
          </div>
          <div>
            <div style="color: #1e2456; font-weight: 800; font-size: 14px; line-height: 1.2;">Rev. Judith Alltree</div>
            <div style="color: #e05a2b; font-size: 12px; font-weight: 700; line-height: 1.2; margin-top: 3px;">Station Chaplain & Regional Team</div>
          </div>
        </div>
      </div>
    `,
  });

  bm.add("mtsso-author-bio", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      "Author Bio Card",
      "#4f46e5",
      "#eef2ff"
    ),
    category: "Editorial & Story",
    content: `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 32px 0; display: flex; flex-wrap: wrap; align-items: center; gap: 18px;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background-color: #2d3580; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; shrink-0; border: 3px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          ⚓
        </div>
        <div style="flex: 1 1 240px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <h4 style="color: #1e2456; font-size: 1.05rem; font-weight: 800; margin: 0;">MTSSO Editorial Team</h4>
            <span style="background-color: #fdf2ee; color: #e05a2b; font-size: 10.5px; font-weight: 800; padding: 2px 8px; border-radius: 999px;">Verified Station</span>
          </div>
          <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 0;">
            Serving seafarers across Southern Ontario ports with ship visits, pastoral care, practical assistance, and hospital transport.
          </p>
        </div>
      </div>
    `,
  });

  bm.add("mtsso-stat-card", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
      "Port Stat Grid",
      "#d97706",
      "#fffbeb"
    ),
    category: "Editorial & Story",
    content: `
      <div style="background-color: #f8fafc; border-radius: 16px; padding: 28px 20px; margin: 32px 0; text-align: center; border: 1px solid #e2e8f0;">
        <h3 style="color: #1e2456; font-size: 1.15rem; font-weight: 800; margin: 0 0 20px 0;">Port Station Highlights</h3>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;">
          <div style="flex: 1 1 160px; background-color: #ffffff; padding: 18px 12px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
            <div style="color: #e05a2b; font-size: 2rem; font-weight: 900; line-height: 1;">120+</div>
            <div style="color: #1e2456; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-top: 6px; letter-spacing: 0.05em;">Vessels Visited</div>
          </div>
          <div style="flex: 1 1 160px; background-color: #ffffff; padding: 18px 12px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
            <div style="color: #e05a2b; font-size: 2rem; font-weight: 900; line-height: 1;">1,400+</div>
            <div style="color: #1e2456; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-top: 6px; letter-spacing: 0.05em;">Seafarers Assisted</div>
          </div>
          <div style="flex: 1 1 160px; background-color: #ffffff; padding: 18px 12px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
            <div style="color: #e05a2b; font-size: 2rem; font-weight: 900; line-height: 1;">350+</div>
            <div style="color: #1e2456; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-top: 6px; letter-spacing: 0.05em;">Parcels Delivered</div>
          </div>
        </div>
      </div>
    `,
  });

  bm.add("mtsso-alert-box", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
      "Notice Box",
      "#ea580c",
      "#fff7ed"
    ),
    category: "Editorial & Story",
    content: `
      <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-left: 5px solid #f59e0b; border-radius: 12px; padding: 18px 22px; margin: 26px 0; display: flex; gap: 14px; align-items: flex-start;">
        <span style="font-size: 20px; line-height: 1;">⚠️</span>
        <div>
          <h4 style="color: #92400e; font-size: 1rem; font-weight: 800; margin: 0 0 4px 0;">Port Station Notice</h4>
          <p style="color: #78350f; font-size: 0.95rem; margin: 0; line-height: 1.6;">
            Transportation bookings and parcel delivery confirmations can be coordinated with our duty chaplain ahead of vessel berthing.
          </p>
        </div>
      </div>
    `,
  });

  bm.add("mtsso-faq-accordion", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
      "FAQ / Info Drop",
      "#0284c7",
      "#f0f9ff"
    ),
    category: "Editorial & Story",
    content: `
      <div style="margin: 24px 0; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; background-color: #ffffff;">
        <details style="padding: 16px 20px; cursor: pointer;">
          <summary style="font-weight: 800; font-size: 14.5px; color: #1e2456; outline: none; list-style: none; display: flex; justify-content: space-between; align-items: center;">
            <span>How can ships request chaplain visits or van transit?</span>
            <span style="color: #e05a2b; font-size: 16px; font-weight: 900;">▾</span>
          </summary>
          <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #f1f5f9; color: #64748b; font-size: 13.5px; line-height: 1.6;">
            Captains and crew can contact the port duty chaplain directly by phone or VHF before docking. We coordinate ground transportation to shopping centers, medical appointments, and SIM card provision.
          </div>
        </details>
      </div>
    `,
  });

  bm.add("mtsso-key-takeaways", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
      "Key Takeaways",
      "#059669",
      "#ecfdf5"
    ),
    category: "Editorial & Story",
    content: `
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-left: 5px solid #16a34a; border-radius: 14px; padding: 22px 26px; margin: 28px 0;">
        <h4 style="color: #166534; font-size: 1.1rem; font-weight: 800; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
          <span>✓</span> Key Story Takeaways
        </h4>
        <ul style="color: #14532d; font-size: 0.95rem; line-height: 1.7; margin: 0; padding-left: 18px;">
          <li style="margin-bottom: 6px;">Chaplaincy support delivered directly on vessel gangways.</li>
          <li style="margin-bottom: 6px;">Over 1,400 seafarers supported across Lake Ontario ports.</li>
          <li>Free high-speed SIM cards and phone calling cards distributed.</li>
        </ul>
      </div>
    `,
  });

  bm.add("mtsso-table", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>`,
      "Data / Schedule Table",
      "#0284c7",
      "#f0f9ff"
    ),
    category: "Editorial & Story",
    content: `
      <div style="margin: 28px 0; overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <thead>
            <tr style="background-color: #1e2456; color: #ffffff;">
              <th style="padding: 12px 16px; font-weight: 800;">Station Port</th>
              <th style="padding: 12px 16px; font-weight: 800;">Duty Chaplain</th>
              <th style="padding: 12px 16px; font-weight: 800;">Van Transit</th>
              <th style="padding: 12px 16px; font-weight: 800;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0; background-color: #ffffff;">
              <td style="padding: 12px 16px; font-weight: 800; color: #1e2456;">Port of Toronto</td>
              <td style="padding: 12px 16px; color: #475569;">Rev. Judith Alltree</td>
              <td style="padding: 12px 16px; color: #475569;">Available Daily</td>
              <td style="padding: 12px 16px;"><span style="background-color: #ecfdf5; color: #059669; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 999px;">Active</span></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
              <td style="padding: 12px 16px; font-weight: 800; color: #1e2456;">Port of Hamilton</td>
              <td style="padding: 12px 16px; color: #475569;">Hamilton Team</td>
              <td style="padding: 12px 16px; color: #475569;">On-Call Berthing</td>
              <td style="padding: 12px 16px;"><span style="background-color: #ecfdf5; color: #059669; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 999px;">Active</span></td>
            </tr>
            <tr style="background-color: #ffffff;">
              <td style="padding: 12px 16px; font-weight: 800; color: #1e2456;">Port Colborne</td>
              <td style="padding: 12px 16px; color: #475569;">Welland Canal Staff</td>
              <td style="padding: 12px 16px; color: #475569;">Canal Locks Coord</td>
              <td style="padding: 12px 16px;"><span style="background-color: #ecfdf5; color: #059669; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 999px;">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  });

  // ═══════════════════════════════════════════════════════════
  // ─── 2. MEDIA & DOCUMENTS ───
  // ═══════════════════════════════════════════════════════════
  bm.add("elem-photo", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
      "Photo / Image",
      "#db2777",
      "#fdf2f8"
    ),
    category: "Media & Documents",
    content: {
      type: "image",
      style: { width: "100%", "border-radius": "14px", margin: "20px 0", display: "block" },
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
      alt: "Port vessel activity",
    },
  });

  bm.add("elem-gallery", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 14l4-4 4 4"/><path d="M14 11l3-3 4 4"/></svg>`,
      "2-Photo Grid",
      "#db2777",
      "#fdf2f8"
    ),
    category: "Media & Documents",
    content: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin: 28px 0;">
        <div style="flex: 1 1 280px;">
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" alt="Ship Visit" style="width: 100%; height: 220px; object-fit: cover; border-radius: 12px; display: block;" />
        </div>
        <div style="flex: 1 1 280px;">
          <img src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80" alt="Port Station" style="width: 100%; height: 220px; object-fit: cover; border-radius: 12px; display: block;" />
        </div>
      </div>
    `,
  });

  bm.add("elem-media-text", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="18" x="3" y="3" rx="2"/><path d="M15 6h6"/><path d="M15 12h6"/><path d="M15 18h6"/></svg>`,
      "Photo + Text Split",
      "#db2777",
      "#fdf2f8"
    ),
    category: "Media & Documents",
    content: `
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 24px; margin: 32px 0;">
        <div style="flex: 1 1 300px;">
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" alt="Port Vessel" style="width: 100%; border-radius: 14px; display: block;" />
        </div>
        <div style="flex: 1 1 300px;">
          <span style="color: #e05a2b; font-size: 11px; font-weight: 800; text-transform: uppercase;">On-Board Ministry</span>
          <h3 style="color: #1e2456; font-size: 1.35rem; font-weight: 900; margin: 6px 0 10px 0;">Vessel Hospitality</h3>
          <p style="color: #475569; font-size: 0.95rem; line-height: 1.65; margin: 0 0 16px 0;">
            Our chaplains visit international cargo vessels berthed in Southern Ontario, providing free international SIM cards, warm winter gear, and listening ears.
          </p>
          <a href="/contact" style="color: #e05a2b; font-weight: 800; font-size: 13px; text-decoration: none;">Learn more about ship visits →</a>
        </div>
      </div>
    `,
  });

  bm.add("elem-video", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
      "Video Embed",
      "#dc2626",
      "#fef2f2"
    ),
    category: "Media & Documents",
    content: {
      type: "mtsso-video",
    },
  });

  bm.add("mtsso-doc-download", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>`,
      "PDF Document Card",
      "#059669",
      "#ecfdf5"
    ),
    category: "Media & Documents",
    content: `
      <div style="background-color: #ffffff; border: 2px dashed #cbd5e1; border-radius: 14px; padding: 20px 24px; margin: 28px 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background-color: #fdf2ee; color: #e05a2b; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; border: 1px solid rgba(224,90,43,0.2);">
            📄
          </div>
          <div>
            <div style="color: #1e2456; font-size: 14.5px; font-weight: 800;">Official Port Document (PDF)</div>
            <div style="color: #64748b; font-size: 12px; font-weight: 600;">Seafarer Welfare Guide & Station Directory</div>
          </div>
        </div>
        <a href="" target="_blank" style="background-color: #2d3580; color: #ffffff; padding: 10px 22px; border-radius: 8px; font-size: 12.5px; font-weight: 800; text-decoration: none; display: inline-block;">
          Download PDF ↓
        </a>
      </div>
    `,
  });

  bm.add("elem-pdf-viewer", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="9" y2="9"/></svg>`,
      "Embed PDF Viewer",
      "#059669",
      "#ecfdf5"
    ),
    category: "Media & Documents",
    content: {
      type: "mtsso-pdf-embed",
    },
  });

  // ═══════════════════════════════════════════════════════════
  // ─── 3. BUTTONS & ACTIONS ───
  // ═══════════════════════════════════════════════════════════
  bm.add("elem-button-coral", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="6" rx="3"/><path d="M8 12h8"/></svg>`,
      "Coral Action Button",
      "#e05a2b",
      "#fdf2ee"
    ),
    category: "Buttons & Actions",
    content: `<a href="/contact" style="display: inline-block; background-color: #e05a2b; color: #ffffff; font-size: 13.5px; font-weight: 800; padding: 12px 26px; border-radius: 10px; text-decoration: none; margin: 16px 0; box-shadow: 0 4px 14px rgba(224, 90, 43, 0.25);">Contact Station →</a>`,
  });

  bm.add("elem-button-navy", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="6" rx="3"/><path d="M8 12h8"/></svg>`,
      "Navy Action Button",
      "#2d3580",
      "#f1f5f9"
    ),
    category: "Buttons & Actions",
    content: `<a href="/donate" style="display: inline-block; background-color: #2d3580; color: #ffffff; font-size: 13.5px; font-weight: 800; padding: 12px 26px; border-radius: 10px; text-decoration: none; margin: 16px 0;">Support Mission</a>`,
  });

  bm.add("elem-button-outline", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="6" rx="3"/></svg>`,
      "Outline Ghost Button",
      "#64748b",
      "#f8fafc"
    ),
    category: "Buttons & Actions",
    content: `<a href="/stories" style="display: inline-block; background-color: transparent; border: 2px solid #2d3580; color: #2d3580; font-size: 13px; font-weight: 800; padding: 10px 24px; border-radius: 10px; text-decoration: none; margin: 16px 0;">Explore Port Stories →</a>`,
  });

  bm.add("elem-dual-buttons", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="10" x="3" y="7" rx="2"/><rect width="8" height="10" x="13" y="7" rx="2"/></svg>`,
      "Dual Button Group",
      "#e05a2b",
      "#fdf2ee"
    ),
    category: "Buttons & Actions",
    content: `
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 14px; margin: 24px 0;">
        <a href="/donate" style="display: inline-block; background-color: #e05a2b; color: #ffffff; font-size: 13.5px; font-weight: 800; padding: 12px 24px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(224,90,43,0.25);">
          Support Mission
        </a>
        <a href="/contact" style="display: inline-block; background-color: transparent; border: 2px solid #cbd5e1; color: #1e2456; font-size: 13px; font-weight: 800; padding: 10px 22px; border-radius: 10px; text-decoration: none;">
          Contact Chaplain
        </a>
      </div>
    `,
  });

  bm.add("elem-text-link", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      "Text Link with Arrow",
      "#0284c7",
      "#f0f9ff"
    ),
    category: "Buttons & Actions",
    content: `<a href="/stories" style="color: #e05a2b; font-weight: 800; font-size: 14px; text-decoration: none; display: inline-block; margin: 14px 0;">Read more about our port missions →</a>`,
  });

  bm.add("mtsso-helpline-card", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
      "Port Helpline Box",
      "#dc2626",
      "#fef2f2"
    ),
    category: "Buttons & Actions",
    content: `
      <div style="background: linear-gradient(135deg, #1e2456 0%, #2d3580 100%); border-radius: 16px; padding: 24px; color: #ffffff; margin: 28px 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
        <div>
          <span style="background-color: #ef4444; color: #ffffff; font-size: 10.5px; font-weight: 800; padding: 3px 10px; border-radius: 999px; text-transform: uppercase;">24/7 Port Helpline</span>
          <h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 800; margin: 8px 0 4px 0;">Urgent Seafarer Assistance</h3>
          <p style="color: #cbd5e1; font-size: 13px; margin: 0;">Call duty chaplain or hail local port station directly.</p>
        </div>
        <a href="tel:+14164634232" style="background-color: #e05a2b; color: #ffffff; font-weight: 800; font-size: 13.5px; padding: 12px 22px; border-radius: 10px; text-decoration: none; display: inline-block;">
          📞 Call (416) 463-4232
        </a>
      </div>
    `,
  });

  bm.add("mtsso-donate-card", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
      "Support & Donate",
      "#e05a2b",
      "#fdf2ee"
    ),
    category: "Buttons & Actions",
    content: `
      <div style="background-color: #fdf2ee; border: 2px solid #fed7aa; border-radius: 16px; padding: 26px; margin: 30px 0; text-align: center;">
        <h3 style="color: #1e2456; font-size: 1.3rem; font-weight: 900; margin: 0 0 8px 0;">Support Our Seafarers Mission</h3>
        <p style="color: #7c2d12; font-size: 0.95rem; max-width: 580px; margin: 0 auto 18px auto; line-height: 1.6;">
          Your tax-deductible gift helps provide winter care packages, station transportation, and warm hospitality to visiting crews.
        </p>
        <a href="/donate" style="background-color: #e05a2b; color: #ffffff; font-weight: 800; font-size: 13.5px; padding: 12px 28px; border-radius: 10px; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(224, 90, 43, 0.25);">
          Give to MTSSO Today →
        </a>
      </div>
    `,
  });

  // ═══════════════════════════════════════════════════════════
  // ─── 4. LAYOUT STACKS ───
  // ═══════════════════════════════════════════════════════════
  bm.add("grid-1-col", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>`,
      "1 Column Stack",
      "#7c3aed",
      "#f5f3ff"
    ),
    category: "Layout Stacks",
    content: `<div style="max-width: 820px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 12px;"><p style="color: #334155; margin: 0; line-height: 1.7;">Full-width stack container. Insert text, quotes, or media here.</p></div>`,
  });

  bm.add("grid-2-col", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="18" x="3" y="3" rx="1"/><rect width="7" height="18" x="14" y="3" rx="1"/></svg>`,
      "2 Columns Split",
      "#7c3aed",
      "#f5f3ff"
    ),
    category: "Layout Stacks",
    content: `
      <div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 28px 0;">
        <div style="flex: 1 1 300px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="color: #1e2456; margin-top: 0; font-size: 1.1rem; font-weight: 800;">Left Column</h3>
          <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6;">Add narrative, images, or details in this column.</p>
        </div>
        <div style="flex: 1 1 300px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="color: #1e2456; margin-top: 0; font-size: 1.1rem; font-weight: 800;">Right Column</h3>
          <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6;">Add complementary info, photos, or data here.</p>
        </div>
      </div>
    `,
  });

  bm.add("grid-3-col", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="18" x="3" y="3" rx="1"/><rect width="4" height="18" x="10" y="3" rx="1"/><rect width="4" height="18" x="17" y="3" rx="1"/></svg>`,
      "3 Columns Grid",
      "#7c3aed",
      "#f5f3ff"
    ),
    category: "Layout Stacks",
    content: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin: 28px 0;">
        <div style="flex: 1 1 200px; padding: 18px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
          <h4 style="color: #1e2456; font-weight: 800; margin: 0 0 6px 0;">Feature 1</h4>
          <p style="color: #64748b; font-size: 13px; margin: 0; line-height: 1.5;">Brief descriptive text.</p>
        </div>
        <div style="flex: 1 1 200px; padding: 18px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
          <h4 style="color: #1e2456; font-weight: 800; margin: 0 0 6px 0;">Feature 2</h4>
          <p style="color: #64748b; font-size: 13px; margin: 0; line-height: 1.5;">Brief descriptive text.</p>
        </div>
        <div style="flex: 1 1 200px; padding: 18px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
          <h4 style="color: #1e2456; font-weight: 800; margin: 0 0 6px 0;">Feature 3</h4>
          <p style="color: #64748b; font-size: 13px; margin: 0; line-height: 1.5;">Brief descriptive text.</p>
        </div>
      </div>
    `,
  });

  bm.add("grid-card", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="3"/><path d="M2 10h20"/></svg>`,
      "Elevated Card",
      "#7c3aed",
      "#f5f3ff"
    ),
    category: "Layout Stacks",
    content: `
      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0; box-shadow: 0 4px 16px rgba(30, 36, 86, 0.05);">
        <h3 style="color: #1e2456; margin-top: 0; font-size: 1.2rem; font-weight: 800;">Card Container</h3>
        <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin-bottom: 0;">
          This clean white elevated card can hold text, metrics, photos, or buttons inside.
        </p>
      </div>
    `,
  });

  // ═══════════════════════════════════════════════════════════
  // ─── 5. TYPOGRAPHY & FORMATTING ───
  // ═══════════════════════════════════════════════════════════
  bm.add("elem-heading", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M4 6v12"/><path d="M20 6v12"/></svg>`,
      "Heading (H2)",
      "#1e2456",
      "#f8fafc"
    ),
    category: "Typography",
    content: `<h2 style="color: #1e2456; font-size: 1.85rem; font-weight: 800; margin: 28px 0 12px 0; letter-spacing: -0.01em;">Section Heading Title</h2>`,
  });

  bm.add("elem-subheading", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h12"/><path d="M4 6v12"/><path d="M16 6v12"/></svg>`,
      "Subheading (H3)",
      "#1e2456",
      "#f8fafc"
    ),
    category: "Typography",
    content: `<h3 style="color: #1e2456; font-size: 1.35rem; font-weight: 800; margin: 22px 0 10px 0;">Subheading Topic</h3>`,
  });

  bm.add("elem-lead", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>`,
      "Lead Paragraph",
      "#1e2456",
      "#f8fafc"
    ),
    category: "Typography",
    content: `<p style="color: #1e2456; font-size: 1.22rem; font-weight: 600; line-height: 1.75; margin: 0 0 20px 0; letter-spacing: -0.01em;">This high-impact lead intro paragraph highlights the main theme of your station report before diving into full details.</p>`,
  });

  bm.add("elem-dropcap", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16"/><path d="m6 16 6-12 6 12"/><path d="M8 12h8"/></svg>`,
      "Drop Cap Story",
      "#e05a2b",
      "#fdf2ee"
    ),
    category: "Typography",
    content: `
      <p style="color: #334155; font-size: 1.05rem; line-height: 1.8; margin: 0 0 20px 0;">
        <span style="float: left; font-size: 3.8rem; line-height: 0.8; font-weight: 900; color: #e05a2b; margin-right: 10px; padding-top: 4px; font-family: 'Georgia', serif;">A</span>
        s the vessel berthed at dawn amidst crisp Great Lakes winds, our port chaplain climbed the gangway to greet the captain and crew with warm hospitality, care packages, and communication support.
      </p>
    `,
  });

  bm.add("elem-paragraph", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 6H3"/><path d="M21 12H3"/><path d="M15 18H3"/></svg>`,
      "Paragraph",
      "#1e2456",
      "#f8fafc"
    ),
    category: "Typography",
    content: `<p style="color: #334155; font-size: 1.05rem; line-height: 1.75; margin: 0 0 16px 0;">Click here to edit this paragraph and write your narrative, update, or ship visit report.</p>`,
  });

  bm.add("elem-list", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>`,
      "Bullet List",
      "#1e2456",
      "#f8fafc"
    ),
    category: "Typography",
    content: `
      <ul style="color: #334155; font-size: 1rem; line-height: 1.8; margin: 16px 0 24px 20px; padding-left: 10px;">
        <li style="margin-bottom: 8px;">First key station highlight or seafarer support update.</li>
        <li style="margin-bottom: 8px;">Second point regarding vessel hospitality and welfare packs.</li>
        <li style="margin-bottom: 8px;">Community partnership and volunteer coordination note.</li>
      </ul>
    `,
  });

  bm.add("elem-numbered-steps", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>`,
      "Numbered Steps (1-2-3)",
      "#4f46e5",
      "#eef2ff"
    ),
    category: "Typography",
    content: `
      <div style="margin: 28px 0; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #e05a2b; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; shrink-0;">1</div>
          <div><strong style="color: #1e2456; font-size: 14.5px;">Advance Notification:</strong> <span style="color: #475569; font-size: 14px;">Ship agent or captain contacts port chaplain before vessel arrival.</span></div>
        </div>
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #2d3580; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; shrink-0;">2</div>
          <div><strong style="color: #1e2456; font-size: 14.5px;">Gangway Greeting:</strong> <span style="color: #475569; font-size: 14px;">Chaplain visits crew on board with SIM cards, care packages, and reading materials.</span></div>
        </div>
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #059669; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; shrink-0;">3</div>
          <div><strong style="color: #1e2456; font-size: 14.5px;">Shore Support:</strong> <span style="color: #475569; font-size: 14px;">Ground transit coordinated to medical centers, shopping hubs, and seafarer center.</span></div>
        </div>
      </div>
    `,
  });

  bm.add("elem-divider", {
    label: createBlockCard(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="12" y2="12"/></svg>`,
      "Divider Line",
      "#64748b",
      "#f8fafc"
    ),
    category: "Typography",
    content: `<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />`,
  });
};
