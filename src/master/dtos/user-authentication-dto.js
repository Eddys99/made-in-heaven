class UserAuthenticationDTO {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
    }
}

module.exports = UserAuthenticationDTO;
