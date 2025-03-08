
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const confessionRoutes = require("./routes/confessionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/confessions", confessionRoutes);

app.get("/", (req, res) => {
    res.send("Secret Confessions API is running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const redis = require("redis");

// Connect to Redis
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379", // Update if using a cloud Redis service
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
redisClient.connect().then(() => console.log("📌 Connected to Redis"));

module.exports = redisClient;

const secretMessageRoutes = require("./routes/secretMessageRoutes");
app.use("/api/secret-messages", secretMessageRoutes);

/*
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const redisClient = require("./server"); // Ensure Redis is connected

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // IMPORTANT: Parses incoming JSON requests

const secretMessageRoutes = require("./routes/secretMessageRoutes");
app.use("/api/secret-messages", secretMessageRoutes);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/