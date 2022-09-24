class AddChannelToList {
    constructor(data) {
        this['$addToSet'] = {
            target_channels: {
                channel_id: data.channel_id,
                channel_name: data.channel_name
            }
        }

        return this;
    }
}

module.exports = AddChannelToList;
