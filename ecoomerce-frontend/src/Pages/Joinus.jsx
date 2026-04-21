import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JoinUs = () => {

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState()

  const navigate = useNavigate();
    
    const userdata = { username: username, email: email, password: password }
    const submitform = async () => {
        console.log("Form Submited... ");
        console.log(userdata)

        try {
            let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userdata)

            if (response.status === 200) {
                const data = response;

                localStorage.setItem("token", data.token);

                navigate("/login")
            }

            setusername("")
            setemail("")
            setpassword("")
        } catch (err) {
            console.log(error.response)
            let Err = err.response?.data?.error
            console.log(err);
            seterror(Err);
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-blue-200">

            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/40">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account 🚀
                </h2>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault(submitform())}>

                    {error && <div>
                        {error.map((val, index) => {
                            return <p key={index} className="bg-red-100 rounded-xl p-2 w-full text-red-400 font-normal mb-2 text-center">{val.msg}</p>
                        })}
                    </div>

                    }

                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => {
                            setusername(e.target.value)
                        }}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value)
                        }}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setpassword(e.target.value)
                        }}
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
                    />


                    <div className="flex items-start gap-2 text-sm">
                        <input type="checkbox" className="mt-1 accent-indigo-500" />
                        <p>
                            I agree to{" "}
                            <span className="text-indigo-500 cursor-pointer">
                                Terms & Conditions
                            </span>
                        </p>
                    </div>

                    <button className="w-full bg-linear-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-xl hover:opacity-90">
                        Join Now
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default JoinUs;