import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignUp({ onAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUpTab, setIsSignUpTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Sync tab active state with current route (/signup or /login)
  useEffect(() => {
    if (location.pathname === "/login") {
      setIsSignUpTab(false);
    } else {
      setIsSignUpTab(true);
    }
  }, [location.pathname]);

  const handleTabChange = (signUpTab) => {
    setIsSignUpTab(signUpTab);
    if (signUpTab) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic password strength logic
  const getPasswordStrength = () => {
    const len = formData.password.length;
    if (len === 0) return 0;
    if (len < 6) return 1;
    if (len < 10) return 2;
    return 3;
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col md:flex-row transition-colors duration-200">

      {/* Left Column: Lumina Brand Showcase */}
      <section className="relative w-full md:w-1/2 min-h-[450px] md:min-h-screen flex flex-col justify-center px-margin-edge py-stack-lg overflow-hidden border-r border-outline-variant bg-surface-container-low/50">

        {/* Glow effects */}


        <div className="relative z-10 max-w-xl text-left mx-auto md:mx-0">

          <p className="font-body-md text-on-surface-variant text-lg mb-stack-lg max-w-md leading-relaxed">
            Experience a developer workspace designed for high-energy teams. Lumina-powered environments for <span className="syntax-highlighter-blue">pair programming</span>, real-time debugging, and global scalability.
          </p>

        </div>

        {/* Abstract Grid Illustration */}
        <div className="absolute bottom-12 right-12 w-48 h-48 opacity-10 hidden md:block">
          <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
            <div className="bg-primary rounded-sm"></div>
            <div></div>
            <div className="bg-secondary rounded-sm"></div>
            <div></div>
            <div></div>
            <div className="bg-tertiary rounded-sm"></div>
            <div></div>
            <div className="bg-primary rounded-sm"></div>
            <div className="bg-secondary rounded-sm"></div>
            <div></div>
            <div></div>
            <div className="bg-tertiary rounded-sm"></div>
            <div></div>
            <div className="bg-primary rounded-sm"></div>
            <div className="bg-secondary rounded-sm"></div>
            <div></div>
          </div>
        </div>

      </section>

      {/* Right Column: Register/Login Form */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-gutter md:p-margin-edge bg-surface">
        <div className="w-full max-w-md glass-card border border-outline-variant p-stack-lg rounded shadow-sm text-left">

          {/* Tabs */}
          <div className="flex border-b border-outline-variant mb-stack-lg">
            <button
              onClick={() => handleTabChange(false)}
              className={`flex-grow text-center py-3 font-label-caps text-xs tracking-wider transition-colors font-bold ${!isSignUpTab
                  ? "text-primary border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-on-surface"
                }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => handleTabChange(true)}
              className={`flex-grow text-center py-3 font-label-caps text-xs tracking-wider transition-colors font-bold ${isSignUpTab
                  ? "text-primary border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-on-surface"
                }`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          <div className="mb-stack-lg">
            <h2 className="font-headline-lg text-2xl font-bold mb-1 text-on-surface">
              {isSignUpTab ? "Join the Workspace" : "Welcome Back"}
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              {isSignUpTab
                ? "Start building with the DevSolve community today."
                : "Sign in to continue your collaborative sessions."}
            </p>
          </div>

          {/* OAuth Buttons */}
        

         

          {/* Form */}
          <form className="space-y-stack-md" onSubmit={(e) => e.preventDefault()}>

            {isSignUpTab && (
              <div>
                <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider mb-2">
                  FULL NAME
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 border border-outline-variant bg-surface rounded focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-body-md text-on-surface"
                  placeholder="Janice Developer"
                  type="text"
                />
              </div>
            )}

            <div>
              <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider mb-2">
                WORK EMAIL
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-outline-variant bg-surface rounded focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-body-md text-on-surface"
                placeholder="janice@studio.io"
                type="email"
              />
            </div>

            <div className="relative">
              <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant tracking-wider mb-2">
                PASSWORD
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-outline-variant bg-surface rounded focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-body-md text-on-surface pr-12"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>

              {isSignUpTab && formData.password.length > 0 && (
                <div className="mt-2.5 flex gap-1 h-1">
                  <div className={`flex-1 rounded-sm ${strength >= 1 ? "bg-error animate-pulse" : "bg-surface-container-highest"}`}></div>
                  <div className={`flex-1 rounded-sm ${strength >= 2 ? "bg-primary-container animate-pulse" : "bg-surface-container-highest"}`}></div>
                  <div className={`flex-1 rounded-sm ${strength >= 3 ? "bg-tertiary-container" : "bg-surface-container-highest"}`}></div>
                </div>
              )}
            </div>

            {isSignUpTab && (
              <div className="flex items-start gap-3 py-2">
                <input
                  className="mt-1 w-4 h-4 text-primary border-outline-variant focus:ring-primary rounded-sm cursor-pointer"
                  type="checkbox"
                  id="agree"
                />
                <label htmlFor="agree" className="font-body-md text-xs text-on-surface-variant leading-relaxed select-none cursor-pointer">
                  I agree to the{" "}
                  <a className="text-primary font-bold hover:underline" href="#">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a className="text-primary font-bold hover:underline" href="#">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            )}

            <button
              onClick={() => {
                onAuthenticated();
                navigate("/rooms");
              }}
              className="w-full h-14 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-label-caps text-sm font-bold tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-2 rounded shadow-sm"
            >
              {isSignUpTab ? "GET STARTED" : "LOG IN"}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

          </form>



        </div>
      </section>

    </div>
  );
}
