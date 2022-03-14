const mongoose = require('mongoose');

const { Schema } = mongoose;

const Cans = new Schema({
    id: {
        type: Number,
        required: true
    },
    wallet: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    aerodinamica: {
        type: Number,
        required: true
    },
    aceleracion: {
        type: Number,
        required: true
    },
    resistencia: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    packageId: {
        type: Number,
        required: true
    },
    hash: {
        type: String,
        required: true,
        default: ""
    }
});

module.exports = mongoose.model('Cans', Cans);