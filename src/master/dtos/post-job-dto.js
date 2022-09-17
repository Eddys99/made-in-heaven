class PostJob {
    constructor(data = { }) {
        this.user_id = data.user_id;

        if (data.message) {
            this.content = data.message;
        }
        if (data.embeds) {
            this.embeds = data.embeds;
        }

        if (data.request_id) {
            this.request_id = data.request_id;
        } else {
            this.request_id = `${data.user_id}_${Date.now()}`;
        }
    }
}

module.exports = PostJob;
