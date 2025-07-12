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
    onSuccess: (data) => {
      alert("Item listed successfully!");
      console.log(data);
    },
    onError: (err) => {
      console.error("Upload failed", err);
      alert("Failed to list item");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      imageFiles: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("type", formData.type);
    data.append("size", formData.size);
    data.append("condition", formData.condition);
    data.append("tags", formData.tags);
    data.append("points", formData.points);

    formData.imageFiles.forEach((file) => {
      data.append("images", file);
    });

    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">Add New Item</h2>

      <input name="title" placeholder="Title" className="w-full border p-2" onChange={handleChange} />
      <textarea name="description" placeholder="Description" className="w-full border p-2" onChange={handleChange} />

      <div className="grid grid-cols-2 gap-4">
        <input name="category" placeholder="Category" className="border p-2" onChange={handleChange} />
        <input name="size" placeholder="Size" className="border p-2" onChange={handleChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select name="type" value={formData.type} onChange={handleChange} className="border p-2">
          <option value="swap">Swap</option>
          <option value="redeem">Redeem</option>
        </select>
        <input name="points" type="number" placeholder="Points" className="border p-2" onChange={handleChange} />
      </div>

      <input name="condition" placeholder="Condition" className="w-full border p-2" onChange={handleChange} />
      <input name="tags" placeholder="Tags (comma separated)" className="w-full border p-2" onChange={handleChange} />

      <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="border p-2 w-full" />

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Submit
      </button>
    </form>
  );
};

export default AddItem;
