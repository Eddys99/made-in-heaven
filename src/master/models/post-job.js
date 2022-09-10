const mongoose = require('mongoose');
const { Schema } = mongoose;
const getUtil = require('src/commons/getUtil');
const setDate = require('src/commons/setDate');

const PostJob = new Schema({
    request_id: {
        type: String,
        default: null
    },
    user_id: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: ''
    },
    embeds: {
        type: Array,
        default: []
    },

    //timestamps
    updated_at: {
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
    collection: 'post-job'
});

PostJob.methods.setUpdatedAt = function(value) {
    this['updated_at'] = new setDate(value);
}

PostJob.methods.setDateProperty = function(property, value) {
    this[property] = new setDate(value);
}

PostJob.pre('save', function(next) {
    if (this.isNew) {
        this.setDateProperty('created_at');
    } else {
        this.setUpdatedAt();
    }
    next();
});

module.exports = mongoose.model('PostJob', PostJob);
