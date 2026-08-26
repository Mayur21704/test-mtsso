import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

/**
 * Small, sleek MTSSO brand toast popup notification.
 */
export const CmsNotification = ({
  isOpen,
  onClose,
  type = "success", // "success" | "error" | "info"
  title,
  message,
  duration = 3500,
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50 border-emerald-100",
      accentBorder: "border-emerald-500",
    },
    error: {
      icon: AlertCircle,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50 border-rose-100",
      accentBorder: "border-rose-500",
    },
    info: {
      icon: Info,
      iconColor: "text-coral",
      iconBg: "bg-orange-50 border-orange-100",
      accentBorder: "border-coral",
    },
  };

  const current = typeConfig[type] || typeConfig.info;
  const Icon = current.icon;

  return (
    <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-3 duration-250 select-none">
      <div className="bg-white border border-slate-200 rounded-xl shadow-xl px-4 py-3 max-w-sm flex items-start gap-3 border-l-4 shadow-slate-900/10">
        <div className={`w-8 h-8 rounded-lg ${current.iconBg} border flex items-center justify-center shrink-0 mt-0.5`}>
          <Icon className={`w-4 h-4 ${current.iconColor}`} />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          {title && (
            <h4 className="text-xs font-extrabold text-navy leading-snug">
              {title}
            </h4>
          )}
          {message && (
            <p className="text-[11.5px] font-medium text-slate-600 leading-normal mt-0.5">
              {message}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-navy p-1 rounded-md transition-colors cursor-pointer shrink-0"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CmsNotification;
