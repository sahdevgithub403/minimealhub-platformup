import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoRestaurantOutline, IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-fredoka text-xl sm:text-2xl font-bold text-text-dark"
        >
          <div className="bg-red-400 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm">
            <IoRestaurantOutline />
          </div>
          <span className="hidden sm:inline">
            MiniMeal<span className="text-red-400">Hub</span>
          </span>
          <span className="sm:hidden">MMH</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link
            to="/"
            className="text-text-dark font-bold transition-colors font-quicksand text-xl relative inline-block
             after:content-['']
             after:absolute after:left-0 after:bottom-0
             after:h-0.5 after:w-0
             after:bg-red-400
             after:transition-all after:duration-300
             hover:after:w-full"
          >
            Home
          </Link>
          <Link
            to={user ? "/meals" : "/register"}
            className="text-text-dark font-bold  transition-colors font-quicksand text-xl relative inline-block
             after:content-['']
             after:absolute after:left-0 after:bottom-0
             after:h-0.5 after:w-0
             after:bg-red-400
             after:transition-all after:duration-300
             hover:after:w-full"
          >
            Menu
          </Link>
          <Link
            to="/orders"
            className="text-text-dark font-bold  transition-colors font-quicksand text-xl relative inline-block
             after:content-['']
             after:absolute after:left-0 after:bottom-0
             after:h-0.5 after:w-0
             after:bg-red-400
             after:transition-all after:duration-300
             hover:after:w-full"
          >
            Pricing
          </Link>
          <Link
            to="/orders"
            className="text-text-dark font-bold  transition-colors font-quicksand text-xl relative inline-block
             after:content-['']
             after:absolute after:left-0 after:bottom-0
             after:h-0.5 after:w-0
             after:bg-red-400
             after:transition-all after:duration-300
             hover:after:w-full"
          >
            Support
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className="text-white bg-red-400 font-bold hover:bg-red-600 transition-colors font-quicksand text-sm px-4 py-2 rounded-full"
            >
              👑 Admin
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="text-sm text-text-light font-quicksand font-semibold hover:text-primary-green transition-colors"
              >
                Hi, {user.sub?.split("@")[0] || "User"} 👤
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-text-dark border-2 border-gray-100 px-4 xl:px-6 py-2 xl:py-2.5 rounded-full font-bold text-sm hover:border-primary-orange hover:text-primary-orange transition-all font-quicksand"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              className="bg-red-400 text-white px-6 xl:px-8 py-2.5 xl:py-3 rounded-full font-bold hover:bg-red-600 hover:-translate-y-0.5 transition-all font-quicksand text-base shadow-md"
            >
              Download
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-3xl text-text-dark hover:text-primary-orange transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-dark font-medium hover:text-primary-orange transition-colors font-quicksand py-3 px-4 rounded-lg hover:bg-gray-50"
            >
              About Us
            </Link>
            <Link
              to={user ? "/meals" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-dark font-medium hover:text-primary-orange transition-colors font-quicksand py-3 px-4 rounded-lg hover:bg-gray-50"
            >
              Weekly Menu
            </Link>
            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-dark font-medium hover:text-primary-orange transition-colors font-quicksand py-3 px-4 rounded-lg hover:bg-gray-50"
            >
              Pricing
            </Link>

            {user?.role === "ADMIN" && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white bg-primary-orange font-bold hover:bg-orange-600 transition-colors font-quicksand text-sm px-4 py-3 rounded-full text-center"
              >
                👑 Admin Dashboard
              </Link>
            )}

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-dark font-semibold hover:text-primary-green transition-colors py-3 px-4 rounded-lg hover:bg-gray-50"
                >
                  👤 My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-text-dark border-2 border-gray-200 px-4 py-3 rounded-full font-bold text-sm hover:border-primary-orange hover:text-primary-orange transition-all font-quicksand"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary-green text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all font-quicksand text-base shadow-md text-center"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
