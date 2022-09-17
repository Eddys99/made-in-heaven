class HeadersDTO {
    constructor(type_of_header = null, data = null) {
        if (!type_of_header && !data) {
            this.headers = {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        } else if (type_of_header === 'Authorization') {
            this.headers = {
                'Authorization': `Bearer ${data}`
            }
        } else if (type_of_header === 'Authorization_bot') {
            this.headers = {
                'Authorization': `Bot ${data}`
            }
        }

        return this;
    }
}

module.exports = HeadersDTO;
