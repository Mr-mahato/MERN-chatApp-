import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" to={"/#"}>
        <MessageCircle className="h-6 w-6 mr-2" />
        <span className="font-bold">LetsChat</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to={"/#"}
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to={"/#"}
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to={"/#"}
        >
          About
        </Link>
      </nav>
    </header>
  );
}

export default Header;
