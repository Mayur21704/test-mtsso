/**
 * Default starter template for new articles in GrapesJS
 */
export const getDefaultArticleTemplate = (title = "New Port Story Title", stationName = "MTSSO Regional") => `
  <div style="max-width: 800px; margin: 0 auto; padding: 20px 10px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <span style="display: inline-block; background-color: #fdf2ee; color: #e05a2b; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 14px; border-radius: 999px; margin-bottom: 12px;">
        ${stationName}
      </span>
      <h1 style="color: #2d3580; font-size: 2.5rem; font-weight: 900; line-height: 1.2; margin: 0 0 16px 0;">
        ${title}
      </h1>
      <p style="color: #64748b; font-size: 1.15rem; font-weight: 500; line-height: 1.6; margin: 0 auto; max-width: 680px;">
        Add a captivating introductory summary of this story here.
      </p>
      <div style="width: 80px; height: 4px; background-color: #e05a2b; border-radius: 2px; margin: 20px auto 0 auto;"></div>
    </div>

    <p style="color: #334155; font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
      Welcome to your new story. You can edit this text directly, or drag and drop custom maritime blocks from the right-hand panel (such as <strong>Chaplain Quotes</strong>, <strong>Port Stat Grids</strong>, <strong>Seafarer Notices</strong>, and <strong>2-Column Stories</strong>).
    </p>

    <div style="background-color: #f7f4f1; border-left: 6px solid #e05a2b; border-radius: 0 16px 16px 0; padding: 20px 24px; margin: 30px 0;">
      <p style="color: #2d3580; font-size: 1.15rem; font-weight: 700; line-height: 1.6; margin: 0 0 8px 0; font-style: italic;">
        “Serving seafarers across the Great Lakes and St. Lawrence Seaway with hospitality and care.”
      </p>
      <span style="color: #e05a2b; font-size: 13px; font-weight: 800;">— Mission to Seafarers Chaplaincy Team</span>
    </div>

    <p style="color: #334155; font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
      Continue your narrative here. Highlight crew milestones, cargo records, volunteer achievements, or upcoming port events.
    </p>
  </div>
`;
