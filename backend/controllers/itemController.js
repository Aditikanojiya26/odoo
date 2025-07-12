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


exports.getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

// exports.updateItem = async (req, res) => {
//   const item = await Item.findById(req.params.id);
//   if (!item) return res.status(404).json({ message: "Item not found" });

//   // Optionally check if req.user.id === item.ownerId
//   Object.assign(item, req.body);
//   if (req.files && req.files.length > 0) {
//     item.images = req.files.map((file) => `/uploads/items/${file.filename}`);
//   }

//   await item.save();
//   res.json(item);
// };

// exports.deleteItem = async (req, res) => {
//   const item = await Item.findById(req.params.id);
//   if (!item) return res.status(404).json({ message: "Item not found" });

//   // Optionally check if req.user.id === item.ownerId
//   await item.deleteOne();
//   res.json({ message: "Item deleted successfully" });
// };
