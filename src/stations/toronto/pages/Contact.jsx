import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import contactBg from "@/assets/contact-banner.jpg";
const interests = [
  "Seafarer support",
  "Volunteering",
  "Donating goods or services",
  "Local partnership",
  "Media inquiry",
  "Other"
];
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const handleIframeLoad = () => {
    if (isSubmitting) {
      toast({
        title: "Thank You",
        description: "Your inquiry has been successfully sent. We will be in touch with you shortly."
      });
      setIsSubmitting(false);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };
  return <>{
    /* Hero Section - Matched to Navy Style */
  }<section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-navy min-h-[45vh] flex items-center justify-center border-b border-navy-dark">{
    /* Background Image & Overlays */
  }<div className="absolute inset-0 z-0"><img
    src={contactBg}
    alt="Contact Background Placeholder"
    className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
  /><div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/60 to-transparent" /></div>{
    /* Hero Content */
  }<div className="container-page relative z-10 text-center max-w-4xl mx-auto"><div className="mb-6 flex justify-center"><span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/20 text-coral-light text-xs font-extrabold uppercase tracking-widest border border-coral/30"><Mail className="w-4 h-4 text-coral-light" /> Contact
            </span></div><h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Contact Mission to Seafarers Toronto
          </h1><p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium">
            We would love to hear from you.
          </p></div></section>{
    /* Main Content Section */
  }<section className="py-20 md:py-28 bg-white"><div className="container-page grid lg:grid-cols-12 gap-10 items-start">{
    /* Contact info */
  }<div className="lg:col-span-5 space-y-5"><div className="rounded-2xl bg-gradient-hero text-white p-7 md:p-8 shadow-soft"><h2 className="text-2xl font-extrabold !text-white">Toronto Station</h2><p className="mt-2 text-white/85 text-sm">Local support at the Port of Toronto.</p><ul className="mt-7 space-y-4 text-sm"><li className="flex gap-3.5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15"><MapPin className="h-4 w-4 text-coral-light" /></span><span><span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Location</span>
                    Cruise Ship Terminal, 8 Unwin Ave, Toronto, ON M5A 1A1, Canada
                  </span></li><li className="flex gap-3.5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15"><Mail className="h-4 w-4 text-coral-light" /></span><span><span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Email</span><a href="mailto:glutenfreepriest@gmail.com" className="text-white hover:text-coral-light transition-colors underline">
                      glutenfreepriest@gmail.com
                    </a></span></li><li className="flex gap-3.5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15"><Phone className="h-4 w-4 text-coral-light" /></span><span><span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Phone</span><a href="tel:+14164695391" className="text-white hover:text-coral-light transition-colors underline">
                      +1 416-469-5391
                    </a></span></li><li className="flex gap-3.5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15"><Clock className="h-4 w-4 text-coral-light" /></span><span><span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Hours</span>
                    By appointment and during ship visits
                  </span></li></ul></div><div className="rounded-2xl border border-border bg-warm-gray p-6 text-sm text-text-mid leading-relaxed"><p className="mb-3">
                Mission to Seafarers Toronto operates as part of Mission to Seafarers Canada.
              </p><p className="mb-3">
                Local volunteer opportunities, station engagement, community support, and monthly and one-time donations are coordinated through the Toronto station.
              </p><p>
                Major gifts and national corporate partnerships are managed through the National Office, Mission to Seafarers Canada.
              </p></div></div>{
    /* Form wrapper */
  }<div className="lg:col-span-7 rounded-2xl bg-warm-gray p-6 md:p-8 shadow-card space-y-5"><div className="flex items-center gap-2 mb-2"><Send className="h-6 w-6 text-coral" /><h2 className="text-xl md:text-3xl font-extrabold text-navy">Send Us a Message</h2></div><p className="text-gray-600 font-medium leading-relaxed pb-4 border-b border-gray-200">
              Whether you are a seafarer, volunteer, supporter, or community partner, we welcome your questions and inquiries.
            </p>{
    /* Hidden iframe triggers handleIframeLoad when Google Form finishes processing */
  }<iframe
    name="hidden_iframe"
    id="hidden_iframe"
    style={{ display: "none" }}
    onLoad={handleIframeLoad}
  /><form
    ref={formRef}
    className="space-y-5"
    action="https://docs.google.com/forms/d/e/1FAIpQLSdDRLf8Fjde4Y-q1oUmoa_5JAbmAFp5TeG0RV3qjyVL3Aabhg/formResponse"
    method="POST"
    target="hidden_iframe"
    onSubmit={() => setIsSubmitting(true)}
  ><div className="grid sm:grid-cols-2 gap-4"><div><Label htmlFor="cname">Name *</Label><Input
    id="cname"
    name="entry.2050372848"
    required
    className="mt-1.5 bg-white text-navy font-medium"
  /></div><div><Label htmlFor="cemail">Email *</Label><Input
    id="cemail"
    type="email"
    name="entry.608487628"
    required
    className="mt-1.5 bg-white text-navy font-medium"
  /></div><div><Label htmlFor="cphone">Phone</Label><Input
    id="cphone"
    type="tel"
    name="entry.278774456"
    className="mt-1.5 bg-white text-navy font-medium"
  /></div><div><Label htmlFor="cinterest">I am interested in... *</Label><select
    id="cinterest"
    name="entry.1990273286"
    required
    defaultValue=""
    className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm font-medium text-navy"
  ><option value="" disabled>Select an option...</option>{interests.map((i) => <option key={i} value={i}>{i}</option>)}</select></div><div className="sm:col-span-2"><Label htmlFor="cmessage">Message *</Label><Textarea
    id="cmessage"
    name="entry.1454859148"
    required
    rows={5}
    className="mt-1.5 bg-white text-navy font-medium resize-none"
  /></div></div><Button
    type="submit"
    size="lg"
    disabled={isSubmitting}
    className="w-full bg-coral hover:bg-coral-light text-white font-bold shadow-warm h-12"
  >{isSubmitting ? "Sending..." : "Submit Inquiry"} <Send className="ml-2 h-4 w-4" /></Button></form></div></div></section></>;
};
export default Contact;
