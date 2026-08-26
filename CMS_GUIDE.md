# MTSSO Central News & Story CMS — Frontend Guide & User Manual

This guide is designed for **website administrators, chaplains, and content creators** using the **MTSSO Visual Story Builder (GrapesJS)** to design, tag, and publish articles, ship visit dispatches, and port announcements across Southern Ontario port stations.

---

## 🔗 Quick Access Links

| Page | URL | Purpose |
| :--- | :--- | :--- |
| **Story Management Dashboard** | [`http://localhost:5173/admin/stories`](http://localhost:5173/admin/stories) | View, filter, edit, or delete existing stories |
| **Visual Story Builder** | [`http://localhost:5173/admin/stories/new`](http://localhost:5173/admin/stories/new) | Create and design a new article using drag-and-drop |
| **Central Regional Newsroom** | [`http://localhost:5173/news`](http://localhost:5173/news) | Public multi-station newsroom with port filters |
| **Station Portals** | [`/stations/toronto`](http://localhost:5173/stations/toronto), [`/stations/hamilton`](http://localhost:5173/stations/hamilton), etc. | Port-specific community landing pages |

---

## ✍️ Step-by-Step: How to Create and Publish a Story

### Step 1: Open the Admin Dashboard
1. Go to **`http://localhost:5173/admin/stories`** (or click *"Open CMS Story Admin Studio"* from `/news`).
2. Click the orange **"+ Create New Story"** button in the top right.

---

### Step 2: Design Your Article Visually (Drag & Drop)
The builder opens in fullscreen with MTSSO brand styling (Navy & Coral).

* **Edit Text Directly**: Click on any text, heading, or paragraph on the central canvas and type your narrative.
* **Drag Blocks into Canvas**: Open the **"🧩 Blocks"** tab in the right sidebar and drag components onto your canvas:
  - 📰 **Article Header**: Full-width title banner with station badge and coral accent.
  - 💬 **Chaplain Quote Box**: Styled quote box with avatar and coral border.
  - 📄 **PDF / Document Card**: Card with download button for seafarer forms or port notices.
  - ◫ **Layout Grids (1, 2, or 3 Columns)**: Multi-column responsive containers.
  - 📊 **Port Stat Grid**: 3-card counters (*Vessels Visited*, *Seafarers Served*, *Parcels Delivered*).
  - 📢 **Notice Box**: Amber alert box for urgent port logistics or ship arrival schedules.
  - 🔘 **Coral / Navy Buttons**: Action buttons linking to donation, contact, or volunteer forms.
  - 📷 **Image with Caption** & 🎥 **Video Embed**: Add photos or YouTube videos.

---

### Step 3: Style Elements (The "🎨 Styles" Tab)
Click any element on the canvas, then switch to the **"🎨 Styles"** tab in the right panel to customize:
* **Typography**: Change font sizes, weights, letter spacing, text alignment, or text colors.
* **Layout & Flexbox**: Set alignment, direction, or spacing between cards.
* **Dimensions & Spacing**: Adjust width, margins (outer space), and padding (inner space).
* **Background & Colors**: Pick custom background colors or gradient accents.
* **Borders & Shadows**: Add rounded corners or subtle drop shadows.

---

### Step 4: Upload Media (Images & Documents)
1. Click the **"📁 Media & File Uploads"** button in the top toolbar (or double-click any image).
2. Upload your images (`.jpg`, `.png`, `.webp`, `.svg`) or documents (`.pdf`, `.doc`, `.docx`).
3. Uploaded files are saved to `F:\mtsc\MTSSO\uploads\` and can be inserted into any article with one click.

---

### Step 5: Switch Responsive Viewports
In the top toolbar, click:
* **Desktop**: Full-width computer monitor layout.
* **Tablet (768px)**: iPad and tablet view.
* **Mobile (375px)**: Smartphone layout.

---

### Step 6: Tag Station, Category & Summary
1. Click the **"Station & Settings"** button in the top navigation bar.
2. Fill in the story details:
   * **Story Title**: Article headline.
   * **Target Station**: Choose which station this story belongs to:
     * *Toronto Station*
     * *Hamilton Station*
     * *Oshawa Station*
     * *Port Colborne Station*
     * *MTSSO Regional* (Network-wide)
     * *All Stations*
   * **Category**: Choose *Ship Visits*, *Events*, *Station News*, *Stories*, *Volunteers*, *Community*, or *Announcements*.
   * **Excerpt / Summary**: 1–2 sentences summarizing the article for the newsfeed cards.
   * **Featured Image**: Enter the image URL or pick an uploaded image thumbnail.
   * **Author & Location**: e.g., *"Pastor Dan Phannenhour"* / *"Port of Hamilton"*.
3. Click **"Save Story Settings"**.

---

### Step 7: Preview & Publish
1. Click **"Preview"** in the top bar to see a live simulation of how visitors will view the article.
2. Click the orange **"Publish Story"** button.

---

### Step 8: View on the Live Website
* **Central Newsroom**: Visit **`http://localhost:5173/news`**. Your new article appears at the top of the feed with its station badge and category tag.
* **Station Filter**: Clicking **"Hamilton"** or **"Toronto"** filters the feed to show stories for that port.
* **Read Full Article**: Clicking the story card opens its dedicated dynamic page at **`http://localhost:5173/news/your-story-slug`**.

---

## 💻 Frontend Developer Reference

All CMS code is strictly encapsulated inside `frontend/src/cms/`:

```
frontend/src/cms/
├── components/
│   ├── GrapesEditor.jsx          # React component wrapping GrapesJS canvas & toolbars
│   ├── StoryMetadataModal.jsx    # Station, Category, Excerpt, and Author modal
│   ├── CmsNavbar.jsx             # Top bar (Publish, Save Draft, Preview, Settings)
│   └── StoryPreviewModal.jsx     # Live simulated reader preview
├── config/
│   ├── grapesConfig.js           # Viewport devices, style sectors & asset manager
│   ├── customBlocks.js           # Pre-styled MTSSO maritime blocks
│   └── defaultTemplate.js        # Default starter HTML template
├── services/
│   └── storyService.js           # REST API client with offline LocalStorage fallback
├── pages/
│   ├── AdminDashboard.jsx        # Admin story manager table (/admin/stories)
│   ├── StoryEditorPage.jsx       # Fullscreen builder page (/admin/stories/new)
│   └── ArticleViewPage.jsx       # Dynamic public article reader (/news/:slug)
├── styles/
│   └── grapesCustom.css          # MTSSO Brand Studio CSS (Navy #2d3580, Coral #e05a2b)
└── index.js                      # Public module exports
```

### Data Synchronization Flow:
1. `storyService.js` makes HTTP requests to the backend (`http://localhost:5000/api/stories`).
2. If the backend is running, stories are saved and fetched from **MySQL**.
3. If the backend is temporarily offline during frontend development, `storyService.js` automatically caches changes to browser **LocalStorage** so you can keep working without interruption!
