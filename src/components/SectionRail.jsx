import { useEffect, useState } from "react";

export const SectionRail = ({ sections }) => {
  const [active, setActive] = useState(sections?.[0]?.id || "");

  useEffect(() => {
    if (!sections || sections.length === 0) return;
    const observers = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  return (
    <nav
      aria-label="Page sections"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-5"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center gap-3"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "bg-coral border-coral scale-125 shadow-warm"
                  : "bg-transparent border-navy/40 group-hover:border-coral"
              }`}
            />
            <span
              className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                isActive ? "text-coral opacity-100" : "text-navy/60 opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
};
