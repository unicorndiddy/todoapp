const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({      // model
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String
    },
    done: {
        type: Boolean
    }
})

module.exports = mongoose.model("todo", todoSchema)