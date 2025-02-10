// models/Item.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let itemSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String
    },
    type: {
        type: String
    },
    quantity: {
        type: Number
    },
    company: {
        type: String
    },
    email: {
        type: String
    },
}, {
    collection: 'items'
})

module.exports = mongoose.model('Item', itemSchema)