import React from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-gray-200 flex items-center justify-center p-4">

      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-blue-200">

        {/* Cover */}
        <div className="h-48 bg-linear-to-br from-blue-500 via-blue-400 to-indigo-500 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Profile Section */}
        <div className="px-6 pb-8 relative">

          {/* Avatar */}
          <div className="flex justify-center -mt-20">
            <img
              src="https://via.placeholder.com/150"
              alt="profile"
              className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover hover:scale-105 transition"
            />
          </div>

          {/* Name */}
          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold text-gray-800">John Doe</h2>
            <p className="text-blue-500 font-medium">Frontend Developer</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <Mail className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">john@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <Phone className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">+91 9876543210</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <MapPin className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-800">Ahmedabad, India</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <Calendar className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="font-medium text-gray-800">Jan 2024</p>
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-blue-600 hover:scale-105 transition">
              Edit Profile
            </button>

            <button className="border border-gray-300 px-6 py-2 rounded-xl hover:bg-gray-100 hover:scale-105 transition">
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;