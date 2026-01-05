import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { sendLoginOtp, verifyLoginOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sendLoginOtp(phoneNumber);
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
      await verifyLoginOtp(phoneNumber, otp);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center font-quicksand p-5 overflow-hidden">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ECFDF5] via-[#FFF7ED] to-[#E0F2FE]" />

      {/* ===== MAIN CARD ===== */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl grid lg:grid-cols-2">
        {/* ===== LEFT : KIDS VISUAL (NO IMAGES) ===== */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-[#F0FDF9] p-10">
          <div className="flex gap-6 mb-10">
            <div className="w-24 h-24 rounded-2xl bg-orange-100 flex items-center justify-center text-5xl shadow">
              🧒
            </div>
            <div className="w-24 h-24 rounded-2xl bg-green-100 flex items-center justify-center text-5xl shadow translate-y-6">
              🍱
            </div>
            <div className="w-24 h-24 rounded-2xl bg-blue-100 flex items-center justify-center text-5xl shadow">
              👧
            </div>
          </div>

          <h3 className="font-fredoka text-3xl text-text-dark text-center">
            Happy Kids, Healthy Food
          </h3>
          <p className="text-text-light text-center mt-3 max-w-xs">
            Nutritious tiffins made fresh every morning for growing kids.
          </p>
        </div>

        {/* ===== RIGHT : LOGIN FORM ===== */}
        <div className="p-10 md:p-12 text-center">
          <h2 className="text-3xl font-fredoka mb-2 text-text-dark">
            Login to MiniMeal Hub
          </h2>
          <p className="text-text-light mb-8">Fresh meals, happy kids 🍎</p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="text-left space-y-5">
              {/* Phone Number */}
              <div>
                <TextField
                  type="tel"
                  variant="standard"
                  label="Phone Number"
                  placeholder="+91 "
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
                className="w-full bg-primary-green text-white py-3.5 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full bg-primary-green text-white py-3.5 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              {/* Resend OTP */}
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="w-full text-primary-orange font-semibold hover:underline text-sm"
              >
                Change Number
              </button>
            </form>
          )}

          {/* Register Link */}
          <p className="text-center text-text-light text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-green font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
