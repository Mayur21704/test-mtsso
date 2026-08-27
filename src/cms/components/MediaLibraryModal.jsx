import { useState, useEffect, useCallback, useRef } from "react";
import { X, Image as ImageIcon, FileText, Check, Search, Loader2, CloudUpload, Images, Video, Play } from "lucide-react";

const API_ROOT = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const UPLOAD_API = `${API_ROOT}/upload`;

/**
 * Custom MTSSO Media Library Modal
 * Matches dashboard design — Navy/Coral/White theme
 * Supports: images, videos (MP4/WebM/MOV), docs (PDF), multi-upload, drag & drop, grid gallery, select-to-apply
 */
export const MediaLibraryModal = ({ isOpen, onClose, onSelect, selectMode = false }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [filter, setFilter] = useState("all"); // "all" | "image" | "video" | "document"
  const fileInputRef = useRef(null);

  // Fetch media library
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(UPLOAD_API);
      const json = await res.json();
      if (json.success) setFiles(json.data || []);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
      setSelectedFile(null);
    }
  }, [isOpen, fetchFiles]);

  // Upload handler
  const handleUpload = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    Array.from(fileList).forEach((f) => formData.append("files", f));

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", UPLOAD_API);

      const token = localStorage.getItem("mtsso_admin_token");
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        setUploading(false);
        setUploadProgress(0);
        if (xhr.status === 200) {
          fetchFiles(); // Refresh list
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setUploadProgress(0);
      };

      xhr.send(formData);
    } catch (err) {
      setUploading(false);
      console.error("Upload failed:", err);
    }
  };

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  // Filter & search
  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "image" && f.type === "image") ||
      (filter === "video" && f.type === "video") ||
      (filter === "document" && f.type !== "image" && f.type !== "video");
    return matchesSearch && matchesFilter;
  });

  const formatSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border border-slate-200/90 rounded-[28px] w-full max-w-3xl shadow-2xl text-slate-900 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* ─── Header ─── */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-4 flex items-start justify-between gap-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-coral-pale flex items-center justify-center text-coral shadow-xs shrink-0">
              <Images className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-navy leading-tight">
                Media Library
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Upload, browse, and manage images, videos, and documents
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ─── Upload Zone ─── */}
        <div className="px-6 sm:px-8 pt-5">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200
              ${dragOver
                ? "border-coral bg-coral/5 scale-[1.01]"
                : "border-slate-200 bg-slate-50/70 hover:border-coral/50 hover:bg-coral/[0.02]"
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.mp4,.webm,.ogg,.mov,.avi,.mkv,.m4v,.pdf,.doc,.docx,.xlsx,.pptx"
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-coral animate-spin" />
                <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-coral rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-slate-600">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <CloudUpload className={`w-8 h-8 ${dragOver ? "text-coral" : "text-slate-400"}`} />
                <p className="text-sm font-bold text-slate-700">
                  Drop files here or <span className="text-coral">click to browse</span>
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  Images, Custom Videos (MP4, WebM, MOV), Documents (PDF) — Upload multiple files at once (up to 500MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ─── Toolbar: Search + Filters ─── */}
        <div className="px-6 sm:px-8 pt-4 pb-2 flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[180px] relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media..."
              className="w-full h-9 pl-9 pr-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs font-bold text-navy placeholder:text-slate-400 focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {[
              { id: "all", label: "All" },
              { id: "image", label: "Images" },
              { id: "video", label: "Videos" },
              { id: "document", label: "Docs" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  filter === f.id
                    ? "bg-navy text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="text-[11px] font-bold text-slate-400 ml-auto">
            {filteredFiles.length} file{filteredFiles.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ─── Media Grid ─── */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-4 min-h-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-coral animate-spin" />
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <ImageIcon className="w-10 h-10 text-slate-300" />
              <p className="text-sm font-bold text-slate-400">
                {searchQuery ? "No files match your search" : "No media uploaded yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
              {filteredFiles.map((file, idx) => {
                const isImage = file.type === "image";
                const isVideo = file.type === "video";
                const isSelected = selectedFile?.src === file.src;
                return (
                  <button
                    type="button"
                    key={file.src || idx}
                    onClick={() => setSelectedFile(file)}
                    onDoubleClick={() => {
                      if (onSelect) {
                        onSelect(file.src, file);
                        onClose();
                      }
                    }}
                    className={`
                      group relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-slate-900
                      ${isSelected
                        ? "border-coral ring-2 ring-coral/30 scale-[1.03]"
                        : "border-slate-200 hover:border-coral/50 hover:shadow-md"
                      }
                    `}
                  >
                    {isImage && (
                      <img
                        src={file.src}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}

                    {isVideo && (
                      <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
                        <video
                          src={file.src}
                          className="w-full h-full object-cover opacity-80 pointer-events-none"
                          muted
                          preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-8 h-8 rounded-full bg-coral text-white flex items-center justify-center shadow-lg">
                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                          </div>
                        </div>
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white flex items-center gap-1">
                          <Video className="w-2.5 h-2.5 text-coral" />
                          <span>Video</span>
                        </div>
                      </div>
                    )}

                    {!isImage && !isVideo && (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-1.5 p-2">
                        <FileText className="w-7 h-7 text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-500 truncate max-w-full px-1 text-center leading-tight">
                          {file.name}
                        </span>
                      </div>
                    )}
                    
                    {/* Selected checkmark overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-coral/20 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-coral flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      </div>
                    )}

                    {/* File info overlay on hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] font-bold text-white truncate">{file.name}</p>
                      <p className="text-[8px] text-white/70">{formatSize(file.size)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Footer: Selection Info + Action ─── */}
        <div className="px-6 sm:px-8 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
          {selectedFile ? (
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {selectedFile.type === "image" && (
                <img src={selectedFile.src} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" />
              )}
              {selectedFile.type === "video" && (
                <div className="relative w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                  <video src={selectedFile.src} className="w-full h-full object-cover opacity-70" muted preload="metadata" />
                  <Play className="w-3.5 h-3.5 text-coral absolute fill-current" />
                </div>
              )}
              {selectedFile.type !== "image" && selectedFile.type !== "video" && (
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-navy truncate">{selectedFile.name}</p>
                <p className="text-[10px] text-slate-400 font-medium truncate">{selectedFile.src}</p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 font-medium">
              {selectMode ? "Click to select, double-click to insert" : "Select a file to view details"}
            </p>
          )}
          
          {selectMode && (
            <button
              type="button"
              disabled={!selectedFile}
              onClick={() => {
                if (selectedFile && onSelect) {
                  onSelect(selectedFile.src, selectedFile);
                  onClose();
                }
              }}
              className={`
                px-5 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer
                ${selectedFile
                  ? "bg-coral text-white hover:bg-coral/90 shadow-md shadow-coral/25"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }
              `}
            >
              Insert Selected
            </button>
          )}

          {!selectMode && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-navy text-white hover:bg-navy/90 transition-all shrink-0 cursor-pointer shadow-md"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;
