import React, { useState } from "react";
import { Search } from "lucide-react";
function ChatSidebar() {
  const [searchUser, setSearchUser] = useState("");
  return (
    <div className="w-[20%] border p-2 rounded-md">
      {/* searching for the user in the search bar */}
      <div className="w-full mb-4 border rounded-md flex ">
        <input
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Enter your search query..."
          className="p-2 outline-none  w-full rounded-md text-neutral-600  "
        />
        <Search className="self-center basis-10 text-neutral-600 w-6 h-6" />
      </div>

      <aside className="w-full h-full flex flex-col gap-2 items-center">
        <div className="flex cursor-pointer border gap-2 bg-gray-700 w-[90%] shadow-md rounded-md p-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92SteKCmoJpBh3GlakGipEznqeWRH2NyfpA&s"
            alt="user image"
            className="w-[2rem] h-[2rem] rounded-full border"
          />
          <h1 className="font-semibold text-neutral-100">User name</h1>
        </div>

        <div className="flex cursor-pointer border gap-2 bg-gray-700 w-[90%] shadow-md rounded-md p-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92SteKCmoJpBh3GlakGipEznqeWRH2NyfpA&s"
            alt="user image"
            className="w-[2rem] h-[2rem] rounded-full border"
          />
          <h1 className="font-semibold text-neutral-100">User name</h1>
        </div>
        <div className="flex cursor-pointer border gap-2 bg-gray-700 w-[90%] shadow-md rounded-md p-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92SteKCmoJpBh3GlakGipEznqeWRH2NyfpA&s"
            alt="user image"
            className="w-[2rem] h-[2rem] rounded-full border"
          />
          <h1 className="font-semibold text-neutral-100">User name</h1>
        </div>
        <div className="flex cursor-pointer border gap-2 bg-gray-700 w-[90%] shadow-md rounded-md p-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92SteKCmoJpBh3GlakGipEznqeWRH2NyfpA&s"
            alt="user image"
            className="w-[2rem] h-[2rem] rounded-full border"
          />
          <h1 className="font-semibold text-neutral-100">User name</h1>
        </div>
      </aside>
    </div>
  );
}

export default ChatSidebar;
