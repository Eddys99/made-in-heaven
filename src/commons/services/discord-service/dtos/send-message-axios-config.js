const config = require('config');

const $BOT_TOKEN = config.DiscordConfig.token;

class SendMessageAxiosConfig {
    constructor(channel_id, body_data) {
        this.method = 'POST';
        this.url = `https://discord.com/api/v10/channels/${channel_id}/messages`;
        this.headers = { 'Authorization': `Bot ${$BOT_TOKEN}` };
        this.data = body_data;
    }
}

module.exports = SendMessageAxiosConfig;
