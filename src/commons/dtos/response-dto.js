class ResponseDTO {
    constructor(msg = null) {
        this.msg = msg;
        this.success =  true;
    }
}

module.exports = ResponseDTO;
