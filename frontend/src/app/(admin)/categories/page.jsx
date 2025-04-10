"use client";

import { useState, useEffect } from "react";
import { AdminLayout, loadMenu } from "@/app/(admin)/components/admin_layout";
export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
  const menus = loadMenu()
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const endpoint = editingId ? `${API_URL}/categories/${editingId}` : `${API_URL}/categories`;
      
      await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category", error);
    }
  };

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const resetForm = () => {
    setName("");
    setEditingId(null);
    setSelectedCategory(null);
  };

  return (
    
    <div className="container mx-auto p-6 flex gap-6">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-50 rounded-xl p-4 shadow-sm max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Danh mục</h2>
          <ul className="divide-y divide-gray-200">
            {categories.map((category) => (
              <li
                key={category.id}
                className="p-3 hover:bg-gray-100 rounded-md cursor-pointer transition duration-150"
                onClick={() => handleSelect(category)}
              >
                <span className="font-medium text-gray-700">{category.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-2/3 bg-white rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Quản lý danh mục</h1>
          <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg shadow-md transition duration-200"
              >
                {editingId ? "Cập nhật danh mục" : "Thêm danh mục"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 hover:bg-gray-500 text-white py-3 px-4 rounded-lg shadow-md transition duration-200"
                >
                  Quay lại
                </button>
              )}
            </div>
          </form>
          {selectedCategory && (
            <div className="mt-4">
              <p className="text-gray-600">Selected: <span className="font-medium">{selectedCategory.name}</span></p>
                <button
                    onClick={() => setShowConfirm(true)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                    Xóa Danh mục
                </button>
            </div>
          )}
          
        </div>
        {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Xác nhận xoá</h2>
                <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xoá danh mục <strong>{selectedCategory?.name}</strong>?</p>
                <div className="flex justify-end gap-3">
                    <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                    Huỷ
                    </button>
                    <button
                    onClick={() => {
                        handleDelete(selectedCategory.id);
                        setShowConfirm(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                    Xoá
                    </button>
                </div>
                </div>
            </div>
            )}
      </div>

    
  );
}