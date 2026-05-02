import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Users, Package, ShoppingBag, Sparkles, TrendingUp, ArrowUpRight, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("lumina_orders")) || []);
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
  }, []);

  // Calculate Total Revenue
  const totalRevenue = orders.reduce((sum, o) =>
    sum + o.items.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0), 0
  );

  return (
    <div className="flex min-h-screen bg-[#FDFDFB]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8 md:p-12 overflow-y-auto">

          {/* WELCOME HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-5xl font-serif font-black text-slate-900 tracking-tight flex items-center gap-3">
                Overview <Sparkles className="text-amber-500 fill-amber-500" size={32} />
              </h1>
              <p className="text-slate-400 font-medium mt-2 uppercase text-[10px] tracking-[0.3em]">
                Lumina Interiors • Admin Intelligence Portal
              </p>
            </div>
            <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                <p className="text-xl font-serif font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl text-white">
                <DollarSign size={20} />
              </div>
            </div>
          </div>

          {/* KPI GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

            {/* STAT CARD: USERS */}
            <div className="group bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 bg-slate-50 w-32 h-32 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Users size={24} />
                  </div>
                  <ArrowUpRight className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Clientele</p>
                <h2 className="text-4xl font-serif font-black text-slate-900">{users.length}</h2>
                <div className="mt-4 flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase">
                  <TrendingUp size={12} /> +12% this month
                </div>
              </div>
            </div>

            {/* STAT CARD: PRODUCTS */}
            <div className="group bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Package size={24} />
                  </div>
                  <ArrowUpRight className="text-slate-300 group-hover:text-amber-600 transition-colors" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Curation Count</p>
                <h2 className="text-4xl font-serif font-black text-slate-900">{products.length}</h2>
                <p className="mt-4 text-slate-400 font-bold text-[10px] uppercase tracking-tighter italic">Dimensional Inventory Active</p>
              </div>
            </div>

            {/* STAT CARD: ORDERS */}
            <div className="group bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10">
                <ShoppingBag size={140} className="text-white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="bg-white/10 text-white p-4 rounded-2xl">
                    <ShoppingBag size={24} />
                  </div>
                  <ArrowUpRight className="text-white/30" />
                </div>
                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Total Shipments</p>
                <h2 className="text-4xl font-serif font-black text-white">{orders.length}</h2>
                <div className="mt-4 inline-block bg-amber-500 text-slate-900 px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest">
                  {orders.length > 0 ? "Growth Recorded" : "Awaiting Sales"}
                </div>
              </div>
            </div>

          </div>

          {/* RECENT ACTIVITY SECTION */}
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="text-2xl font-serif font-black text-slate-900 italic">
                  Recent Activity
                </h3>
                <div className="h-1 w-12 bg-amber-500 mt-2 rounded-full" />
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                View All Transactions
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[2rem]">
                <p className="text-slate-300 font-serif italic">No architectural sales recorded yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.slice(-5).reverse().map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-6 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 font-black text-xs">
                        #{String(order.id).slice(-2)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                          Collection Order #{String(order.id).toUpperCase().slice(-8)}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
                          {new Date(order.date).toDateString()} • {new Date(order.date).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:block text-right px-10">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                        Inventory Detail
                      </p>
                      <div className="flex flex-col items-end">
                        {order.items.slice(0, 2).map((item, i) => (
                          <p key={i} className="text-[11px] font-bold text-slate-600">
                            {item.name} <span className="text-amber-500">x{item.quantity || 1}</span>
                          </p>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-[9px] font-black text-slate-400 uppercase">
                            + {order.items.length - 2} more items
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`text-[9px] px-5 py-2 rounded-full font-black uppercase tracking-widest shadow-sm ${order.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}>
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;