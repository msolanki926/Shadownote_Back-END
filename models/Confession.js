const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Confession", confessionSchema);
