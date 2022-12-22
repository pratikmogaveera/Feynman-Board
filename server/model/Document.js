const mongoose = require('mongoose')
const Schema = mongoose.Schema

const docSchema = new Schema({
    doc_id: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: [
        {
            cont_id: Number,
            text: String,
            state: Number
        }
    ],
})

module.exports = mongoose.model('Document', docSchema)