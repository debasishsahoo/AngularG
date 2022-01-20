const mongoose = require('mongoose');

let ContactSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String, required: true },
    body: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isSolved: { type: Boolean, default: false },

}, { timestamp: true });

module.exports = mongoose.model('contacts', ContactSchema)