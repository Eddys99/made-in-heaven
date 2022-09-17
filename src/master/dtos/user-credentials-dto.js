class UserCredentialsDTO {
    constructor(data) {
        this.user_id = data.user_id;
        this.discord_user_id = data.discord_user_id;
        this.access_token = data.data.access_token;
        this.token_type = data.data.token_type;
        this.expires_in = data.data.expires_in;
        this.refresh_token = data.data.refresh_token;
        this.scope = data.data.scope;
    }
}

module.exports = UserCredentialsDTO;
