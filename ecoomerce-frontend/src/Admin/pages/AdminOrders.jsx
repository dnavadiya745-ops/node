import React, { useEffect, useState } from "react";
import { Trash2, ShoppingBag, Box, IndianRupee, ChevronDown, Clock, CheckCircle2, XCircle } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("lumina_orders")) || [];
    setOrders(data);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map(order =>
      String(order.id) === String(id) ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem("lumina_orders", JSON.stringify(updated));
  };

  const deleteOrder = (id) => {
    if (!window.confirm("Delete this order?")) return;
    const updated = orders.filter(order => String(order.id) !== String(id));
    setOrders(updated);
    localStorage.setItem("lumina_orders", JSON.stringify(updated));
  };

  const totalRevenue = orders.reduce((sum, o) => 
    sum + o.items.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0), 0
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="bg-slate-900 p-3 rounded-2xl text-white"><ShoppingBag size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Orders</p>
              <h2 className="text-xl font-bold">{orders.length}</h2>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="bg-slate-900 p-3 rounded-2xl text-white"><IndianRupee size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
              <h2 className="text-xl font-bold">₹{totalRevenue.toLocaleString()}</h2>
            </div>
          </div>
        </div>

        {/* 🧾 RECENT SHIPMENTS TABLE WITH BORDER */}
        <div className="bg-white rounded-[2rem] border-2 border-slate-200 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-2xl font-serif font-black italic tracking-tight">Recent Shipments</h2>
            <span className="bg-white border border-slate-200 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-slate-500 shadow-sm">
              Live Updates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  <th className="px-8 py-5">Order Details</th>
                  <th className="px-8 py-5">Items</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-black text-sm text-slate-900 leading-none">#{String(order.id).slice(-8).toUpperCase()}</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold">{new Date(order.date).toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        {order.items.map((item, i) => (
                          <p key={i} className="text-xs text-slate-600 font-medium">
                            <span className="font-black text-slate-900">{item.quantity || 1}x</span> {item.name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {/* STATUS DROPDOWN - CLEAN DESIGN */}
                      <div className="relative group min-w-[160px]">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`appearance-none w-full px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 cursor-pointer transition-all outline-none ${
                            order.status === "Delivered" ? "border-green-200 bg-green-50 text-green-700" :
                            order.status === "Cancelled" ? "border-red-200 bg-red-50 text-red-700" :
                            "border-amber-200 bg-amber-50 text-amber-700"
                          }`}
                        >
                          <option className="text-slate-900 font-bold bg-white">Pending</option>
                          <option className="text-slate-900 font-bold bg-white">Processing</option>
                          <option className="text-slate-900 font-bold bg-white">Delivered</option>
                          <option className="text-slate-900 font-bold bg-white">Cancelled</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-2xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No orders found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;