const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }, 
    email: {
        required: true,
        type: String
    }, 
    points: {
        required: true,
        type: Number
    },
    teams: {
        required: true,
        type: String
    },
    company: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)