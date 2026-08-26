# MTSSO Central News & Story CMS — Frontend Guide & Visual Studio Reference

This guide provides a comprehensive technical reference and operational manual for the **MTSSO Visual Story Builder (GrapesJS)** and frontend CMS module. It covers authentication, editor controls, custom blocks, trait synchronization, media library integration, and public reader rendering.

---

## 📑 Table of Contents
1. [Quick Access & Route Map](#1-quick-access--route-map)
2. [Authentication & Session Flow](#2-authentication--session-flow)
   - [Login Screen (`/admin/login`)](#login-screen-adminlogin)
   - [Route Protection (`<ProtectedRoute>`)](#route-protection-protectedroute)
   - [JWT Token Expiry & Auto-Redirection](#jwt-token-expiry--auto-redirection)
   - [Logout Controls](#logout-controls)
3. [Visual Studio Workspace Architecture (`GrapesEditor.jsx`)](#3-visual-studio-workspace-architecture-grapeseditorjsx)
   - [Imperative Ref Methods](#imperative-ref-methods)
   - [Sidebar Tabs Overview](#sidebar-tabs-overview)
   - [Canvas Selection & Highlighter CSS](#canvas-selection--highlighter-css)
4. [Live Trait & Text Synchronizer System](#4-live-trait--text-synchronizer-system)
   - [Headline & Content Text Editing](#headline--content-text-editing)
   - [Button & Link Trait Controls](#button--link-trait-controls)
   - [Direct DOM Event Binding Pattern](#direct-dom-event-binding-pattern)
5. [Custom Drag-and-Drop Blocks (`customBlocks.js`)](#5-custom-drag-and-drop-blocks-customblocksjs)
   - [Video Player Block (`mtsso-video`)](#video-player-block-mtsso-video)
   - [PDF Document Card & Embed](#pdf-document-card--embed)
   - [Editorial & Maritime Block Catalog](#editorial--maritime-block-catalog)
6. [Custom MTSSO Media Library Modal (`MediaLibraryModal.jsx`)](#6-custom-mtsso-media-library-modal-medialibrarymodaljsx)
   - [Multi-File Drag & Drop Engine](#multi-file-drag--drop-engine)
   - [Video Thumbnail Previews](#video-thumbnail-previews)
   - [1-Tap Insertion Logic](#1-tap-insertion-logic)
7. [1:1 Live WYSIWYG Preview Modal (`StoryPreviewModal.jsx`)](#7-11-live-wysiwyg-preview-modal-storypreviewmodaljsx)
8. [Draft vs. Live Published Workflow](#8-draft-vs-live-published-workflow)
9. [Frontend Directory Structure & Module Index](#9-frontend-directory-structure--module-index)

---

## 1. Quick Access & Route Map

| Page / Component | Route | Access | Purpose |
| :--- | :--- | :--- | :--- |
| **Admin Login** | [`/admin/login`](http://localhost:5174/admin/login) | Public | Sign in with email & password |
| **Story Management Dashboard** | [`/admin/stories`](http://localhost:5174/admin/stories) | Protected (JWT) | Manage, search, filter, edit, or delete stories |
| **Visual Story Studio (New)** | [`/admin/stories/new`](http://localhost:5174/admin/stories/new) | Protected (JWT) | Fullscreen GrapesJS drag-and-drop authoring |
| **Visual Story Studio (Edit)** | [`/admin/stories/edit/:id`](http://localhost:5174/admin/stories/edit/1) | Protected (JWT) | Edit working draft of an existing article |
| **Central Regional Newsroom** | [`/news`](http://localhost:5174/news) | Public | Multi-station public news feed with filters |
| **Public Dynamic Story Reader** | [`/news/:slug`](http://localhost:5174/news/example-slug) | Public | Dedicated SEO article page rendering published HTML/CSS |

---

## 2. Authentication & Session Flow

### Login Screen (`/admin/login`)
- Located at [frontend/src/cms/pages/AdminLoginPage.jsx](file:///f:/mtsc/MTSSO/frontend/src/cms/pages/AdminLoginPage.jsx).
- 100% styled to the **MTSSO Brand Identity**:
  - Pure White card (`max-w-[420px]`, `rounded-2xl`, `shadow-xl`, `border-slate-200`).
  - Navy `#1e2456` bold typography, Slate `#f8fafc` input backgrounds, and Coral `#e05a2b` focus rings/action buttons.
  - Authentic MTSSO logo header and subtle background gradients (`from-slate-50 via-slate-100`).
- Fields: Admin Email & Password (with eye toggle).
- Handles redirect queries (e.g. `/admin/login?redirect=%2Fadmin%2Fstories%2Fnew`).

---

### Route Protection (`<ProtectedRoute>`)
- Located at [frontend/src/cms/components/ProtectedRoute.jsx](file:///f:/mtsc/MTSSO/frontend/src/cms/components/ProtectedRoute.jsx).
- Wraps all `/admin/stories/*` routes in `App.jsx`.
- If `isAuthenticated === false`, immediately captures the current target URL and redirects the user to `/admin/login?redirect=...`.

---

### JWT Token Expiry & Auto-Redirection
- Managed inside [frontend/src/cms/context/AuthContext.jsx](file:///f:/mtsc/MTSSO/frontend/src/cms/context/AuthContext.jsx).
- **Global 401 Interception**:
  - When backend returns `401 Unauthorized` (`TokenExpiredError` or `code: "TOKEN_EXPIRED"`), `authFetch` and `storyService.js` catch the response.
  - Automatically clears `localStorage` tokens (`mtsso_admin_token`, `mtsso_admin_user`).
  - Smoothly navigates to `/admin/login?expired=1`.
  - The login page renders an amber **"Session Expired"** alert banner.

---

### Logout Controls
- **Studio Navbar (`CmsNavbar.jsx`)**: Includes a dedicated Logout button with hover styling in the top action bar.
- **Story Dashboard (`AdminDashboard.jsx`)**: Displays admin profile info and a **Sign Out** button in the header.

---

## 3. Visual Studio Workspace Architecture (`GrapesEditor.jsx`)

Located at [frontend/src/cms/components/GrapesEditor.jsx](file:///f:/mtsc/MTSSO/frontend/src/cms/components/GrapesEditor.jsx).

```
┌────────────────────────────────────────────────────────────────────────┐
│  CmsNavbar (Back, Device Switchers, Undo/Redo, Media, Preview, Publish)│
├──────────────────────────────────────────────────────┬─────────────────┤
│  Canvas Dimension Sub-Bar (1280px • Desktop, Clear)  │  Studio Tools   │
├──────────────────────────────────────────────────────┤  ┌───────────┐  │
│                                                      │  │ ⊞ Blocks  │  │
│                                                      │  │ 🎨 Styles │  │
│              GrapesJS Iframe Canvas                  │  │ 🔗 Links  │  │
│       (Paper Artboard with Smooth Margins)           │  │ 📑 Layers │  │
│                                                      │  └───────────┘  │
│                                                      │  Accordion Form │
└──────────────────────────────────────────────────────┴─────────────────┘
```

### Imperative Ref Methods
Parent pages access the editor through `useImperativeHandle`:
* `undo()`: Runs GrapesJS undo command.
* `redo()`: Runs GrapesJS redo command.
* `clear()`: Wipes the canvas clean.
* `openAssets()`: Opens asset manager.
* `getEditor()`: Exposes the underlying GrapesJS editor instance.
* `getSelected()`: Returns currently selected component on canvas.
* `getHtml()`: Exports clean HTML markup.
* `getCss()`: Exports scoped CSS styles.
* `getProjectData()`: Exports full JSON AST for lossless re-editing.

---

### Sidebar Tabs Overview
1. **`🧩 Blocks` (`#gjs-blocks-container`)**:
   - 2-column clean white grid of drag-and-drop components with coral hover effects.
   - Instant search filter bar.
2. **`🎨 Styles` (`#gjs-style-container`)**:
   - Accordion sectors for Typography, Dimensions & Spacing, Flex Layout, Backgrounds & Native Color Pickers, and Borders & Shadows.
3. **`🔗 Links` (`#gjs-traits-container`)**:
   - Component settings for changing Button/Link text, URLs, open target (`_blank`), image source URLs, and headlines.
4. **`📑 Layers` (`#gjs-layers-container`)**:
   - Tree view of DOM components on the canvas.

---

### Canvas Selection & Highlighter CSS
Defined in [frontend/src/cms/styles/grapesCustom.css](file:///f:/mtsc/MTSSO/frontend/src/cms/styles/grapesCustom.css):
* **Selected Component**: Solid coral (`#e05a2b`) 2px outline with 2px offset.
* **Hover Highlighter**: Dashed Navy (`#2d3580`) 2px outline.
* **Component Badge**: Coral pill label (e.g., `IMG`, `A`, `H2`, `DIV`).
* **Floating Toolbar**: Navy `#1e2456` action bar with Move, Copy, and Delete icons.

---

## 4. Live Trait & Text Synchronizer System

GrapesJS custom traits in [frontend/src/cms/config/customBlocks.js](file:///f:/mtsc/MTSSO/frontend/src/cms/config/customBlocks.js) and selection handlers in `GrapesEditor.jsx` ensure that editing text in the sidebar immediately updates both the canvas and the exported HTML.

### 1. Headline & Content Text Editing (`element-text-editor`)
- Appears on any heading (`H1`–`H6`), paragraph (`P`), or blockquote.
- Updates component content in real time via direct `elInput.oninput` event listeners.

### 2. Button & Link Trait Controls (`link-title-editor` & `link-url`)
- Automatically detects links (`<a href="...">`) even when clicking child elements or text nodes by walking up the ancestor chain (`findParent(comp, 'A')`).
- Provides 4 dedicated inputs:
  1. **Button / Link Text**: Live text changer.
  2. **Link URL (href)**: Target destination (e.g. `https://...`, `/donate`, `/uploads/guide.pdf`).
  3. **Open In**: `_self` (Same Tab) or `_blank` (New Tab).
  4. **Hover Tooltip (title)**: Accessibility title attribute.

---

## 5. Custom Drag-and-Drop Blocks (`customBlocks.js`)

### Video Player Block (`mtsso-video`)
- Supports **both direct uploaded video files and video embeds**:
  - If a direct video URL is provided (`.mp4`, `.webm`, `.mov`, `.ogg`, or `/uploads/...mp4`), it renders a responsive **HTML5 `<video controls>` player**.
  - If a YouTube or Vimeo link is provided, it auto-converts the URL and renders a responsive `<iframe>` embed player.
- Aspect ratio controls: `16:9 (Standard)`, `4:3 (Classic)`, or `1:1 (Square)`.

### PDF Document Card & Embed (`mtsso-pdf-embed`)
- Renders an interactive PDF preview card or embedded document viewer with custom height options (`500px`, `700px`, `900px`).

### Editorial & Maritime Block Catalog
- 📰 **Article Header**: Full-width headline banner with station badge and coral accent.
- 💬 **Chaplain Quote Box**: Styled quotation container with quote marks and author citation.
- 📊 **Port Stat Grid**: 3-card counter block for port statistics.
- 📢 **Notice Callout**: Amber warning alert for shipping updates or emergency port logistics.
- 🔘 **Action Buttons**: Solid Coral and Navy pill buttons.
- ◫ **Multi-Column Layouts**: 1-Column, 2-Column (50/50), and 3-Column responsive flex grids.

---

## 6. Custom MTSSO Media Library Modal (`MediaLibraryModal.jsx`)

Located at [frontend/src/cms/components/MediaLibraryModal.jsx](file:///f:/mtsc/MTSSO/frontend/src/cms/components/MediaLibraryModal.jsx).

### Features:
1. **Multi-File Drag & Drop**:
   - Drag multiple files directly into the dashed upload zone or click to browse.
   - Real-time progress bar tracking upload completion.
2. **Video & Document Support**:
   - Accepts images, videos (MP4, WebM, MOV up to 500MB), and PDFs.
   - Video items render interactive video preview cards with a coral Play badge.
3. **Search & Filter Tabs**:
   - Switch between **All**, **Images**, **Videos**, and **Docs**.
   - Instant search bar filtering by file name.
4. **1-Tap & Double-Click Insertion**:
   - Single-click to select (shows coral checkmark).
   - Double-click or click **"Insert Selected"** to insert into the canvas.
   - Automatically detects active canvas selection:
     - If an `<img>` is selected → updates image `src`.
     - If a video block is selected → updates video URL.
     - If a button/link is selected → sets `href`.
     - If nothing is selected → creates and appends the appropriate video/image component.

---

## 7. 1:1 Live WYSIWYG Preview Modal (`StoryPreviewModal.jsx`)

Located at [frontend/src/cms/components/StoryPreviewModal.jsx](file:///f:/mtsc/MTSSO/frontend/src/cms/components/StoryPreviewModal.jsx).

Renders the article **identically to the public `ArticleViewPage.jsx`**:
* **Browser Chrome Bar**: Simulated browser URL pill (`mtsso.org/news/your-slug`) with window dots.
* **Navy Hero Header**: Displays station badge, category tag, story title, author, location, and formatted publication date.
* **Breadcrumb Navigation**: `Home > News & Stories > Title`.
* **Rendered Body**: Injects GrapesJS HTML & scoped CSS with `.cms-article-rendered-body` typography styles.
* **Station Callout Card**: Bottom station card linking to port stations.

---

## 8. Draft vs. Live Published Workflow

1. **Working Draft (`onSaveDraft`)**:
   - Updates `htmlContent` and `cssContent` in MySQL.
   - Leaves public readers viewing previous `publishedHtml`.
2. **Publishing (`onPublish`)**:
   - Copies `htmlContent -> publishedHtml` and `cssContent -> publishedCss`.
   - Sets `status = "published"` and refreshes `publishedAt`.
   - Public readers immediately receive the new version at `/news/:slug`.

---

## 9. Frontend Directory Structure & Module Index

```
frontend/src/cms/
├── context/
│   └── AuthContext.jsx           # JWT Session State, Token Storage & Expiry Redirection
├── components/
│   ├── ProtectedRoute.jsx        # Route Guard for Admin Pages
│   ├── GrapesEditor.jsx          # GrapesJS Canvas Wrapper & Trait Synchronizer
│   ├── MediaLibraryModal.jsx     # Custom MTSSO Media Gallery (Uploads, Search, Video cards)
│   ├── StoryMetadataModal.jsx    # Station & Category Selector Modal
│   ├── StoryPreviewModal.jsx     # 1:1 Live WYSIWYG Preview Modal
│   ├── CmsNavbar.jsx             # Admin Top Navigation (Publish, Draft, Preview, Logout)
│   ├── CmsConfirmModal.jsx       # Custom Confirmation Popup
│   └── CmsNotification.jsx       # Brand Toast Notification
├── config/
│   ├── grapesConfig.js           # GrapesJS Viewports, CSS, & Styling
│   ├── customBlocks.js           # Custom Blocks (Video Embeds, HTML5 Video, Quotes, PDFs)
│   └── defaultTemplate.js        # Clean Starter Canvas Layout
├── services/
│   └── storyService.js           # REST API Client with JWT Auth & Cache Fallback
├── pages/
│   ├── AdminLoginPage.jsx        # MTSSO Brand Admin Login Page (/admin/login)
│   ├── AdminDashboard.jsx        # Story Management Table (/admin/stories)
│   ├── StoryEditorPage.jsx       # Fullscreen Visual Builder Page
│   └── ArticleViewPage.jsx       # Public Dynamic Reader (/news/:slug)
├── styles/
│   └── grapesCustom.css          # MTSSO White Theme CSS (Navy #1e2456, Coral #e05a2b)
└── index.js                      # Public Module Exports
```
