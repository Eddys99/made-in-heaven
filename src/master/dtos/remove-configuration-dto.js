class RemoveConfigurationDTO {
    constructor(data) {
        this.discord_user_id = data.discord_user_id;
        this.server_id = data.server_id;

        if (data.channel_id) {
            this.channel_id = data.channel_id;
        }
    }
}

module.exports = RemoveConfigurationDTO;
