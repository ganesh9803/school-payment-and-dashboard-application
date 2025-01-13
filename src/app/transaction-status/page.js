'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/page';

const TransactionStatus = () => {
    const [customOrderId, setCustomOrderId] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);  // To show loading state
    const [error, setError] = useState('');  // To show error messages

    const checkStatus = async () => {
        if (!customOrderId) {
            setError('Please enter a Custom Order ID');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }

            const response = await axios.get(`/api/transactions/status/${customOrderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setStatus(response.data.status);
        } catch (error) {
            console.error('Error fetching transaction status:', error);
            setError('Failed to fetch transaction status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="dark:bg-gray-800 dark:text-white">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Check Transaction Status</h1>
                    
                    {/* Input and Button for Checking Status */}
                    <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Enter Custom Order ID"
                            value={customOrderId}
                            onChange={(e) => setCustomOrderId(e.target.value)}
                            className="border p-2 rounded mb-2 sm:mb-0 sm:w-1/3 text-green-500"
                        />
                        <button
                            onClick={checkStatus}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 sm:w-1/3"
                        >
                            {loading ? 'Checking...' : 'Check Status'}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 text-red-500">
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Transaction Status */}
                    {status && (
                        <div className="mt-4">
                            <h2 className="font-bold">Transaction Status:</h2>
                            <p>{status}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionStatus;
