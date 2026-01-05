import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'meals'
    const [newMeal, setNewMeal] = useState({
        name: '', description: '', price: '', imageUrl: '', dayOfWeek: 'Monday', isVegetarian: true
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders/all');
            setOrders(res.data);
        } catch (err) {
            console.error('Failed to fetch orders', err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/orders/${id}/status`, { status });
            fetchOrders();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleMealSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/meals', newMeal);
            alert('Meal Added Successfully!');
            setNewMeal({ name: '', description: '', price: '', imageUrl: '', dayOfWeek: 'Monday', isVegetarian: true });
        } catch (err) {
            alert('Failed to add meal');
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50 font-quicksand p-5">
            <div className="container mx-auto">
                <h1 className="text-3xl font-fredoka font-bold mb-6 text-primary-orange">Admin Dashboard 👑</h1>

                <div className="flex gap-4 mb-8">
                    <button
                        className={`px-6 py-2 rounded-full font-bold ${activeTab === 'orders' ? 'bg-primary-green text-white' : 'bg-white text-text-light'}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Manage Orders
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full font-bold ${activeTab === 'meals' ? 'bg-primary-green text-white' : 'bg-white text-text-light'}`}
                        onClick={() => setActiveTab('meals')}
                    >
                        Add New Meal
                    </button>
                </div>

                {activeTab === 'orders' ? (
                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-3 font-fredoka">ID</th>
                                    <th className="p-3 font-fredoka">Customer</th>
                                    <th className="p-3 font-fredoka">Plan</th>
                                    <th className="p-3 font-fredoka">Status</th>
                                    <th className="p-3 font-fredoka">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} className="border-b last:border-none hover:bg-gray-50">
                                        <td className="p-3">{order.id}</td>
                                        <td className="p-3">{order.user ? order.user.email : 'Unknown'}</td>
                                        <td className="p-3">{order.planType}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {order.status !== 'DELIVERED' && (
                                                <button
                                                    onClick={() => updateStatus(order.id, 'DELIVERED')}
                                                    className="bg-primary-green text-white px-3 py-1 rounded-lg text-xs font-bold"
                                                >
                                                    Mark Delivered
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-8 shadow-sm max-w-2xl">
                        <h2 className="text-xl font-bold mb-4 font-fredoka">Add a New Meal Item</h2>
                        <form onSubmit={handleMealSubmit} className="space-y-4">
                            <input
                                className="w-full p-3 border rounded-xl"
                                placeholder="Meal Name"
                                value={newMeal.name}
                                onChange={e => setNewMeal({ ...newMeal, name: e.target.value })}
                                required
                            />
                            <textarea
                                className="w-full p-3 border rounded-xl"
                                placeholder="Description"
                                value={newMeal.description}
                                onChange={e => setNewMeal({ ...newMeal, description: e.target.value })}
                                required
                            />
                            <div className="flex gap-4">
                                <input
                                    className="w-full p-3 border rounded-xl"
                                    placeholder="Price"
                                    type="number"
                                    value={newMeal.price}
                                    onChange={e => setNewMeal({ ...newMeal, price: e.target.value })}
                                    required
                                />
                                <select
                                    className="w-full p-3 border rounded-xl"
                                    value={newMeal.dayOfWeek}
                                    onChange={e => setNewMeal({ ...newMeal, dayOfWeek: e.target.value })}
                                >
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <input
                                className="w-full p-3 border rounded-xl"
                                placeholder="Image URL"
                                value={newMeal.imageUrl}
                                onChange={e => setNewMeal({ ...newMeal, imageUrl: e.target.value })}
                                required
                            />
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={newMeal.isVegetarian}
                                    onChange={e => setNewMeal({ ...newMeal, isVegetarian: e.target.checked })}
                                />
                                <label>Vegetarian?</label>
                            </div>
                            <button type="submit" className="w-full bg-primary-orange text-white py-3 rounded-xl font-bold">Add Meal</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
