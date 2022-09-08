class ResponseDTO {
    constructor(data, msg = null) {
        this.msg = msg;
        this.success =  true;

        if (data) {
            this.data = data;
            this.data_s = data.toString();
        }
    }
}

module.exports = ResponseDTO;
