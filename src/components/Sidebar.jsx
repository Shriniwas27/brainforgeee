import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Problems",
      path: "/problems",
      icon: "code",
    },
    {
      name: "Rooms (Multiplayer)",
      path: "/rooms",
      icon: "group",
    },
    {
      name: "Contribution Studio",
      path: "/studio",
      icon: "terminal",
    },
    {
      name: "Performance Stats",
      path: "/profile",
      icon: "insights",
    },
    {
      name: "Create Test",
      path: "/create-test",
      icon: "quiz",
    },
  ];

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="hidden lg:flex flex-col bg-surface border-r border-outline-variant py-stack-lg gap-stack-md w-80 h-screen sticky top-0 shrink-0 z-40 transition-colors duration-200 text-left animate-fade-in">
      {/* Profile Section */}
      <div className="px-6 mb-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant shadow-sm bg-surface-container shrink-0">
            <img
              alt="Alex Mercer Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1BuUHeqMH99PMu70w_Z_FbyERWcOr0UXWU0R5rEwYhxjeCFPxl6iTnP-LPbG0QFqk68NSm7yX7uXoG8J8MeIL9Rbi5dZxCC9NNnoZ5whFGeVNFPACRDvjal0DRCB_NSqNXigNxSe9VC-oAdprwAiX69kplC49vGxDopMd-hj6t2mtdFUpas0oN34sldenJDK6YCZD7UhckE3Sf4jyY7u2Zn3tLGQLHDetWwbfsSx5Qo5jFoknoUtWY86iDFFv63tCm-YVrQsevL84"
            />
          </div>
          <div className="min-w-0">
            {/* Increased username font from text-sm to text-base */}
            <p className="font-bold text-base text-on-surface truncate">Alex Mercer</p>
          </div>
        </div>

        <div>
          {/* Increased brand name font from text-base to text-xl */}
          <h2 className="font-headline-lg-mobile text-xl font-extrabold text-primary flex items-center gap-1.5 tracking-tighter">
            <span className="material-symbols-outlined text-[26px]">terminal</span>
            DevSolve
          </h2>
          {/* Increased subtitle font from text-[11px] to text-xs */}
          <p className="text-on-surface-variant text-xs mt-0.5 font-semibold">VIBRANT WORKSPACE</p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex flex-col gap-1 px-2 flex-grow overflow-y-auto">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 mx-2 rounded-xl transition-all ${
                active
                  ? "bg-secondary-container text-on-secondary-container font-bold scale-[0.98] glow-active shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface hover:translate-x-1 duration-200"
              }`}
            >
              {/* Increased icon font from text-[22px] to text-[24px] */}
              <span className="material-symbols-outlined text-[24px] flex items-center justify-center">
                {item.icon}
              </span>
              {/* Increased menu text font from text-xs to text-sm */}
              <span className="font-label-caps text-sm tracking-wider">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Actions */}
      <div className="px-4 mt-auto border-t border-outline-variant/30 pt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between px-2 py-1">
          <Link
            to="/login"
            className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors flex items-center gap-2 focus:outline-none w-full"
            title="Log In"
          >
            {/* Increased log in elements font */}
            <span className="material-symbols-outlined text-[22px]">login</span>
            <span className="font-label-caps text-sm tracking-wider font-bold">LOG IN</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
