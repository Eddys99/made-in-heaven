const mongoose = require('mongoose');
const { Schema } = mongoose;
const setDate = require('src/commons/setDate');

const User = new Schema({
    user_id: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    created_at: {
        date: {
            type: String,
            default: null
        },
        timestamp: {
            type: String,
            default: null
        },
        timezone_type: {
            type: Number,
            default: 3
        },
        timezone: {
            type: String,
            default: 'UTC'
        }
    }
}, {
    collection: 'users'
});

User.methods.setDateProperty = function(property, value) {
    this[property] = new setDate(value);
}

User.pre('save', function(next) {
    if (this.isNew) {
        this.setDateProperty('created_at');
    }
    next();
});

module.exports = mongoose.model('User', User);
