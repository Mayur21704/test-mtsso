import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * Route Guard for CMS Admin Area
 * Protects routes from unauthenticated access and preserves redirect URL
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-white font-sans">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-coral animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/admin/login?redirect=${redirectUrl}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
