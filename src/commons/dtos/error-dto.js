class ErrorDTO {
    constructor(error, msg = null, data = null) {
        this.error = error;
        this.error_s = error.toString();
        this.success = false;

        if (data) {
            this.data = data;
        }
        if (msg) {
            this.msg = msg;
        }
    }
}

module.exports = ErrorDTO;
