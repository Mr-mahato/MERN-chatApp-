import React from "react";
import AuthForm from "../AuthForm";
function Signup({ setMode }) {
  return (
    <div className="flex  flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <p
              onClick={() => setMode(true)}
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </p>
          </p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}

export default Signup;
