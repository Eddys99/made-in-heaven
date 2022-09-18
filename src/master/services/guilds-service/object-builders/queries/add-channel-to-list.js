class AddChannelToList {
    constructor(data) {
        this['$addToSet'] = {
            target_channel: {
                channel_id: data.channel_id,
                channel_name: data.channel_name
            }
        }
    }
}

module.exports = AddChannelToList;
