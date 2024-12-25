import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/Firebase";
import { CircleAlert } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function AuthForm({ mode }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle email/password authentication here
    console.log(user);
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
      navigate("/"); // Redirect to home page or any other page after successful login
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="w-full  gap-4 ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {mode == "signup" && (
            <>
              <label htmlFor="email" className="font-semibold">
                Full Name
              </label>
              <br />
              <input
                id="fullname"
                name="fullname"
                placeholder="Enter your name"
                type="text"
                autoComplete="name"
                required
                value={user.fullname}
                onChange={(e) => {
                  setUser({ ...user, [e.target.name]: e.target.value });
                }}
                className="border outline-none p-2 w-full rounded-md"
              />
            </>
          )}
          <label htmlFor="email" className="font-semibold">
            Email address
          </label>
          <br />
          <input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            autoComplete="email"
            required
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, [e.target.name]: e.target.value });
            }}
            className="border outline-none p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="font-semibold " htmlFor="password">
            Password
          </label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            required
            value={user.password}
            placeholder="Enter your password"
            onChange={(e) => {
              setUser({ ...user, [e.target.name]: e.target.value });
            }}
            className="border outline-none p-2 w-full rounded-md"
          />
        </div>
        {error && (
          <div className="text-red-500 flex items-center">
            <CircleAlert className="w-4 h-4 mr-2" />
            <span>{error}</span>
          </div>
        )}
        <button className="w-full bg-gray-800 text-white p-2 rounded-md active:bg-gray-900">
          {mode === "login" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full border flex justify-center items-center p-2 rounded-md hover:bg-neutral-100"
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}

export default AuthForm;
