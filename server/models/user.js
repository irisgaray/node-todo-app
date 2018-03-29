const { mongoose } = require('../db/mongoose'); // detructuring: extracts the mongoose property from the returned obj into mongoose variable

const User = mongoose.model('User', {
    email: {
        type: String,
        minlength: 5,
        required: true,
        trim: true
    }
});

module.exports = {
    User
}