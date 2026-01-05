import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { IoPersonCircle, IoMailOutline, IoSaveOutline } from 'react-icons/io5';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProfile();
        fetchOrders();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/profile');
            setProfile({
                firstname: response.data.firstname || '',
                lastname: response.data.lastname || '',
                email: response.data.email || ''
            });
        } catch (err) {
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            setOrders(response.data);
        } catch (err) {
            console.error('Failed to load orders:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setMessage('');

        try {
            await api.put('/profile', profile);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-text-light">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gray-50 font-quicksand">
            <div className="container mx-auto px-5 max-w-4xl">
                <div className="text-center mb-8">
                    <IoPersonCircle className="text-6xl text-primary-green mx-auto mb-4" />
                    <h1 className="text-3xl font-fredoka font-bold mb-2">My Profile</h1>
                    <p className="text-text-light">Manage your account information</p>
                </div>

                {message && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-center font-semibold">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center font-semibold">
                        {error}
                    </div>
                )}

                {/* Profile Form */}
                <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 mb-8">
                    <h3 className="text-xl font-fredoka font-bold mb-6">Personal Information</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-text-dark">First Name</label>
                                <input
                                    type="text"
                                    value={profile.firstname}
                                    onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="John"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-text-dark">Last Name</label>
                                <input
                                    type="text"
                                    value={profile.lastname}
                                    onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-text-dark">Email Address</label>
                            <div className="relative">
                                <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 bg-primary-green text-white py-4 rounded-full font-bold hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <IoSaveOutline size={20} />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="px-8 bg-gray-100 text-text-dark py-4 rounded-full font-bold hover:bg-gray-200 transition-colors"
                            >
                                Back
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm">
                        <strong className="text-blue-700">Role:</strong> <span className="text-blue-600">{user?.role || 'USER'}</span>
                    </div>
                </div>

                {/* Order History Section */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-fredoka font-bold mb-6 text-text-dark">📦 Order History</h3>

                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-text-light text-lg">No orders yet</p>
                            <p className="text-sm text-text-light mt-2">Your meal plan subscriptions will appear here</p>
                            <button
                                onClick={() => navigate('/orders')}
                                className="mt-6 bg-primary-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
                            >
                                Browse Meal Plans
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-lg font-bold text-text-dark">{order.planType} Plan</h4>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-text-light mb-1">
                                                📅 {new Date(order.orderDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                            {order.childName && (
                                                <p className="text-sm text-text-light">
                                                    👶 For: {order.childName} ({order.ageGroup})
                                                </p>
                                            )}
                                            {order.allergies && (
                                                <p className="text-sm text-text-light">
                                                    ⚠️ Note: {order.allergies}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-fredoka font-bold text-primary-orange">
                                                ₹{order.totalAmount}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
