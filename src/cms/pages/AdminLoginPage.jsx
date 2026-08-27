import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, Clock, ShieldCheck, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, sessionExpired, setSessionExpired } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check URL query for expired flag
  const query = new URLSearchParams(location.search);
  const isExpired = query.get("expired") === "1" || sessionExpired;
  let redirectPath = "/admin/stories";
  try {
    const rawRedirect = query.get("redirect");
    if (rawRedirect) {
      redirectPath = decodeURIComponent(rawRedirect);
    }
  } catch (e) {
    redirectPath = "/admin/stories";
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      setSessionExpired(false);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-slate-100/70 text-slate-900 font-sans selection:bg-coral selection:text-white">
      {/* ─── TOP BRAND HEADER ─── */}
      <header className="h-16 px-6 sm:px-10 border-b border-slate-200 bg-white shadow-2xs flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="MTSSO" className="h-9 w-auto rounded-md bg-white p-0.5 shadow-2xs shrink-0 group-hover:scale-105 transition-transform" />
          <div>
            <span className="text-sm font-black tracking-wider text-navy uppercase block leading-none">
              MTSSO
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 block">
              Central CMS Portal
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="text-xs font-bold text-slate-600 hover:text-coral transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Site
        </Link>
      </header>

      {/* ─── MAIN LOGIN WORKSPACE ─── */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-50">
        <div className="w-full max-w-[420px] bg-white rounded-2xl p-7 sm:p-8 shadow-xl border border-slate-200 text-slate-900 animate-in fade-in duration-200">
          
          {/* Header Icon & Title */}
          <div className="text-center space-y-1.5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-coral-pale text-coral flex items-center justify-center mx-auto shadow-2xs mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-navy tracking-tight">
              Admin Authentication
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Sign in to manage news, seafarer stories, and visual blocks
            </p>
          </div>

          {/* Session Expired Notice */}
          {isExpired && (
            <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5 text-xs animate-in fade-in duration-150">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold block">Session Expired</strong>
                <span className="text-slate-600">Your login session has expired. Please sign in again.</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2.5 text-xs font-bold animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-navy uppercase tracking-wider block">
                Admin Email
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin Email"
                  autoComplete="email"
                  required
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50/60 border border-slate-200 text-sm font-semibold text-navy placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/15 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-navy uppercase tracking-wider block">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50/60 border border-slate-200 text-sm font-semibold text-navy placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:bg-white focus:border-coral focus:ring-2 focus:ring-coral/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-navy transition-colors cursor-pointer p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-1 rounded-xl bg-coral hover:bg-coral-light text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-warm transition-all cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer branding text */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              Mission to Seafarers Southern Ontario
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLoginPage;
