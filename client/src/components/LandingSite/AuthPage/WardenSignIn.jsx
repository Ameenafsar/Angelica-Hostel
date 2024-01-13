import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";

export default function WardenSignIn() {
  let navigate = useNavigate();
  
  const getHostel = async () => {
    let warden = JSON.parse(localStorage.getItem("warden"));
    try {
      const res = await fetch("http://localhost:3000/api/warden/get-hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: warden._id })
      });

      const data = await res.json();
      console.log(data);
      localStorage.setItem("hostel", JSON.stringify(data.hostel));
    } catch (err) {
      console.log(err);
    }
  };

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email: inputEmail,
      password: pass,
    };

    let response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    let result = await response.json();

    if (result.success) {
      localStorage.setItem("token", result.data.token);
      let warden = await fetch("http://localhost:3000/api/warden/get-warden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isWarden: result.data.user.isWarden,
          token: result.data.token
        })
      });

      let wardenResult = await warden.json();
      console.log(wardenResult);
      if (wardenResult.success) {
        localStorage.setItem("warden", JSON.stringify(wardenResult.warden));
        const hostel = await getHostel();
        navigate("/warden-dashboard");
      } else {
        toast.error(
          wardenResult.errors[0].msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    } else {
      toast.error(
        result.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    setLoader(false);
  };

  const [loader, setLoader] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [pass, setPass] = useState("");

  const changeEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const email = {
    name: "email",
    type: "email",
    placeholder: "abc@email.com",
    req: true,
    value: inputEmail,
    onChange: changeEmail,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
    value: pass,
  };

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Sign in to your account - Warden
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          <Input field={email} />
          <Input field={password} />
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 focus:ring-blue-800"
          >
            {loader ? (
              <>
                <Loader /> Verifying...
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <p className="text-sm font-light text-gray-400">
            You&apos;re a student?{" "}
            <Link
              to="/auth/login"
              className="font-medium hover:underline text-blue-500"
            >
              Signin Here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
