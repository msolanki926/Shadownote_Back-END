const { v4: uuidv4 } = require("uuid");
const redisClient = require("../server"); // Import Redis connection

const mongoose = require("mongoose");

const secretMessageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiryTime: { type: Number, required: true } // Expiry in seconds
});

// Index to auto-delete expired messages
secretMessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: "expiryTime" });

module.exports = mongoose.model("SecretMessage", secretMessageSchema);




// Function to create a secret message
const createSecretMessage = async (text, expiryTime) => {
    const messageId = uuidv4(); // Generate a unique ID
    await redisClient.setEx(`message:${messageId}`, expiryTime, text);
    return messageId;
};

// Function to retrieve and delete a message (one-time view)
const getSecretMessage = async (messageId) => {
    const messageKey = `message:${messageId}`;
    const message = await redisClient.get(messageKey);

    if (message) {
        await redisClient.del(messageKey); // Delete after reading
    }

    return message;
};

module.exports = { createSecretMessage, getSecretMessage };
