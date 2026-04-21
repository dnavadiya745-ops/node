import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataContext } from "../content/usercontenxt";


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const {setCenterData} = useContext(dataContext);

  const navigate = useNavigate();

  //API Fetch -- Data Send

const submitForm = async () => {
  console.log("Form Submited....")

  const userdata = {email: email, password: password}

  try {
    let res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userdata);

    if (res.status === 200) {
      const data = res.data;

      localStorage.setItem("token",data.token);
      setCenterData(data.checkUser);
      navigate("/profile");
    }

    setemail("");
    setpassword("");
    
  } catch (e) {
    let error = e.res?.data?.error;
    seterror(error)
  }


}


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 to-indigo-200">

      <div className="backdrop-blur-lg bg-white/70 shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-5 "onSubmit={(e)=> e.preventDefault(submitForm())}>

          
                    {error && <div>
                        {error.map((val, index) => {
                            return <p key={index} className="bg-red-100 rounded-xl p-2 w-full text-red-400 font-normal mb-2 text-center">{val.msg}</p>
                        })}
                    </div>}

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value)
            }}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value)
            }}
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