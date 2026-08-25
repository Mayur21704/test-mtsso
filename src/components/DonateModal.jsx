import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Gift } from "lucide-react";

export const DonateModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl h-[95vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-4 pb-3 shrink-0 border-b">
          <DialogTitle className="flex items-center gap-3 text-xl font-extrabold text-navy">
            <Gift className="h-5 w-5 text-coral" />
            Secure Donation Form — Mission to Seafarers Canada (MTSSO)
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden p-2">
          <div className="w-full h-full bg-white rounded-lg border border-border overflow-hidden">
            <iframe
              src="https://www.canadahelps.org/en/dn/145961"
              title="CanadaHelps Secure Donation Form"
              className="w-full h-full border-none block bg-transparent"
              allow="payment"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
