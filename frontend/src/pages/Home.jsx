import { Link } from "react-router-dom";
import {
  IoShieldCheckmarkOutline,
  IoHappyOutline,
  IoNutritionOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoLocationOutline,
  IoRestaurantOutline,
} from "react-icons/io5";
import { Instagram, Facebook, Twitter, Phone, Mail } from "lucide-react";
import webImg from "../assests/image3.png";
import delImg from "../assests/image.png";
import { useState } from "react";
import { useEffect } from "react";

import AccordData from "../api/AccordData.json";
import Testimonial from "../api/Textimonial.json";
import { Design } from "../UI/Design";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const Home = () => {
  const [data, setData] = useState([]);
  const [dataTest, setDataTest] = useState([]);
  const [activeId, setActiveId] = useState(false);

  useEffect(() => {
    setData(AccordData);
    setDataTest(Testimonial);
  }, []);

  const handleButton = (id) => {
    setActiveId((prevId) => (prevId === id ? false : id));
  };

  return (
    <div className="font-quicksand text-text-dark">
      {/* ================= HERO ================= */}
      <section className="bg-white h-screen flex items-center pl-6 pt-2 overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center bg-white rounded-full px-9 py-2 shadow mb-6">
              <span className="mr-2">🍎</span>
              <span className="text-red-400 font-semibold text-sm">
                Nursery & Primary School Tiffins
              </span>
            </div>

            <h1 className="font-fredoka text-[64px] leading-[1.1] mb-6">
              Yummy Tiffins,
              <br />
              <span className="text-red-400">Happy Tummies!</span>
            </h1>

            <p className="text-lg text-text-light max-w-lg mb-10">
              Wholesome, home-style meals packed with love and nutrition.
              Delivered fresh every morning for your little superheroes.
            </p>

            <div className="flex gap-4">
              <Link
                to="/meals"
                className="bg-red-400 text-white px-9 py-4 hover:bg-red-600 rounded-full font-semibold shadow-xl/20 hover:shadow-xl/20 transition"
              >
                View Menu →
              </Link>
              <Link
                to="/register"
                className="bg-white px-9 py-4 rounded-full font-semibold shadow-xl hover:shadow-xl/20 hover:bg-gray-50 transition"
              >
                Book a Trial
              </Link>
            </div>
          </div>
          <section>
            <img
              src={delImg}
              alt="Happy kid"
              className="w-full h-auto max-w-full object-contain bg-transparent"
            />
          </section>
        </div>
      </section>
      <section>
        <img
          src={webImg}
          alt="Happy kid"
          className="w-full h-auto max-w-full object-contain bg-transparent"
        />
      </section>

      {/* ================= WHY PARENTS ================= */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-fredoka text-4xl mb-4">Why Parents Love Us</h2>
          <div className="w-20 h-1.5 bg-red-400 mx-auto rounded mb-20"></div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <IoNutritionOutline />,
                title: "Chef-Curated Nutrition",
                text: "Balanced meals designed by nutritionists for growing kids.",
                bg: "bg-red-400",
                color: "text-white-400",
              },
              {
                icon: <IoShieldCheckmarkOutline />,
                title: "100% Hygienic & Safe",
                text: "Cooked in sanitized kitchens using fresh ingredients only.",
                bg: "bg-red-400",
                color: "text-white-400",
              },
              {
                icon: <IoHappyOutline />,
                title: "Kid-Approved Taste",
                text: "Healthy food made fun so tiffins come back empty.",
                bg: "bg-red-400",
                color: "text-white-400",
              },
            ].map((c, i) => (
              <div
                key={i}
                className={`${c.bg} p-12 rounded-[40px] hover:shadow-xl transition`}
              >
                <div
                  className={`w-20 h-20 bg-white rounded-full mx-auto mb-8 flex items-center justify-center text-3xl shadow ${c.color}`}
                >
                  {c.icon}
                </div>
                <h3 className="font-fredoka text-black text-2xl mb-3">
                  {c.title}
                </h3>
                <p className="text-black">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-fredoka text-4xl mb-4">
            Happy Parents, Happy Kids
          </h2>
          <div className="w-20 h-1.5 bg-red-400 mx-auto rounded mb-12"></div>

          {/* 🔥 Custom Navigation Buttons */}

          {/* Swiper */}
          <Swiper
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            spaceBetween={40}
            modules={[Navigation]}
            breakpoints={{
              540: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {dataTest.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="p-10 rounded-3xl text-left border border-gray-200 shadow-md h-full bg-white">
                  {/* USER INFO */}
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">
                        {t.name}
                      </h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>

                  {/* REVIEW */}
                  <p className="text-gray-600 italic mb-6 leading-relaxed">
                    “{t.text}”
                  </p>

                  {/* RATING */}
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <IoCheckmarkCircle key={i} className="w-5 h-5" />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-center gap-6 m-6">
          {/* Prev */}
          <button className="custom-prev w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-500 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          {/* Next */}
          <button className="custom-next w-14 h-14 rounded-full border-2 border-gray-700 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </section>

      {/* ================= DELIVERY INFO ================= */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-12 grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <div>
              <h2 className="font-fredoka text-4xl font-semibold mb-10 text-gray-800">
                MiniMealHub – Delivery & Location
              </h2>

              {/* Delivery Time */}
              <div className="flex gap-6 mb-8">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl shadow">
                  <IoTimeOutline />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    Morning Meal Delivery
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fresh & hygienic meals delivered daily between{" "}
                    <span className="font-semibold text-blue-600">
                      7:00 AM – 8:30 AM
                    </span>{" "}
                    so your day starts healthy.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-6 mb-8">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl shadow">
                  <IoLocationOutline />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    Kitchen Location
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    MiniMealHub Kitchen, New Baradwari, Sakchi, Jamshedpur,
                    Jharkhand.
                  </p>
                </div>
              </div>

              {/* Coverage */}
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl shadow">
                  <IoRestaurantOutline />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    Service Areas
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Sakchi, Bistupur, Kadma, Sonari, Mango & nearby areas.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT MAP */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <div className="relative w-full h-[420px]">
                <iframe
                  title="MiniMealHub Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.6310522017816!2d86.21391037586298!3d22.808647786423354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e30040dbbcb1%3A0x776662b5571b6b0e!2sSubhash%20ashram%2C%20Jamshedpur!5e1!3m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Accordian ================= */}
      <div className="p-3 text-center bg-white">
        <h2 className="font-fredoka text-4xl mb-4">Why Choose MiniMeal Hub</h2>
        <div className="w-20 h-1.5 bg-red-400 mx-auto rounded mb-20"></div>
        <ul className="section-accordion ">
          {data.map((curData) => (
            <Design
              key={curData.id}
              data={curData}
              isActive={activeId === curData.id}
              OnToggle={() => handleButton(curData.id)}
            />
          ))}
        </ul>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1f2a38] text-gray-400 pt-20">
        <div className="container mx-auto px-6">
          {/* TOP GRID */}
          <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-gray-700">
            {/* BRAND */}
            <div>
              <div className="flex items-center gap-2 text-white font-fredoka text-2xl mb-4">
                <IoRestaurantOutline className="text-primary-orange" />
                MiniMeal<span className="text-primary-orange">Hub</span>
              </div>
              <p className="text-sm leading-relaxed">
                Nourishing the future,
                <br />
                one tiffin at a time.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="text-primary-orange font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/menu" className="hover:text-white">
                    Our Menu
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-primary-orange font-semibold mb-4">
                Contact
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +1 234 567 8900
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> hello@minimealhub.com
                </li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h4 className="text-primary-orange font-semibold mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="text-center py-6 text-sm text-gray-500">
            © 2023 MiniMeal Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
