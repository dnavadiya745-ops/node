import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 to-indigo-200">
      
      <div className="backdrop-blur-lg bg-white/70 shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-5">
          
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember
            </label>

            <span className="text-blue-500 cursor-pointer hover:underline">
              Forgot?
            </span>
          </div>

          <button className="w-full bg-linear-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl hover:opacity-90">
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer"><Link to="/JoinUs">Join Us</Link></span>
        </p>
      </div>
    </div>
  );
};

export default Login;