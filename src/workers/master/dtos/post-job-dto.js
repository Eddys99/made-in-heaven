class PostJob {
    constructor(data = { }) {
        this.status = data.status;
        this.user_uid = data.user_uid;
        this.content_type = data.content_type;

        if (data.request_id) {
            this.request_id = data.request_id;
        } else {
            this.request_id = `${data.user_uid}_${Date.now()}`;
        }

        if (data.content) {
            this.content_text = data.content;
        }
        if (data.attachments) {
            this.attachments = data.attachments;
        }
        if (data.embeds) {
            this.embeds = data.embeds;
        }
    }
}

module.exports = PostJob;
