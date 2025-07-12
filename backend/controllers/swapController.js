
const SwapRequest = require("../models/SwapRequest");
const Item = require("../models/item");
exports.createSwapRequest = async (req, res) => {
  const { itemOffered, itemRequested } = req.body;
  const requestedBy = req.user._id;

  try {
    const requestedItem = await Item.findById(itemRequested);
    const requestedTo = requestedItem.ownerId;

    const request = await SwapRequest.create({
      requestedBy,
      requestedTo,
      itemOffered,
      itemRequested,
    });

    // Optionally update statuses
    await Item.findByIdAndUpdate(itemOffered, { status: "pending" });
    await Item.findByIdAndUpdate(itemRequested, { status: "pending" });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Failed to create swap request", error });
  }
};

exports.getMySwapItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const items = await Item.find({
      ownerId: userId,
      type: "swap",
      status: "available",
    });

    res.json(items);
  } catch (error) {
    console.error("Error fetching my swap items:", error);
    res.status(500).json({ message: "Failed to fetch swap items", error });
  }
};

// GET /items/:id
exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    res.status(500).json({ message: "Failed to fetch item", error });
  }
};
