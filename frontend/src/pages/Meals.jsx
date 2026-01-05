import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { IoLeafOutline } from "react-icons/io5";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await api.get("/meals");
        setMeals(res.data);
      } catch {
        setError("Failed to load meals");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#FFFDE7] font-quicksand">
      <div className="container mx-auto px-5">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-fredoka mb-3">
            This Week’s Tiffin Menu 🍱
          </h2>
          <p className="text-primary-green font-semibold">
            Fresh meals for happy kids
          </p>
        </div>

        {/* STATES */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* MEALS */}
        {!loading && meals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-3xl shadow hover:shadow-lg transition"
              >
                <div className="p-6">
                  <h3 className="font-fredoka text-xl mb-2">
                    {meal.name}
                  </h3>
                  <p className="text-sm text-text-light mb-4">
                    {meal.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">
                      ₹{meal.price}
                    </span>
                    {meal.isVegetarian && (
                      <span className="flex items-center gap-1 text-primary-green text-sm font-bold">
                        <IoLeafOutline /> Veg
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <div className="text-center mt-14">
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition"
          >
            ✨ Suggest a Healthy Recipe
          </button>
        </div>

        {/* SIDE SLIDE FORM */}
        <RecipeSuggestionForm
          showForm={showForm}
          setShowForm={setShowForm}
        />

      </div>
    </div>
  );
};

export default Meals;

/* =========================
   SIDE SLIDE RECIPE FORM
========================= */

const RecipeSuggestionForm = ({ showForm, setShowForm }) => {
  const [formData, setFormData] = useState({
    recipeName: "",
    description: "",
    ingredients: "",
    vegetarian: false,
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recipes/suggestions", formData);
      setMsg("✅ Recipe submitted!");
      setTimeout(() => {
        setShowForm(false);
        setMsg("");
      }, 2000);
    } catch {
      setMsg("❌ Failed to submit");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setShowForm(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
        ${showForm ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* SLIDE PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl
        transform transition-all duration-500 ease-in-out
        ${showForm ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-8 h-full overflow-y-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-fredoka text-xl">
              🍽️ Suggest Recipe
            </h4>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Recipe name"
              required
              onChange={(e) =>
                setFormData({ ...formData, recipeName: e.target.value })
              }
            />

            <textarea
              className="w-full p-3 border rounded-lg"
              placeholder="Description"
              rows="3"
              required
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <textarea
              className="w-full p-3 border rounded-lg"
              placeholder="Ingredients"
              rows="2"
              required
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFormData({ ...formData, vegetarian: e.target.checked })
                }
              />
              Vegetarian
            </label>

            {msg && (
              <p className="text-center font-semibold text-sm">
                {msg}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-primary-orange text-white py-3 rounded-full font-bold"
            >
              Submit
            </button>
          </form>

        </div>
      </div>
    </>
  );
};
