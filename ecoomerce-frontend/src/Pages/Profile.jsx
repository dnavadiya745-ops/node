import React, { useContext, useEffect, useState } from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { dataContext } from "../content/usercontenxt";


const Profile = () => {

  const [data, setdata] = useState("");
  const [error, seterror] = useState("")
  const {centerdata} = useContext(dataContext);
  console.log(centerdata)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }

        })
        console.log(response)
        setdata(response?.data?.user);
      } catch (error) {
        console.log(error.response);
        seterror(error.response?.data?.message)
      }
    }
    fetchdata();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        },
      
      );

      localStorage.setItem("token", "")
      navigate("/login")

    } catch (error) {
      console.log(error.res)
    }
  }

  return (
    <>
      {error && (
        <div className="w-full h-screen flex items-center justify-center text-9xl font-bold text-red-700">
          Access Denided .....
        </div>
      )}

      {data.username && (<div className="min-h-screen bg-linear-to-br from-blue-100 to-gray-200 flex items-center justify-center p-4">

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
                src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
                alt="profile"
                className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover hover:scale-105 transition"
              />
            </div>

            {/* Name */}
            <div className="text-center mt-4">
              <h2 className="text-3xl font-bold text-gray-800">{data.username}</h2>
              <p className="text-blue-500 font-medium">Frontend Developer</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                <Mail className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{data.email}</p>
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
              <Link to ="/edit-profile" className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-blue-600 hover:scale-105 transition"> <button >
                Edit Profile
              </button></Link>
             

              <button className="border border-gray-300 px-6 py-2 rounded-xl hover:bg-gray-100 hover:scale-105 transition" onClick={logout}>
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>)}


    </>
  );
};

export default Profile;