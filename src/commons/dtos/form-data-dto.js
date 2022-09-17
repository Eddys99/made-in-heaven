const config = require('config');

class FormDataDTO {
    constructor(type_of_form_data, data) {
        this.client_id = config.DiscordConfig.client_id;
        this.client_secret = config.DiscordConfig.client_secret;

        if (type_of_form_data === 'revokeToken') {
            this.token = data;
        } else if (type_of_form_data === 'refreshToken') {
            this.grant_type = 'refresh_token';
            this.refresh_token = data;
        } else if (type_of_form_data === 'authenticateUser') {
            this.grant_type = 'authorization_code';
            this.code = data.toString();
            this.redirect_uri = 'http://localhost:3050/Oauth2/authorize'
        }
    }
}

module.exports = FormDataDTO;
