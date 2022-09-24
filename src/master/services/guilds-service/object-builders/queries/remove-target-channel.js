class RemoveTargetChannel {
    constructor(channel_id) {
        this['$pull'] = {
            target_channels: {
                channel_id: channel_id
            }
        };

        return this;
    }
}

module.exports = RemoveTargetChannel;
