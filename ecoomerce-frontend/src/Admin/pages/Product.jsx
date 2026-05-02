import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Trash2, Package, Plus, Sparkles, AlertCircle, X, Save, Image as ImageIcon } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Badha 8-10 fields mate state setup
  const [editingProduct, setEditingProduct] = useState({
    _id: "",
    name: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    description: "",
    images: [""], // Array format
    isNewProduct: false,
    discount: ""
  });

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/all");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Remove this masterpiece?")) {
      try {
        await api.delete(`/product/${id}`);
        alert("Product removed");
        fetchProducts();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  // 1. Edit Click: Badho data Modal ma bharva mate
  const handleEditClick = (product) => {
    setEditingProduct({
      _id: product._id,
      name: product.name || "",
      price: product.price || "",
      stock: product.stock || "",
      brand: product.brand || "",
      category: product.category || "",
      description: product.description || "",
      images: product.images || [""],
      isNewProduct: product.isNewProduct || false,
      discount: product.discount || ""
    });
    setIsEditModalOpen(true);
  };

  // 2. Update API Call
  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
   
    await api.put(`/product/${editingProduct._id}`, editingProduct);
    
    alert("Product updated successfully!");
    setIsEditModalOpen(false);
    fetchProducts(); 
  } catch (error) {
    console.error("Update Error:", error);
    alert("Update failed. Make sure you are logged in as Admin.");
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#FAF9F6] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Navbar />

        <main className="p-8 lg:p-12">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 flex items-center gap-3">
                The Collection <Package className="text-amber-500" />
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img src={product.images?.[0] || "https://via.placeholder.com/300"} className="h-full w-full object-cover" alt={product.name} />
                </div>
                <div className="p-7 flex-1">
                  <h2 className="text-xl font-serif font-bold">{product.name}</h2>
                  <p className="text-amber-600 font-bold mt-2">₹ {product.price}</p>
                  
                  <div className="mt-8 pt-6 border-t flex justify-between">
                    <button onClick={() => handleEditClick(product)} className="text-[10px] font-black uppercase text-slate-400 hover:text-amber-600">
                      Edit Full Details
                    </button>
                    <button onClick={() => deleteProduct(product._id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* --- FULL FIELD EDIT MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-serif font-bold text-slate-900">Update Masterpiece</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field 1: Name */}
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Product Name</label>
                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full px-5 py-3 bg-slate-100 rounded-xl outline-none" />
              </div>

              {/* Field 2: Price */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Price (₹)</label>
                <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full px-5 py-3 bg-slate-100 rounded-xl outline-none" />
              </div>

              {/* Field 3: Stock */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Stock Quantity</label>
                <input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})} className="w-full px-5 py-3 bg-slate-100 rounded-xl outline-none" />
              </div>

              {/* Field 4: Brand */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Brand</label>
                <input type="text" value={editingProduct.brand} onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})} className="w-full px-5 py-3 bg-slate-100 rounded-xl outline-none" />
              </div>

              {/* Field 5: Category */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Category</label>
                <input type="text" value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full px-5 py-3 bg-slate-100 rounded-xl outline-none" />
              </div>

              {/* Field 6: Image URL */}
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Main Image URL</label>
                <input type="text" value={editingProduct.images[0]} onChange={(e) => setEditingProduct({...editingProduct, images: [e.target.value]})} className="w-full px-5 py-3 bg-slate-100 rounded-xl outline-none" />
              </div>

              {/* Field 7: Description */}
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Full Description</label>
                <textarea rows="3" value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full px-5 py-3 bg-slate-100 rounded-xl outline-none resize-none" />
              </div>

              {/* Field 8: New Arrival Toggle */}
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={editingProduct.isNewProduct} onChange={(e) => setEditingProduct({...editingProduct, isNewProduct: e.target.checked})} className="w-5 h-5 accent-amber-500" />
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-700">Mark as New Arrival</label>
              </div>

              {/* Field 9: Discount */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Discount (%)</label>
                <input type="number" value={editingProduct.discount} onChange={(e) => setEditingProduct({...editingProduct, discount: e.target.value})} className="w-full px-5 py-3 bg-slate-100 rounded-xl outline-none" />
              </div>

              <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-xl flex items-center justify-center gap-3">
                  <Save size={18} /> Update Collection Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;