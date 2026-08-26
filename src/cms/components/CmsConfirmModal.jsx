import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Compact MTSSO Confirmation Dialog (replaces window.confirm)
 */
export const CmsConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDestructive ? "bg-rose-50 border border-rose-100 text-rose-500" : "bg-orange-50 border border-orange-100 text-coral"
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-navy leading-tight">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-navy p-1 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs font-medium text-slate-600 mt-1.5 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs font-bold border-slate-200 text-slate-600 hover:bg-slate-50 h-8 px-3 rounded-lg"
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`text-xs font-extrabold h-8 px-4 rounded-lg shadow-xs ${
                isDestructive
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-coral hover:bg-coral-light text-white"
              }`}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsConfirmModal;
