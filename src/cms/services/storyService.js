const API_ROOT = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const API_BASE = `${API_ROOT}/stories`;
const LOCAL_STORAGE_KEY = "mtsso_stories_cms_cache";

/**
 * Helper to get Auth Headers
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("mtsso_admin_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Intercept 401 response and redirect to login if session expired
 */
const handleAuthError = (res) => {
  if (res.status === 401) {
    localStorage.removeItem("mtsso_admin_token");
    localStorage.removeItem("mtsso_admin_user");
    if (typeof window !== "undefined" && !window.location.pathname.includes("/admin/login")) {
      const redirect = encodeURIComponent(window.location.pathname);
      window.location.href = `/admin/login?expired=1&redirect=${redirect}`;
    }
  }
};

/**
 * Helper to get local cached stories fallback
 */
const getLocalStories = () => {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn("Could not read local storage stories", e);
  }
  return [];
};

/**
 * Helper to save to local cache
 */
const saveLocalStories = (stories) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stories));
  } catch (e) {
    console.warn("Could not save to local storage", e);
  }
};

export const storyService = {
  /**
   * Fetch all stories with optional filters (station, category, status, search)
   */
  async getStories(params = {}) {
    const query = new URLSearchParams();
    if (params.station && params.station !== "all") query.append("station", params.station);
    if (params.category && params.category !== "all") query.append("category", params.category);
    if (params.status) query.append("status", params.status);
    if (params.search) query.append("search", params.search);

    try {
      const res = await fetch(`${API_BASE}?${query.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          saveLocalStories(json.data);
          return json.data;
        }
      }
    } catch (err) {
      console.info("[storyService] Using local fallback store:", err.message);
    }

    // Fallback to local storage
    let stories = getLocalStories();
    if (params.station && params.station !== "all") {
      stories = stories.filter(
        (s) => s.station === params.station || s.station === "all" || s.station === "mtsso"
      );
    }
    if (params.category && params.category !== "all") {
      stories = stories.filter((s) => s.category === params.category);
    }
    if (params.status) {
      stories = stories.filter((s) => s.status === params.status);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      stories = stories.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.excerpt && s.excerpt.toLowerCase().includes(q))
      );
    }
    return stories;
  },

  /**
   * Get single story by slug (Public reader)
   */
  async getStoryBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE}/slug/${slug}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch (err) {
      console.info("[storyService] Using local fallback for slug:", slug);
    }

    const stories = getLocalStories();
    return stories.find((s) => s.slug === slug) || null;
  },

  /**
   * Get single story by ID (Protected for admin editing)
   */
  async getStoryById(id) {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        headers: getAuthHeaders(),
      });
      handleAuthError(res);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch (err) {
      console.info("[storyService] Using local fallback for ID:", id);
    }

    const stories = getLocalStories();
    return stories.find((s) => String(s.id) === String(id)) || null;
  },

  /**
   * Create a new story (Protected)
   */
  async createStory(storyData) {
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(storyData),
      });
      handleAuthError(res);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const stories = getLocalStories();
          stories.unshift(json.data);
          saveLocalStories(stories);
          return json.data;
        }
      }
    } catch (err) {
      console.info("[storyService] Creating story in local storage fallback:", err.message);
    }

    // Local Storage fallback creation
    const stories = getLocalStories();
    const newStory = {
      ...storyData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      publishedAt: storyData.publishedAt || new Date().toISOString(),
    };
    stories.unshift(newStory);
    saveLocalStories(stories);
    return newStory;
  },

  /**
   * Update an existing story (Protected)
   */
  async updateStory(id, storyData) {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(storyData),
      });
      handleAuthError(res);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const stories = getLocalStories().map((s) =>
            String(s.id) === String(id) ? { ...s, ...json.data } : s
          );
          saveLocalStories(stories);
          return json.data;
        }
      }
    } catch (err) {
      console.info("[storyService] Updating story in local storage fallback:", err.message);
    }

    const stories = getLocalStories().map((s) =>
      String(s.id) === String(id) ? { ...s, ...storyData, updatedAt: new Date().toISOString() } : s
    );
    saveLocalStories(stories);
    return stories.find((s) => String(s.id) === String(id));
  },

  /**
   * Delete a story (Protected)
   */
  async deleteStory(id) {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      handleAuthError(res);
    } catch (err) {
      console.info("[storyService] Deleting story in local storage fallback:", err.message);
    }

    const stories = getLocalStories().filter((s) => String(s.id) !== String(id));
    saveLocalStories(stories);
    return true;
  },
};

export default storyService;
