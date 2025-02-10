// models/Images.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let imageSchema = new Schema({
    description: {
        type: String
    },
    imageData: {
        type: String
    }
}, {
    collection: 'images'
})

module.exports = mongoose.model('Image', imageSchema)
