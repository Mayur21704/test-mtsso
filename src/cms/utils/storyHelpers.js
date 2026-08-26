/**
 * Utility functions for MTSSO Stories & Newsfeed
 */

/**
 * Extracts the best thumbnail image for a story.
 * 1. Checks `story.featuredImage`
 * 2. Parses `story.htmlContent` for the first <img> tag src
 * 3. Inspects GrapesJS `story.projectData` for uploaded image assets
 * 4. Returns null if no image is present
 *
 * @param {Object} story
 * @returns {string|null} Image URL or null
 */
export const getStoryThumbnail = (story) => {
  if (!story) return null;

  // 1. Explicit featured image
  if (story.featuredImage && typeof story.featuredImage === "string" && story.featuredImage.trim() !== "") {
    return story.featuredImage.trim();
  }

  // 2. Extract first <img> src from htmlContent
  if (story.htmlContent && typeof story.htmlContent === "string") {
    const imgMatch = story.htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  // 3. Extract from GrapesJS projectData JSON
  if (story.projectData) {
    try {
      const str = typeof story.projectData === "string" ? story.projectData : JSON.stringify(story.projectData);
      const srcMatch = str.match(/"src"\s*:\s*"([^"]+)"/i);
      if (srcMatch && srcMatch[1]) {
        return srcMatch[1];
      }
    } catch (e) {
      // ignore
    }
  }

  return null;
};

/**
 * Formats a story publication or creation date
 *
 * @param {string|Date} dateStr
 * @returns {string} Formatted date (e.g. "Aug 26, 2026")
 */
export const formatStoryDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
};
