class PostJob {
    constructor(data = { }) {
        this.status = data.status;
        this.user_uid = data.user_uid;
        this.target_channels = data.target_channels;

        if (data.content) {
            this.content_text = data.content;
        }
        if (data.embeds) {
            this.embeds = data.embeds;
        }
    }
}

module.exports = PostJob;
