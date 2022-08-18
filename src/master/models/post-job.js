const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostJob = new Schema({
    request_id: {
        type: String,
        default: null
    },
    user_id: {
        type: String,
        default: null
    },
    content_text: {
        type: String,
        default: ''
    },
    embeds: {
        type: Array,
        default: []
    },

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

module.exports = mongoose.model('PostJob', PostJob);
