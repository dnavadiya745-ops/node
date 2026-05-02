import React, { useContext, useEffect, useState } from "react";
import { Mail, Phone, MapPin, Calendar, LogOut, Edit3, User, ShieldCheck, ArrowRight, LayoutGrid } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { dataContext } from "../content/usercontenxt";

const Profile = () => {
  const [data, setdata] = useState("");
  const [error, seterror] = useState("");
  const { centerdata } = useContext(dataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setdata(response?.data?.user);
      } catch (error) {
        seterror(error.response?.data?.message || "Access Denied");
      }
    };
    fetchdata();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.setItem("token", "");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4 md:p-8 lg:p-12 font-sans selection:bg-amber-100">
      
      {/* Error State - Minimalist Center View */}
      {error && (
        <div className="text-center group">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
            <ShieldCheck className="text-red-500 h-10 w-10" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2 italic">Session Expired</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">{error}</p>
          <Link to="/login" className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all">
            Back to Authentication
          </Link>
        </div>
      )}

      {data.username && (
        <div className="max-w-6xl w-full bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-100 flex flex-col lg:flex-row min-h-175">
          
          {/* Left Panel: Sidebar Branding (3 Columns approx) */}
          <div className="lg:w-87.5 bg-slate-900 p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-16">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <LayoutGrid className="text-white h-5 w-5" />
                </div>
                <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Lumina ID</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-white text-4xl font-serif font-bold italic leading-tight">Elite <br /> Member.</h3>
                <div className="h-0.5 w-12 bg-amber-500" />
              </div>
            </div>

            <div className="relative z-10">
              <button 
                onClick={logout}
                className="group flex items-center gap-4 text-slate-400 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.2em]"
              >
                <div className="w-10 h-10 border border-slate-700 rounded-full flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500 transition-all">
                    <LogOut className="h-4 w-4 group-hover:text-white" />
                </div>
                Sign Out
              </button>
            </div>
          </div>

          {/* Right Panel: Content (Main View) */}
          <div className="flex-1 bg-white p-8 md:p-16 lg:p-20 relative">
            
            {/* Header: Visual & Identity */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mb-20">
              <div className="relative">
                <div className="absolute -inset-2 bg-linear-to-tr rounded-[2.5rem] opacity-20 blur-lg animate-pulse" />
                <img
                  src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
                  alt="User avatar"
                  className="relative w-40 h-40 rounded-[2.2rem] object-cover border-4 border-white "
                />
              </div>
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-700 font-sans">Identity Verified</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tighter leading-none uppercase">
                    {data.username}
                </h2>
                <p className="text-slate-400 text-sm font-medium tracking-wide">
                    Principal Frontend Architect • Member since 2024
                </p>
              </div>
            </div>

            {/* Info Grid: The "Cardless" Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              <ProfileAttribute icon={<Mail />} label="Secure Email" value={data.email} />
              <ProfileAttribute icon={<Phone />} label="Communication" value="+91 9876543210" />
              <ProfileAttribute icon={<MapPin />} label="Region" value="Ahmedabad, India" />
              <ProfileAttribute icon={<Calendar />} label="Cycle Joined" value="Jan 2024" />
            </div>

            {/* Footer: Primary Actions */}
            <div className="mt-20 pt-12 border-t border-slate-50 flex flex-wrap gap-6">
              <Link to="/edit-profile" className="flex-1 md:flex-none">
                <button className="w-full bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-amber-600 shadow-xl transition-all active:scale-95 group">
                  Modify Account
                  <Edit3 className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                </button>
              </Link>
              <button className="flex-1 md:flex-none border-2 border-slate-100 text-slate-400 px-12 py-4.5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-3 group">
                Dashboard
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

// Internal Sub-component for Details
const ProfileAttribute = ({ icon, label, value }) => (
  <div className="group space-y-3">
    <div className="flex items-center gap-3 text-slate-300 group-hover:text-amber-500 transition-colors">
      {React.cloneElement(icon, { size: 16, strokeWidth: 2.5 })}
      <span className="text-[9px] font-black uppercase tracking-[0.3em]">{label}</span>
    </div>
    <div className="relative">
        <p className="text-xl font-serif font-bold text-slate-900 leading-none">
            {value}
        </p>
        <div className="absolute -bottom-2 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-500" />
    </div>
  </div>
);

export default Profile;