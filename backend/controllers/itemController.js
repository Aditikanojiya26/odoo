const Item = require("../models/item");

exports.addItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      points,
    } = req.body;

    const imagePaths = req.files.map((file) => `/uploads/items/${file.filename}`);

    const newItem = new Item({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags.split(",").map((tag) => tag.trim()),
      points: Number(points),
      images: imagePaths,
      ownerId: req.user.id,
      status: "available",
    });

    await newItem.save();

    res.status(201).json({ message: "Item listed successfully", item: newItem });
  } catch (error) {
    console.error("Add item error:", error);
    res.status(500).json({ message: "Failed to list item" });
  }
};
