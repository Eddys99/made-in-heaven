class MessageDTO {
    constructor(data) {
        if (data.content) {
            this.content = data.content;
        }
        if (data.embeds) {
            this.embeds = data.embeds;
        }
    }
}

module.exports = MessageDTO;
