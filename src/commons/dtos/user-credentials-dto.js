class UserCredentialsDTO {
    constructor(user_id, discord_user_id, data) {
        this.user_id = user_id;
        this.discord_user_id = discord_user_id;
        this.data = data;
    }
}

module.exports = UserCredentialsDTO
