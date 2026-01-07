import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { sendRegisterOtp, verifyRegisterOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sendRegisterOtp(firstname, lastname, phoneNumber);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await verifyRegisterOtp(firstname, lastname, phoneNumber, otp);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white font-quicksand p-5">

      {/* <div className="absolute -top-30 -left-30 w-[320px] h-80 bg-white rounded-full blur-3xl" /> */}

      <div className="rounded-b-2xl rounded-t-2xl shadow-2xl w-full max-w-5xl border grid lg:grid-cols-2">

        <div className="hidden lg:flex flex-col justify-center items-center rounded-l-2xl bg-cream p-10 relative">
          <img
            src="https://illustrations.popsy.co/amber/taking-notes.svg"
            alt="Kids Tiffin Illustration"
            className="w-full max-w-sm"
          />

          <h3 className="font-fredoka text-3xl text-text-dark mt-8 text-center">
            Healthy Tiffins 🍱
          </h3>
          <p className="text-text-light text-center mt-3 max-w-xs">
            Fresh, nutritious meals prepared with love for growing kids.
          </p>
        </div>

        {/* ===== RIGHT : FORM ===== */}
        <div className="p-10 md:p-12 text-center">

          <h2 className="text-3xl font-fredoka mb-2 text-text-dark">
            Join the Family! 🌟
          </h2>
          <p className="text-text-light mb-8">
            Create an account to order yummy meals.
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="text-left space-y-5">

              {/* First Name */}
              <div>
                <TextField
                  type="text"
                  variant="standard"
                  label="First Name"
                  placeholder="e.g. John"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary-green transition bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Last Name */}
              <div>
                <TextField
                  type="text"
                  variant="standard"
                  placeholder="e.g. Doe"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  label="Last Name"
                  required
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary-green transition bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Phone Number */}
              <div>
                <TextField
                  type="tel"
                  variant="standard"
                  placeholder="+91 "
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  pattern="[0-9+\s-]+"
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary-green transition bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-400 hover:bg-red-600 text-white py-3.5 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="text-left space-y-5">
              {/* OTP */}
              <div>
                <label className="block mb-2 font-bold text-text-light text-sm">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength="6"
                  pattern="[0-9]{6}"
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-primary-green transition bg-gray-50 focus:bg-white text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-text-light mt-2">
                  OTP sent to {phoneNumber}
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-orange text-white py-3.5 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Sign Up"}
              </button>

              {/* Change Number */}
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="w-full text-primary-orange font-semibold hover:underline text-sm"
              >
                Change Details
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Register;
