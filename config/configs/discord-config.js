module.exports = (env) => {
    const discord_config = env.DiscordConfig;

    return {
        DiscordConfig: {
            token: (discord_config && discord_config.token)
                ? discord_config.token
                : '',
            invite_link: (discord_config.invite_link)
                ? discord_config.invite_link
                : 'https://discord.com/api/oauth2/authorize?client_id=1009814775280185444&permissions=51328&redirect_uri=http%3A%2F%2Flocalhost%3A3050%2FOauth2%2Fauthorize&response_type=code&scope=identify%20guilds%20bot',
            client_id: (discord_config && discord_config.client_id)
                ? discord_config.client_id
                : '',
            client_secret: (discord_config && discord_config.client_secret)
                ? discord_config.client_secret
                : ''
        }
    };
};
