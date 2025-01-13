'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/page';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('authToken'); 

        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(response.data);
        setFilteredTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleFilter = () => {
    let filtered = transactions;

    if (statusFilter) {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    if (startDate && endDate) {
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.request.date);
        return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
      });
    }

    if (search) {
      filtered = filtered.filter((t) =>
        t.custom_order_id.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="dark:bg-gray-800 dark:text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Transactions Overview</h1>
        {/* Filters and Table go here */}
        <div className="p-6">
      <div className="mb-4 flex gap-4 flex-wrap ">
        <select
          className="border p-2 rounded bg-purple-500 text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <input
          type="date"
          className="border p-2 rounded bg-purple-500 text-white"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded bg-purple-500 text-white"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Order ID"
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
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
          {paginatedTransactions.map((transaction) => (
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

      <div className="mt-4 flex justify-center items-center gap-2">
        {Array.from({ length: Math.ceil(filteredTransactions.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`p-2 border rounded bg-purple-500 text-white${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
