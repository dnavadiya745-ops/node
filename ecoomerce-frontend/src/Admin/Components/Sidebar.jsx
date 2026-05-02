import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users as UsersIcon,
  Package,
  PlusSquare,
  ChevronRight,
  Diamond
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "User Directory",
      path: "/admin/users",
      icon: <UsersIcon size={18} />,
    },
    {
      name: "Product Gallery",
      path: "/admin/products",
      icon: <Package size={18} />,
    },
    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: <PlusSquare size={18} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <Package size={18} />,
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-[#0F1115] text-white p-6 flex flex-col border-r border-white/5">

      {/* Brand Identity */}
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3 mb-1">
          <Diamond className="text-amber-500 fill-amber-500" size={20} />
          <h1 className="text-xl font-serif font-bold tracking-widest uppercase">
            Lumina
          </h1>
        </div>
        <p className="text-[9px] font-black tracking-[0.3em] text-slate-500 uppercase ml-8">
          Studio Control
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 flex-1">
        {menus.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${isActive
                  ? "bg-white/5 text-amber-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {/* Active Indicator Pillar */}
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-amber-500 rounded-r-full" />
              )}

              <div className="flex items-center gap-4">
                <span className={`${isActive ? "text-amber-500" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}>
                  {item.icon}
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.15em]">
                  {item.name}
                </span>
              </div>

              <ChevronRight
                size={14}
                className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
              />
            </Link>

          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-auto pt-6 border-t border-white/5 px-2">
        <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-2xl border border-amber-500/10">
          <p className="text-[10px] font-bold text-amber-500/80 leading-relaxed uppercase tracking-tighter">
            Lumina v3.0 Early Access
          </p>
          <p className="text-[9px] text-slate-500 mt-1">
            Handcrafted for luxury management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;