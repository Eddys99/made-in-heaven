class SavePostJob {
    constructor(data) {
        this.request_id = data.request_id;
        this.user_id = data.user_id;
        this.content_text = data.content_text;
        this.embeds = data.embeds;

        return this;
    }
}

module.exports = SavePostJob;
