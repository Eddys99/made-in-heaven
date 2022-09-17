class SavePostJob {
    constructor(data) {
        this.request_id = data.request_id;
        this.user_id = data.user_id;
        this.message = data.content;
        this.embeds = data.embeds;

        return this;
    }
}

module.exports = SavePostJob;
