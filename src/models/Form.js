const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },
      
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Form = mongoose.model('FormTable', FormSchema);
module.exports = Form;