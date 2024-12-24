import React from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '../AuthForm'
function Login({ setMode }) {
  return (
    <div className="flex  mx-auto flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-md">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <p onClick={()=> setMode(false)} className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </p>
          </p>
        </div>
        <AuthForm mode="login" />
      </div>
    </div>
  )
}

export default Login