/**
 * Custom MTSSO Drag-and-Drop Blocks for GrapesJS
 * Branded with Navy (#2d3580), Coral (#e05a2b), and Warm Gray tokens.
 */
export const registerCustomBlocks = (editor) => {
  const bm = editor.BlockManager;

  // 1. Article Hero Title Banner
  bm.add("mtsso-hero-header", {
    label: `
      <div style="font-size: 11px; font-weight: 800; color: #2d3580; text-align: center;">
        <span style="font-size: 18px; display: block; margin-bottom: 2px;">📰</span>
        Article Header
      </div>
    `,
    category: "MTSSO Blocks",
    content: `
      <div style="text-align: center; max-width: 800px; margin: 0 auto 30px auto; padding: 20px 10px;">
        <span style="display: inline-block; background-color: #fdf2ee; color: #e05a2b; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 14px; border-radius: 999px; margin-bottom: 12px;">
          Station Dispatch
        </span>
        <h1 style="color: #2d3580; font-size: 2.5rem; font-weight: 900; line-height: 1.15; margin: 0 0 16px 0;">
          Headline Title for This Port Story
        </h1>
        <p style="color: #64748b; font-size: 1.15rem; font-weight: 500; line-height: 1.6; margin: 0 auto; max-width: 680px;">
          A brief introduction summarizing the event, ship visit, or seafarer community milestone.
        </p>
        <div style="width: 80px; height: 4px; background-color: #e05a2b; border-radius: 2px; margin: 24px auto 0 auto;"></div>
      </div>
    `,
  });

  // 2. Chaplain / Seafarer Quote Callout
  bm.add("mtsso-quote-callout", {
    label: `
      <div style="font-size: 11px; font-weight: 800; color: #2d3580; text-align: center;">
        <span style="font-size: 18px; display: block; margin-bottom: 2px;">💬</span>
        Chaplain Quote
      </div>
    `,
    category: "MTSSO Blocks",
    content: `
      <div style="background-color: #f7f4f1; border-left: 6px solid #e05a2b; border-radius: 0 16px 16px 0; padding: 24px 28px; margin: 30px 0; font-style: italic;">
        <p style="color: #2d3580; font-size: 1.25rem; font-weight: 700; line-height: 1.6; margin: 0 0 14px 0;">
          “When a seafarer steps off the gangway after 40 days in rough seas, having someone warmly greeting them with a cup of coffee and a SIM card makes all the difference in the world.”
        </p>
        <div style="display: flex; align-items: center; gap: 12px; font-style: normal;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background-color: #2d3580; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px;">
            ⚓
          </div>
          <div>
            <div style="color: #2d3580; font-weight: 800; font-size: 14px;">Rev. Judith Alltree</div>
            <div style="color: #e05a2b; font-size: 12px; font-weight: 700;">Toronto Station Chaplain & Manager</div>
          </div>
        </div>
      </div>
    `,
  });

  // 3. Two-Column Story & Image Layout
  bm.add("mtsso-two-column", {
    label: `
      <div style="font-size: 11px; font-weight: 800; color: #2d3580; text-align: center;">
        <span style="font-size: 18px; display: block; margin-bottom: 2px;">🖼️</span>
        Story & Image
      </div>
    `,
    category: "MTSSO Blocks",
    content: `
      <div style="display: flex; flex-wrap: wrap; gap: 30px; align-items: center; margin: 35px 0;">
        <div style="flex: 1 1 340px;">
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" alt="Port Activity" style="width: 100%; border-radius: 16px; box-shadow: 0 10px 25px rgba(45, 53, 128, 0.1);" />
        </div>
        <div style="flex: 1 1 340px;">
          <span style="color: #e05a2b; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;">Dockside Report</span>
          <h2 style="color: #2d3580; font-size: 1.85rem; font-weight: 800; margin: 8px 0 14px 0; line-height: 1.25;">
            Welcoming Crews Across Our Harbours
          </h2>
          <p style="color: #475569; font-size: 1rem; line-height: 1.7; margin-bottom: 16px;">
            Write the detailed story content here. You can describe the ship visits, how many crew members were supported, parcel deliveries, or local community partnerships.
          </p>
          <a href="/contact" style="display: inline-block; background-color: #2d3580; color: #ffffff; padding: 10px 20px; border-radius: 10px; font-weight: 700; font-size: 13px;">
            Learn More About Our Visits →
          </a>
        </div>
      </div>
    `,
  });

  // 4. Port Stat Highlight Card
  bm.add("mtsso-stat-card", {
    label: `
      <div style="font-size: 11px; font-weight: 800; color: #2d3580; text-align: center;">
        <span style="font-size: 18px; display: block; margin-bottom: 2px;">📊</span>
        Port Stat Grid
      </div>
    `,
    category: "MTSSO Blocks",
    content: `
      <div style="background-color: #f7f4f1; border-radius: 20px; padding: 30px 20px; margin: 35px 0; text-align: center;">
        <h3 style="color: #2d3580; font-size: 1.25rem; font-weight: 800; margin: 0 0 20px 0;">Key Highlights at a Glance</h3>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
          <div style="flex: 1 1 180px; background-color: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <div style="color: #e05a2b; font-size: 2.2rem; font-weight: 900; line-height: 1;">120+</div>
            <div style="color: #2d3580; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-top: 6px;">Vessels Visited</div>
          </div>
          <div style="flex: 1 1 180px; background-color: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <div style="color: #e05a2b; font-size: 2.2rem; font-weight: 900; line-height: 1;">1,400+</div>
            <div style="color: #2d3580; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-top: 6px;">Seafarers Assisted</div>
          </div>
          <div style="flex: 1 1 180px; background-color: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <div style="color: #e05a2b; font-size: 2.2rem; font-weight: 900; line-height: 1;">350+</div>
            <div style="color: #2d3580; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-top: 6px;">Parcels Delivered</div>
          </div>
        </div>
      </div>
    `,
  });

  // 5. Seafarer Notice / Alert Box
  bm.add("mtsso-alert-box", {
    label: `
      <div style="font-size: 11px; font-weight: 800; color: #2d3580; text-align: center;">
        <span style="font-size: 18px; display: block; margin-bottom: 2px;">⚠️</span>
        Seafarer Notice
      </div>
    `,
    category: "MTSSO Blocks",
    content: `
      <div style="background-color: #fff9eb; border: 2px solid #fde047; border-radius: 16px; padding: 20px 24px; margin: 25px 0; display: flex; gap: 16px; align-items: flex-start;">
        <span style="font-size: 24px; line-height: 1;">📢</span>
        <div>
          <h4 style="color: #854d0e; font-size: 1.1rem; font-weight: 800; margin: 0 0 6px 0;">Important Station Notice for Visiting Crews</h4>
          <p style="color: #713f12; font-size: 0.95rem; margin: 0; line-height: 1.6;">
            Transportation bookings and parcel delivery confirmations can be coordinated 24 hours prior to arrival by contacting the local station duty chaplain.
          </p>
        </div>
      </div>
    `,
  });

  // 6. Action Button / CTA Callout
  bm.add("mtsso-cta-button", {
    label: `
      <div style="font-size: 11px; font-weight: 800; color: #2d3580; text-align: center;">
        <span style="font-size: 18px; display: block; margin-bottom: 2px;">🎯</span>
        Action Button
      </div>
    `,
    category: "MTSSO Blocks",
    content: `
      <div style="text-align: center; margin: 30px 0;">
        <a href="/contact" style="display: inline-block; background-color: #e05a2b; color: #ffffff; font-size: 15px; font-weight: 800; padding: 14px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 14px rgba(224, 90, 43, 0.35);">
          Get in Touch With This Station →
        </a>
      </div>
    `,
  });

  // 7. Standard Paragraph & Heading Blocks
  bm.add("standard-heading", {
    label: `
      <div style="font-size: 11px; font-weight: 800; color: #2d3580; text-align: center;">
        <span style="font-size: 18px; display: block; margin-bottom: 2px;">H2</span>
        Heading 2
      </div>
    `,
    category: "Typography",
    content: `<h2 style="color: #2d3580; font-size: 1.85rem; font-weight: 800; margin: 25px 0 12px 0;">Section Heading</h2>`,
  });

  bm.add("standard-paragraph", {
    label: `
      <div style="font-size: 11px; font-weight: 800; color: #2d3580; text-align: center;">
        <span style="font-size: 18px; display: block; margin-bottom: 2px;">¶</span>
        Paragraph
      </div>
    `,
    category: "Typography",
    content: `<p style="color: #334155; font-size: 1.05rem; line-height: 1.7; margin: 0 0 16px 0;">Click here to edit this text and write your narrative, announcement, or ship update.</p>`,
  });

  bm.add("standard-image", {
    label: `
      <div style="font-size: 11px; font-weight: 800; color: #2d3580; text-align: center;">
        <span style="font-size: 18px; display: block; margin-bottom: 2px;">📷</span>
        Full Image
      </div>
    `,
    category: "Media",
    content: `<div style="margin: 25px 0;"><img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80" alt="Maritime photo" style="width: 100%; border-radius: 16px;" /><p style="font-size: 12px; color: #64748b; font-style: italic; text-align: center; margin-top: 8px;">Photo Caption / Credits</p></div>`,
  });
};
