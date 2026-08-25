import { NavLink as RouterNavLink } from "react-router-dom";

export const NavLink = ({ to, label, end = false, className = "" }) => {
  return (<RouterNavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-3 py-2 text-sm font-bold rounded-md transition-colors ${
          isActive
            ? "text-coral bg-coral-pale/40 font-extrabold"
            : "text-navy hover:text-coral hover:bg-warm-gray"
        } ${className}`
      }
    >
      {label}
    </RouterNavLink>
  );
};
