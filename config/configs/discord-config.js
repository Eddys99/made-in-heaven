module.exports = (env) => {
    const discord_config = env.DiscordConfig;

    return {
        DiscordConfig: {
            token: (discord_config && discord_config.token)
                ? discord_config.token
                : 'MTAwOTgxNDc3NTI4MDE4NTQ0NA.GypnMZ.EcrjGcs_hLVMfHrl5AQwikYZcTsR-mzcHUnY_w',
            invite_link: (discord_config.invite_link)
                ? discord_config.invite_link
                : '',
            client_id: (discord_config && discord_config.client_id)
                ? discord_config.client_id
                : '1009814775280185444',
            client_secret: (discord_config && discord_config.client_secret)
                ? discord_config.client_secret
                : 'XK5qSY0pGO8U_dtOdPuw492ziTCgY3Se'
        }
    };
};
