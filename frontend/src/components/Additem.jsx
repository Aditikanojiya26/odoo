// src/components/AddItem.jsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addItem } from "../services/items";

const AddItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "swap",
    size: "",
    condition: "",
    tags: "",
    points: 0,
    imageFiles: [],
  });

  const mutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      alert("🎉 Item successfully listed!");
      setFormData({ title: "", description: "", category: "", type: "swap", size: "", condition: "", tags: "", points: 0, imageFiles: [] });
    },
    onError: () => {
      alert("🚫 Failed to list item");
    },
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, imageFiles: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      key === "imageFiles" ? value.forEach((file) => data.append("images", file)) : data.append(key, value);
    });
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#f0f8f4] py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-8 bg-white border border-gray-200 shadow-lg rounded-lg space-y-6"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-green-600 to-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold tracking-tight">🧺 List Your Item</h2>
          <p className="text-sm mt-1">Join the sustainable fashion movement by submitting reusable items.</p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {[
            { name: "title", placeholder: "Item Title" },
            { name: "description", placeholder: "Item Description", multiline: true },
            { name: "category", placeholder: "Category (e.g., Apparel)" },
            { name: "size", placeholder: "Size (e.g., M, 42)" },
            { name: "condition", placeholder: "Condition (e.g., Like New)" },
            { name: "tags", placeholder: "Tags (comma separated)" },
          ].map(({ name, placeholder, multiline }) =>
            multiline ? (
              <textarea
                key={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
                rows={4}
                required
              />
            ) : (
              <input
                key={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
                required={name !== "size"}
              />
            )
          )}

          {/* Dropdown and Points */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none w-full"
            >
              <option value="swap">Swap</option>
              <option value="redeem">Redeem</option>
            </select>
            <input
              name="points"
              type="number"
              value={formData.points}
              onChange={handleChange}
              placeholder="Points (if redeemable)"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {formData.imageFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {formData.imageFiles.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="h-24 object-cover rounded-md border border-gray-300 shadow"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
        >
          ✅ List Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
