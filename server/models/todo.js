const { mongoose } = require('../db/mongoose'); // detructuring: extracts the mongoose property from the returned obj into mongoose variable

// creates a model. 1: ModelName; 2: Object with the properties
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
}