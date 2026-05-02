import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart, Search, Menu, Percent, LayoutGrid,
  User, ChevronLeft, Minus, ChevronRight, Star, Plus, X, Package, Heart, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // LocalStorage Logic
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('lumina_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('lumina_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("lumina_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/product/all");
        const data = res.data.products || res.data;
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Search & Filter Logic (Original maintained)
  useEffect(() => {
    let result = products;
    if (activeCategory !== "All") {
      result = result.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());
    }
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredProducts(result);
  }, [searchQuery, activeCategory, products]);

  useEffect(() => {
    localStorage.setItem("lumina_orders", JSON.stringify(orders));
  }, [orders]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find(item => item._id === product._id)
        ? prev.filter(item => item._id !== product._id)
        : [...prev, product]
    );
  };


  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item._id === product._id);
      const maxStock = product.stock || 10;

      if (existingItem) {
        if ((existingItem.quantity || 1) >= maxStock) {
          alert(`Only ${maxStock} items available in stock!`);
          return prev;
        }

        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setActiveDrawer('cart');
  };

  const placeSingleOrder = (item) => {
    const newOrder = {
      id: Date.now(),
      items: [item], // ✅ ONLY ONE ITEM
      date: new Date(),
      status: "Pending",
      payment: "Paid"
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("lumina_orders")) || [];

    localStorage.setItem(
      "lumina_orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    alert(`${item.name} order placed!`);

    // remove that item from cart
    setCart(prev => prev.filter(p => p._id !== item._id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item._id === id) {
          const currentQty = item.quantity || 1;
          const maxStock = item.stock || 10;

          if (delta === 1 && currentQty >= maxStock) {
            alert(`Only ${maxStock} items available in stock!`);
            return item;
          }

          const newQty = currentQty + delta;

          if (newQty >= 1 && newQty <= maxStock) {
            return { ...item, quantity: newQty };
          }
        }
        return item;
      })
    );
  };

  const removeItem = (id, type) => {
    if (type === 'cart') setCart(cart.filter(item => item._id !== id));
    else setWishlist(wishlist.filter(item => item._id !== id));
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans selection:bg-amber-200 overflow-x-hidden">

      {/* --- SIDE DRAWER SYSTEM --- */}
      {activeDrawer && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setActiveDrawer(null)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-2xl font-serif font-bold uppercase tracking-tight">
                {activeDrawer === 'cart' ? 'Your Cart' : 'Your Wishlist'}
              </h2>
              <button onClick={() => setActiveDrawer(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X />
              </button>
            </div>
            <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-250px)] no-scrollbar">
              {activeDrawer === 'cart' && cart.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-amber-200 transition-all shadow-sm mb-4">
                  {/* પ્રોડક્ટ ઈમેજ */}
                  <img src={item.images?.[0] || item.img} className="w-20 h-20 object-cover rounded-xl shadow-sm" alt={item.name} />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{item.name}</h4>
                      <button onClick={() => removeItem(item._id, 'cart')} className="text-slate-300 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Dynamic Price Box (અહીં ફેરફાર છે) */}
                      <div className="flex flex-col gap-1">
                        <p className="text-amber-600 font-serif font-bold">
                          ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                        </p>

                        {/* Stock Info: આ નવી લાઈન છે */}
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-tighter">
                            Stock: {item.stock || 10}
                          </span>
                          <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md">
                            Left: {(item.stock || 10) - (item.quantity || 1)}
                          </span>
                        </div>
                      </div>

                      {/* Plus/Minus Controls (આ એમનેમ જ રહેશે) */}
                      <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-all disabled:opacity-20"
                          disabled={(item.quantity || 1) <= 1}
                        >
                          <Minus size={12} />
                        </button>

                        <span className="w-8 text-center font-bold text-xs text-slate-800">
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() => {
                            if ((item.quantity || 1) >= (item.stock || 10)) {
                              alert(`Only ${item.stock || 10} items available in stock!`);
                              return;
                            }
                            updateQuantity(item._id, 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-all"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
            {activeDrawer === 'cart' && cart.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-white border-t border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Amount</span>
                  <span className="text-2xl font-serif font-black text-slate-900">
                    ₹{cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (cart.length === 0) {
                      alert("Cart is empty!");
                      return;
                    }

                    const newOrder = {
                      id: Date.now(),
                      items: cart,
                      date: new Date(),
                      status: "Pending",
                      payment: "Paid"
                    };

                    const existingOrders =
                      JSON.parse(localStorage.getItem("lumina_orders")) || [];

                    setOrders(prev => [...prev, newOrder]);

                    alert("Order Placed Successfully!");

                    setCart([]);
                    localStorage.removeItem("lumina_cart");
                  }}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl"
                >
                  Checkout Now
                </button>
              </div>
            )}
            {activeDrawer === 'wishlist' && wishlist.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm mb-4">

                <img
                  src={item.images?.[0] || item.img}
                  className="w-20 h-20 object-cover rounded-xl"
                  alt={item.name}
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm">{item.name}</h4>

                    <button
                      onClick={() => removeItem(item._id, 'wishlist')}
                      className="text-slate-300 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p className="text-amber-600 font-bold">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2 text-xs bg-slate-900 text-white px-3 py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            ))}
            {activeDrawer === 'wishlist' && wishlist.length === 0 && (
              <p className="text-center text-slate-400">Wishlist is empty</p>
            )}
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group cursor-pointer shrink-0" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveCategory("All"); }}>
              <div className="w-11 h-11 bg-slate-900 rounded-2xl rotate-3 shadow-lg group-hover:rotate-0 group-hover:bg-amber-600 transition-all duration-500 flex items-center justify-center">
                <span className="text-white font-black text-xl tracking-tighter">L</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-black tracking-widest text-slate-900 leading-none">LUMINA</span>
                <span className="text-[10px] font-bold text-amber-600 tracking-[0.2em] uppercase">Interiors</span>
              </div>
            </div>

            <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-2xl border border-transparent focus-within:border-amber-400 transition-all w-64">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search pieces..." className="bg-transparent border-none outline-none px-3 text-sm w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>

            <div className="hidden lg:flex items-center gap-10">
              <button onClick={() => scrollToSection('dimensional-spaces')} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-amber-600">
                <LayoutGrid size={16} /> Dimensional Spaces
              </button>
              <button onClick={() => scrollToSection('sensory-comfort')} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-amber-600">
                <Star size={16} /> Sensory Comfort
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => setActiveDrawer('wishlist')} className="p-3 text-slate-600 hover:text-red-500 rounded-2xl relative transition-all">
                <Heart className={`h-6 w-6 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {wishlist.length > 0 && <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full border-2 border-white flex items-center justify-center font-bold">{wishlist.length}</span>}
              </button>
              <button onClick={() => setActiveDrawer('cart')} className="relative p-3 bg-slate-900 text-white hover:bg-amber-600 rounded-2xl transition-all shadow-md">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-[10px] w-6 h-6 rounded-full border-2 border-white flex items-center justify-center font-black">{cart.length}</span>}
              </button>
              <Link to="/orders">
                <button className="p-3 text-slate-600 hover:text-amber-500 rounded-2xl relative transition-all">
                  <Package className="h-6 w-6" />
                  {orders.length > 0 && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-[9px] w-4 h-4 rounded-full border-2 border-white flex items-center justify-center font-bold">
                      {orders.length}
                    </span>
                  )}
                </button>
              </Link>
              <div className="h-8 w-[1px] bg-slate-200 mx-2" />
              <Link to='/joinus'>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-2xl hover:bg-slate-200 transition-all text-xs font-black uppercase tracking-widest">
                  <User className="h-4 w-4 text-amber-600" /> Sign In
                </button>
              </Link>
            </div>

            <button className="lg:hidden p-2.5 bg-slate-100 rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative px-4 py-8 lg:py-12 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 min-h-[500px] flex items-center shadow-2xl">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full" />
          <div className="relative z-10 px-8 lg:px-20 w-full lg:w-3/5">
            <h1 className="text-6xl lg:text-[5.5rem] font-serif text-white mb-8 leading-[0.9]">
              Sculptural <br /> <span className="italic text-amber-500">Form.</span>
            </h1>
            <p className="text-slate-400 text-lg mb-10 max-w-md">Discover artisanal pieces for the modern home.</p>
            <button onClick={() => scrollToSection('sensory-comfort')} className="px-10 py-5 bg-amber-500 text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-xl">
              Shop Collection
            </button>
          </div>
          <div className="hidden lg:block absolute right-0 w-2/5 h-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
          </div>
        </div>
      </section>

      {/* --- DIMENSIONAL SPACES (Updated with Logic) --- */}
      <section id="dimensional-spaces" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-serif font-bold">Dimensional Spaces</h2>
          <button onClick={() => setActiveCategory("All")} className="text-xs font-black uppercase tracking-widest text-amber-600 underline">Reset Selection</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Lounge', img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' },
            { name: 'Bedroom', img: 'https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=800' },
            { name: 'Textiles', img: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=800' },
            { name: 'Illumination', img: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=800' }
          ].map((cat, i) => (
            <div
              key={i}
              onClick={() => { setActiveCategory(cat.name); scrollToSection('sensory-comfort'); }}
              className={`group relative h-64 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg transition-all ${activeCategory === cat.name ? 'ring-4 ring-amber-500' : ''}`}
            >
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-amber-600/30 transition-colors z-10" />
              <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.name} />
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-20">
                <span className="text-white font-bold text-2xl">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SENSORY COMFORT (Product Display) --- */}
      <section id="sensory-comfort" className="py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold">New Sensory Comfort</h2>
            <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest">{activeCategory} Collections</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scroll('left')} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-amber-500 hover:text-white transition-all"><ChevronLeft /></button>
            <button onClick={() => scroll('right')} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-amber-500 hover:text-white transition-all"><ChevronRight /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex overflow-x-auto gap-8 px-4 sm:px-[calc((100vw-1280px)/2+1rem)] pb-10 no-scrollbar snap-x scroll-smooth">
          {filteredProducts.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[280px] sm:w-[380px] snap-start group">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-6 bg-white shadow-xl">
                <img src={item.images?.[0] || item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <button onClick={() => toggleWishlist(item)} className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-sm rounded-xl z-20">
                  <Heart className={`h-5 w-5 ${wishlist.find(w => w._id === item._id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                </button>
                <button onClick={() => addToCart(item)} className="absolute bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-600">
                  <Plus className="h-6 w-6" />
                </button>
              </div>
              <div className="flex justify-between items-end px-2">
                <h3 className="text-xl font-bold line-clamp-1">{item.name}</h3>
                <span className="text-2xl font-serif font-bold text-amber-600">₹{item.price}</span>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="w-full text-center py-20 text-slate-400 italic">No products found...</div>
          )}
        </div>
      </section>

      {/* --- FLASH DEALS --- */}
      <section className="max-w-7xl mx-auto px-4 py-16 mb-16">
        <div className="bg-amber-400 rounded-[3.5rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-5xl font-serif font-black text-slate-900 mb-4">FLASH WEEKEND.</h2>
            <p className="text-slate-800/60 font-bold uppercase text-xs tracking-widest">Extra 30% off modern textiles</p>
          </div>
          <button className="relative z-10 px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl">Claim Discount</button>
          <div className="absolute top-[-20%] right-[-5%] text-white/20 -rotate-12 pointer-events-none">
            <Percent size={400} />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0F1115] text-slate-300 py-12 border-t border-slate-800/50 relative overflow-hidden font-serif">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/5 blur-[120px] rounded-full -mr-20 -mt-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">

            {/* 1. Brand Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  LU<span className="text-amber-500 font-black">M</span>INA
                </h2>
                <div className="h-4 w-[1px] bg-slate-700" />
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-slate-500">
                  Est. 2026
                </span>
              </div>
              <p className="text-sm leading-relaxed italic text-slate-400 max-w-[280px]">
                "We craft sanctuaries through modern aesthetics and artisanal excellence, redefining comfort for the contemporary era."
              </p>
            </div>

            {/* 2. Navigation - Balanced & Proper */}
            <div className="space-y-5">
              <h4 className="text-amber-500 font-sans font-black text-[10px] uppercase tracking-[0.2em]">Quick Access</h4>
              <nav className="grid grid-cols-1 gap-3">
                {[
                  { name: 'Dimensional Spaces', id: 'dimensional-spaces' },
                  { name: 'Sensory Comfort', id: 'sensory-comfort' },
                  { name: 'Your Wishlist', action: () => setActiveDrawer('wishlist') },
                  { name: 'Checkout Cart', action: () => setActiveDrawer('cart') }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.id ? () => scrollToSection(item.id) : item.action}
                    className="text-[13px] text-slate-400 hover:text-white transition-all text-left flex items-center gap-3 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-amber-500 transition-all duration-300" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* 3. Visual Element - Professional Image Card */}
            <div className="hidden lg:block">
              <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  alt="Interior"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
              </div>
            </div>

            {/* 4. Contact & Top Scroll */}
            <div className="flex flex-col items-center lg:items-end gap-6">
              <div className="text-center lg:text-right space-y-1">
                <p className="font-sans text-[9px] font-bold text-slate-500 uppercase tracking-widest">Inquiries</p>
                <p className="text-base text-slate-200">studio@lumina.com</p>
                <p className="text-[11px] text-slate-500 font-sans">Surat, Gujarat — India</p>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-3 text-[10px] font-sans font-black uppercase tracking-widest text-slate-500 hover:text-amber-500 transition-all group"
              >
                Top
                <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-amber-500 transition-all">
                  <ChevronRight className="-rotate-90 text-amber-500" size={14} />
                </div>
              </button>
            </div>

          </div>

          {/* Bottom Minimal Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-[8px] font-bold text-slate-600 uppercase tracking-[0.5em]">
              © 2026 LUMINA INTERIORS. CRAFTED BY HAND.
            </p>
            <div className="flex gap-8">
              {['Instagram', 'Pinterest'].map((social) => (
                <button key={social} className="font-sans text-[9px] font-bold uppercase tracking-widest text-slate-600 hover:text-white transition-colors">
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default HomePage;