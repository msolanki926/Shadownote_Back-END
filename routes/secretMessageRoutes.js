const express = require("express");
const router = express.Router();
const { createSecretMessage, getSecretMessage } = require("../models/SecretMessage");


// ✅ Create a secret message
router.post("/", async (req, res) => {
    try {
        const { text, expiryTime } = req.body;
        if (!text) return res.status(400).json({ message: "Message cannot be empty" });

        const expiresIn = expiryTime || 86400; // Default: 24 hours (in seconds)
        const messageId = await createSecretMessage(text, expiresIn);

        res.status(201).json({ message: "Secret message created", link: `/api/secret-messages/${messageId}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Retrieve a secret message (one-time view)
router.get("/:messageId", async (req, res) => {
    try {
        const message = await getSecretMessage(req.params.messageId);
        if (!message) return res.status(404).json({ message: "Message not found or already viewed" });

        res.json({ message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
