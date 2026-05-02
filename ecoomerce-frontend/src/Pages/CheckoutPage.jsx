import React, { useEffect, useState } from "react";
import { Trash2, PackageCheck, ArrowLeft } from "lucide-react";

const CheckoutPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("lumina_cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const totalAmount = cart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    );

   const placeOrder = (id) => {
  const itemToOrder = cart.find(item => item._id === id);

  const savedOrders = JSON.parse(localStorage.getItem("lumina_orders")) || [];


  const updatedOrders = [...savedOrders, itemToOrder];

  localStorage.setItem("lumina_orders", JSON.stringify(updatedOrders));


  const updatedCart = cart.filter(item => item._id !== id);
  setCart(updatedCart);
  localStorage.setItem("lumina_cart", JSON.stringify(updatedCart));

  alert("Order placed successfully!");
};

    return (
        <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans p-4 md:p-10">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-serif font-black tracking-tight uppercase">Checkout</h1>
                    <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft size={16} /> Back to Shop
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {/* Items List */}
                        <div className="space-y-4">
                            {cart.map((item, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-amber-200 transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="h-16 w-16 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                                            <img src={item.images?.[0] || item.img} alt="" className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">{item.name}</h3>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Qty: {item.quantity}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 text-right">
                                        <div>
                                            <p className="text-amber-600 font-serif font-bold text-lg">
                                                ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => placeOrder(item._id)}
                                            className="bg-slate-900 hover:bg-amber-600 text-white p-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                                        >
                                            <PackageCheck size={16} />
                                            Order This
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Card */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-50">
                                <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Total Payable</span>
                                <span className="text-4xl font-serif font-black text-slate-900">₹{totalAmount.toLocaleString()}</span>
                            </div>

                            <button
                                onClick={() => placeOrder()}
                                className="w-full bg-slate-900 hover:bg-amber-600 text-white py-5 rounded-2xl font-black uppercase text-sm tracking-[0.3em] transition-all shadow-xl active:scale-[0.98]"
                            >
                                Place All Orders
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;