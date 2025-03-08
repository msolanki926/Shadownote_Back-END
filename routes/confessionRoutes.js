const express = require("express");
const router = express.Router();
const Confession = require("../models/Confession");

// ✅ 1. Create a new confession
router.post("/", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Confession cannot be empty" });

        const confession = await Confession.create({ text });
        res.status(201).json(confession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ 2. Get all confessions
router.get("/", async (req, res) => {
    try {
        const confessions = await Confession.find().sort({ createdAt: -1 });
        res.json(confessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ 3. Delete a confession
router.delete("/:id", async (req, res) => {
    try {
        const confession = await Confession.findById(req.params.id);
        if (!confession) return res.status(404).json({ message: "Confession not found" });

        await confession.deleteOne();
        res.json({ message: "Confession deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
