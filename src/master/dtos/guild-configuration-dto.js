class GuildConfigurationDTO {
    constructor(data) {
        this.discord_user_id = data.discord_user_id;
        this.server_id = data.server_id;
        this.server_name = data.server_name;
        this.server_icon = data.server_icon;
        this.owner_id = data.owner_id;
        this.channel_id = data.channel_id;
        this.channel_name = data.channel_name;
    }
}

module.exports = GuildConfigurationDTO;
