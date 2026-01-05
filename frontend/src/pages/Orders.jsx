import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { IoCheckmarkCircle, IoTimeOutline, IoArrowBack, IoArrowForward } from 'react-icons/io5';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        parentName: '',
        phoneNumber: '',
        childName: '',
        ageGroup: 'Nursery (2-4 yrs)',
        schoolArea: '',
        allergies: ''
    });

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            setOrders(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setCurrentStep(2);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setCurrentStep(3);
    };

    const confirmBooking = async () => {
        try {
            // Send booking data to backend
            await api.post('/orders', {
                planType: selectedPlan.type,
                totalAmount: selectedPlan.price,
                ...bookingForm
            });
            setMessage(`🎉 Success! ${selectedPlan.type} Plan confirmed for ${bookingForm.childName}!`);
            fetchOrders();
            // Reset to step 1
            setCurrentStep(1);
            setSelectedPlan(null);
            setBookingForm({
                parentName: '',
                phoneNumber: '',
                childName: '',
                ageGroup: 'Nursery (2-4 yrs)',
                schoolArea: '',
                allergies: ''
            });
        } catch (err) {
            setMessage('❌ Booking failed. Please try again.');
        }
    };

    const plans = [
        {
            type: 'Weekly',
            price: 800,
            meals: '5 Meals',
            features: ['Free Delivery', 'Pause Anytime', 'Flexible Schedule'],
            color: 'primary-green'
        },
        {
            type: 'Monthly',
            price: 2200,
            meals: '22 Meals',
            features: ['Priority Delivery', '20 Days (4 Weeks)', 'Customization', 'Save 15%'],
            color: 'primary-orange',
            recommended: true
        }
    ];

    return (
        <div className="py-10 pt-20 bg-cream min-h-screen font-quicksand">
            <div className="container mx-auto px-5 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-block bg-[#EAF4FF] text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        {currentStep === 1 && 'Choose Your Plan'}
                        {currentStep === 2 && 'Enter Details'}
                        {currentStep === 3 && 'Confirm Booking'}
                    </span>
                    <h2 className="text-4xl font-fredoka mb-3">
                        {currentStep === 1 && 'Select a Meal Plan'}
                        {currentStep === 2 && 'Tell Us About Your Child'}
                        {currentStep === 3 && 'Review & Confirm'}
                    </h2>
                    <p className="text-text-light font-semibold">
                        Step {currentStep} of 3
                    </p>
                </div>

                {message && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center mb-8 font-bold">
                        {message}
                    </div>
                )}

                {/* Step 1: Plan Selection */}
                {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.type}
                                className={`bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer relative ${plan.recommended ? 'border-2 border-primary-orange transform md:scale-105' : 'border border-gray-100'
                                    }`}
                                onClick={() => handlePlanSelect(plan)}
                            >
                                {plan.recommended && (
                                    <div className="absolute top-0 right-1/2 md:right-5 translate-x-1/2 md:translate-x-0 -mt-4 bg-primary-orange text-white px-4 py-1 rounded-lg text-xs font-bold uppercase">
                                        Best Value
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold font-fredoka mb-2">{plan.type} Plan</h3>
                                <div className={`text-4xl font-bold text-${plan.color} my-6 font-fredoka`}>
                                    ₹{plan.price} <span className="text-base text-text-light font-normal">/ {plan.type.toLowerCase()}</span>
                                </div>
                                <p className="text-lg font-semibold mb-6">{plan.meals}</p>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 justify-center">
                                            <IoCheckmarkCircle className="text-primary-green" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full py-3 rounded-full font-bold transition-all ${plan.recommended
                                            ? 'bg-primary-orange text-white hover:shadow-lg'
                                            : 'bg-white text-text-dark border-2 border-gray-100 hover:bg-gray-50'
                                        }`}
                                >
                                    Select {plan.type} Plan
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Step 2: Details Form */}
                {currentStep === 2 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl">
                        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-text-light">Selected Plan:</p>
                            <p className="text-2xl font-fredoka font-bold text-primary-orange">
                                {selectedPlan?.type} Plan - ₹{selectedPlan?.price}
                            </p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Parent's Name</label>
                                    <input
                                        type="text"
                                        value={bookingForm.parentName}
                                        onChange={(e) => setBookingForm({ ...bookingForm, parentName: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={bookingForm.phoneNumber}
                                        onChange={(e) => setBookingForm({ ...bookingForm, phoneNumber: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                                        placeholder="+91 123-4567"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Child's Name</label>
                                    <input
                                        type="text"
                                        value={bookingForm.childName}
                                        onChange={(e) => setBookingForm({ ...bookingForm, childName: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                                        placeholder="Little Star"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Age Group</label>
                                    <select
                                        value={bookingForm.ageGroup}
                                        onChange={(e) => setBookingForm({ ...bookingForm, ageGroup: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                                    >
                                        <option>Nursery (2-4 yrs)</option>
                                        <option>Pre-K (4-6 yrs)</option>
                                        <option>Elementary (6-10 yrs)</option>
                                        <option>Pre-Teen (10-13 yrs)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">School / Area</label>
                                <input
                                    type="text"
                                    value={bookingForm.schoolArea}
                                    onChange={(e) => setBookingForm({ ...bookingForm, schoolArea: e.target.value })}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                                    placeholder="e.g. Sunnydale Elementary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Allergies / Preferences</label>
                                <textarea
                                    value={bookingForm.allergies}
                                    onChange={(e) => setBookingForm({ ...bookingForm, allergies: e.target.value })}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange resize-none"
                                    placeholder="e.g. No peanuts, loves carrots..."
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(1)}
                                    className="flex-1 bg-gray-100 text-text-dark py-3 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <IoArrowBack /> Back
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary-green text-white py-3 rounded-full font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    Continue <IoArrowForward />
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl">
                        <h3 className="text-2xl font-fredoka font-bold text-center mb-6">Review Your Booking</h3>

                        <div className="space-y-4 mb-8">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-text-light mb-1">Plan Selected</p>
                                <p className="text-xl font-bold">{selectedPlan?.type} Plan</p>
                                <p className="text-2xl font-fredoka font-bold text-primary-orange">₹{selectedPlan?.price}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-text-light mb-2">Contact Details</p>
                                <div className="space-y-1">
                                    <p><strong>Parent:</strong> {bookingForm.parentName}</p>
                                    <p><strong>Phone:</strong> {bookingForm.phoneNumber}</p>
                                    <p><strong>Child:</strong> {bookingForm.childName} ({bookingForm.ageGroup})</p>
                                    <p><strong>School/Area:</strong> {bookingForm.schoolArea}</p>
                                    {bookingForm.allergies && <p><strong>Notes:</strong> {bookingForm.allergies}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="flex-1 bg-gray-100 text-text-dark py-3 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <IoArrowBack /> Edit Details
                            </button>
                            <button
                                onClick={confirmBooking}
                                className="flex-1 bg-primary-green text-white py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <IoCheckmarkCircle /> Confirm Booking
                            </button>
                        </div>
                    </div>
                )}

                {/* Order History */}
                <div className="mt-16">
                    <h3 className="text-2xl font-fredoka mb-6">Order History</h3>
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
                        {orders.length === 0 ? (
                            <p className="text-text-light text-center py-10">No orders yet</p>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="p-4 border border-gray-100 rounded-xl flex justify-between items-center hover:bg-gray-50 transition-colors">
                                        <div>
                                            <p className="font-bold">{order.planType} Plan</p>
                                            <p className="text-sm text-text-light flex items-center gap-2">
                                                <IoTimeOutline /> {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-fredoka font-bold text-lg">₹{order.totalAmount}</p>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
