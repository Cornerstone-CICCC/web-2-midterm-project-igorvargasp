import { useState } from "react";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Navbar = ({ setSearch, search }) => {
  const [activeNav, setActiveNav] = useState("Movies");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    "Home",
    "TV Shows",
    "Movies",
    "New & Popular",
    "My list",
    "About",
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-b from-[#0a0a0f] via-[#0a0a0f]/95 to-transparent w-full">
      <div className="w-full">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-16">
            <h1 className="text-2xl font-bold text-white tracking-wider">
              I<span className="text-red-600">MOVIE</span>
            </h1>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <NavLink
                  key={item}
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`
                  }
                  onClick={() => setActiveNav(item)}
                  className={`text-sm font-medium transition-colors relative pb-1 ${
                    activeNav === item
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {item}
                  {activeNav === item && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"></div>
                  )}
                </NavLink>
              ))}
            </nav>
            {/* Hamburger Icon */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          <div className="flex items-center gap-6">
            {searchOpen ? (
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onBlur={() => setSearchOpen(false)}
                  className="bg-[#1a1a24] border border-gray-700 rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-gray-500 w-64 text-white placeholder-gray-500"
                />
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)}>
                <Search
                  size={20}
                  className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                />
              </button>
            )}
            <Bell
              size={20}
              className="text-gray-300 cursor-pointer hover:text-white transition-colors"
            />
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
        {/* Mobile Nav */}
        {mobileNavOpen && (
          <nav className="md:hidden bg-[#0a0a0f] px-8 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveNav(item);
                  setMobileNavOpen(false);
                }}
                className={`text-base font-medium transition-colors ${
                  activeNav === item
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
