import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";
export const SiteFooter = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  return <footer className="bg-navy-dark text-white/90 mt-"><div className="container-page py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4"><div><Link
    to="/"
    className="flex items-center gap-2.5 group"
    onClick={handleScrollToTop}
  ><img
    src={logo}
    alt="Mission to Seafarers Logo"
    className="h-16 md:h-20 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform"
  /><span className="flex flex-col leading-none justify-center"><span className="text-[16px] md:text-[18px] font-extrabold text-white whitespace-nowrap">Mission to Seafarers</span><span className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.18em] text-coral-light mt-0.5 whitespace-nowrap">Toronto</span></span></Link><p className="mt-5 text-sm leading-relaxed text-white/70">
            A local presence at the Port of Toronto. Part of Mission to Seafarers Canada and the global
            network in 200+ ports.
          </p></div><div><h4 className="text-sm font-extrabold uppercase tracking-wider text-coral-light mb-4">Explore</h4><ul className="space-y-2.5 text-sm">{[
    ["About", "/about"],
    ["Seafarer Support", "/support"],
    ["Get Involved", "/get-involved"],
    ["Contact", "/contact"]
  ].map(([l, h]) => <li key={h}><Link
    to={h}
    className="hover:text-coral-light transition-colors"
    onClick={handleScrollToTop}
  >{l}</Link></li>)}</ul></div><div><h4 className="text-sm font-extrabold uppercase tracking-wider text-coral-light mb-4">Toronto Station</h4><ul className="space-y-3 text-sm"><li className="flex gap-2.5"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-coral-light" />Port of Toronto, ON</li><li className="flex gap-2.5"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-coral-light" /><a href="mailto:glutenfreepriest@gmail.com" className="hover:text-coral-light transition-colors">
                glutenfreepriest@gmail.com
              </a></li>{
    /* <li className="flex gap-2.5"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-coral-light" />By appointment</li> */
  }</ul></div><div><h4 className="text-sm font-extrabold uppercase tracking-wider text-coral-light mb-4">National Office</h4><p className="text-sm text-white/70 leading-relaxed">
            Major gifts, corporate partnerships are managed through{" "}<span className="text-white font-semibold">Mission to Seafarers Canada</span>.
          </p></div></div><div className="border-t border-white/10"><div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60"><p>© {(/* @__PURE__ */ new Date()).getFullYear()} Mission to Seafarers Toronto. All rights reserved.</p><p>Toronto station of Mission to Seafarers Southern Ontario · Part of Mission to Seafarers Canada</p></div></div></footer>;
};
