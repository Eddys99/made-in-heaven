class CheckIfChannelExistsDTO {
    constructor(discord_user_id, channel_id) {
        this.discord_user_id = discord_user_id;
        this.channel_id = channel_id;
    }
}

module.exports = CheckIfChannelExistsDTO;
