const mongoose = require('mongoose');
const { Schema } = mongoose;
const getUtil = require('src/commons/getUtil');
const setDate = require('src/commons/setDate');

const UserCredentials = new Schema({
    user_id: {
        type: String,
        default: ''
    },
    discord_user_id: {
        type: String,
        default: ''
    },
    access_token: {
        type: String,
        default: ''
    },
    token_type: {
        type: String,
        default: ''
    },
    expires_in: {
        type: Number,
        default: 604800
    },
    refresh_token: {
        type: String,
        default: ''
    },
    scope: {
        type: String,
        default: ''
    }
}, {
   collection: 'user-credentials'
});

UserCredentials.methods.updateExpiresAt = function(property) {
    if (getUtil.isNotEmptyString(property)) {
        const value = new Date(Date.now());
        value.setDate(value.getDate() + 7);

        this[property] = new setDate(value);
    } else {
        throw new Error('Missing property !');
    }
}

UserCredentials.methods.setDateProperty = function(property, value) {
    this[property] = new setDate(value);
}

UserCredentials.pre('save', function(next) {
    if (this.isNew) {
        this.setDateProperty('created_at');
        this.updateExpiresAt('expires_at');
    }
    next();
});

module.exports = mongoose.model('UserCredentials', UserCredentials);
