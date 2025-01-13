'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/page';

const TransactionBySchool = () => {
  const [transactions, setTransactions] = useState([]);
  const [schoolId, setSchoolId] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactionsBySchool = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('/api/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions by school:', error);
      }
    };

    fetchTransactionsBySchool();
  }, []);

  const handleFilterBySchool = () => {
    if (schoolId) {
      const filtered = transactions.filter(
        (t) => t.school_id === schoolId
      );
      setFilteredTransactions(filtered);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dark:bg-gray-800 dark:text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Transactions by School</h1>

          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <input
              type="text"
              placeholder="Enter School ID"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="border p-2 rounded text-green-500 mb-2 sm:mb-0 sm:w-1/3"
            />
            <button
              onClick={handleFilterBySchool}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 sm:w-1/3"
            >
              Filter by School
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-2">Collect ID</th>
                  <th className="border p-2">School ID</th>
                  <th className="border p-2">Gateway</th>
                  <th className="border p-2">Order Amount</th>
                  <th className="border p-2">Transaction Amount</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Custom Order ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.collect_id}>
                    <td className="border p-2">{transaction.collect_id}</td>
                    <td className="border p-2">{transaction.school_id}</td>
                    <td className="border p-2">{transaction.gateway}</td>
                    <td className="border p-2">{transaction.order_amount}</td>
                    <td className="border p-2">{transaction.transaction_amount}</td>
                    <td className="border p-2">{transaction.status}</td>
                    <td className="border p-2">{transaction.custom_order_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionBySchool;
