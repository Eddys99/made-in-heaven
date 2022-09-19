class UpdateUserCredentials {
    constructor(data) {
        this['$set'] = {
            discord_user_id: data.discord_user_id,
            access_token: data.access_token,
            token_type: data.token_type,
            refresh_token: data.refresh_token,
            scope: data.scope,
        };

        return this;
    }
}

module.exports = UpdateUserCredentials;
