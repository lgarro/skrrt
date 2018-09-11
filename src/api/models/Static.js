const mongoose = require('mongoose')

const { Schema } = mongoose

const staticSchema = new Schema({
    welcomeMessage: String,
})

module.exports = mongoose.model('Static', staticSchema)
