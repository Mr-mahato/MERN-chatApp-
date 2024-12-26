import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Users, Zap } from "lucide-react";
import UserRegistration from "../models/UserRegistration";
import Login from "../component/Register/Login";
import Signup from "../component/Register/Signup";
function Home() {
  const [isOpenRegistration, setIsOpenRegistration] = useState(false);
  const [mode, setMode] = useState(true);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to LetsChat
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Connect with friends, join chat rooms, and start conversations
                  instantly.
                </p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => setIsOpenRegistration(true)}
                  onClose={() => setIsOpenRegistration(false)}
                  className="bg-black rounded-md text-white px-3 py-2 hover:bg-black/90"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <UserRegistration
            isOpenRegistration={isOpenRegistration}
            onClose={() => setIsOpenRegistration(false)}
          >
            <div className="h-fit    bg-white">
              {mode ? (
                <Login setMode={setMode} />
              ) : (
                <Signup setMode={setMode} />
              )}
            </div>
          </UserRegistration>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 ">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <MessageCircle className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Chat Rooms</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Join various chat rooms and engage in group conversations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">User Profiles</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Create and customize your user profile to connect with others.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Zap className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Instant Messaging</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Send and receive messages in real-time with other users.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
