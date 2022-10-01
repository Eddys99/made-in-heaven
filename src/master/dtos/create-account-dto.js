class CreateAccountDTO {
    constructor(data) {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.password2 = data.password2;
    }
}

module.exports = CreateAccountDTO;
