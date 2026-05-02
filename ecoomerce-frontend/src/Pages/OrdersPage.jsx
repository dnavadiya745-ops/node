import React, { useEffect, useState } from "react";
import { Trash2, Package, Clock, CheckCircle2, XCircle } from "lucide-react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("lumina_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const cancelOrder = (id) => {
    const updatedOrders = orders.map(order =>
      String(order.id) === String(id)
        ? { ...order, status: "Cancelled" }
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("lumina_orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg">
            <Package size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-black uppercase tracking-tight text-slate-900">Your Orders</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Lumina Interiors Collection</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-xl hover:shadow-slate-200/50">
                
                {/* Order Top Bar */}
                <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-10">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Ref</p>
                      <p className="text-sm font-bold text-slate-900">#{String(order.id).slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                      <p className="text-sm font-bold text-slate-700">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.1em] ${
                    order.status === "Delivered" ? "bg-green-50 text-green-600" :
                    order.status === "Cancelled" ? "bg-red-50 text-red-500" :
                    "bg-amber-50 text-amber-600"
                  }`}>
                    {order.status === "Delivered" ? <CheckCircle2 size={14} /> : 
                     order.status === "Cancelled" ? <XCircle size={14} /> : <Clock size={14} />}
                    {order.status}
                  </div>
                </div>

                {/* Order Items Section - Image focus */}
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Big Images List */}
                    <div className="flex-1 space-y-6">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex gap-6 items-center">
                          {/* હજી મોટી ઈમેજ: w-32 h-32 (128px x 128px) */}
                          <div className="w-32 h-32 flex-shrink-0 bg-slate-50 rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-inner">
                             <img 
                               src={item.images?.[0] || item.img} 
                               alt={item.name} 
                               className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" 
                             />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">{item.name}</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                            <p className="mt-2 text-amber-600 font-serif font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary & Footer Sidebar */}
                    <div className="w-full lg:w-80 space-y-6">
                      <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</span>
                            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{order.payment}</span>
                          </div>
                          <div className="pt-4 border-t border-slate-200">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Payable</p>
                            <p className="text-3xl font-serif font-black text-slate-900">
                              ₹{order.items.reduce((t, item) => t + item.price * item.quantity, 0).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {order.status !== "Cancelled" && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="mt-8 w-full flex items-center justify-center gap-2 bg-white border border-red-100 text-red-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <Trash2 size={14} /> Cancel Order
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;