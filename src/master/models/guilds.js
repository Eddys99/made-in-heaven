const mongoose = require('mongoose');
const { Schema } = mongoose;

const GuildSchema = new Schema({
    user_uid: {
        type: String,
        default: ''
    },
    discord_user_uid: {
        type: String,
        default: ''
    },
    server_id: {
        type: String,
        default: ''
    },
    server_name: {
        type: String,
        default: ''
    },
    server_icon:{
        type: String,
        default: ''
    },
    owner_id: {
        type: String,
        default: ''
    },
    target_channels: [{
        channel_id: {
            type: String
        },
        channel_name: {
            type: String
        }
    }]
}, {
    collection: 'guilds-configurations'
});

module.exports = mongoose.model('GuildSchema', GuildSchema);
