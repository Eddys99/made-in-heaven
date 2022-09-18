require('app-module-path').addPath(`${__dirname}/..`);

const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const config = require('config');

const $PREFIX = "!";
const $LABEL = 'Discord-Bot';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
    const $JOB_LABEL = 'ready', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
    console.log(`${$LOG_LABEL} Logged as ${client.user}`);
});

client.on("messageCreate", (message) => {
    const $JOB_LABEL = 'messageCreate', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    if (message.content.startsWith($PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring($PREFIX.length)
            .split(/\s+/);

        if (CMD_NAME === "add-ch") {
            const payload = {
                discord_user_id: message.author.id,
                server_id: message.guildId,
                server_name: message.guild.name,
                server_icon: message.guild.iconURL(),
                owner_id: message.guild.ownerId,
                channel_id: message.channelId,
                channel_name: message.channel.name
            }

            return axios({
                method: 'post',
                url: 'http://localhost:3035/discord-server/add-channel',
                data: payload
            })
                .then(response => {
                    return console.log(`${$LOG_LABEL} payload sent: `, { response });
                })
                .catch(error => {
                    message.channel.send("Couldn't register channel.");
                    return console.error(`${$LOG_LABEL} failed to send payload: `, { error });
                });
        }

        if (CMD_NAME === "remove-ch") {
            const payload = {
                discord_user_id: message.author.id,
                server_id: message.guildId,
                channel_id: message.channelId
            }

            return axios({
                method: 'post',
                url: 'http://localhost:3035/discord-server/remove-channel',
                data: payload
            })
                .then(response => {
                    return console.log(`${$LOG_LABEL} payload sent: `, { response });
                })
                .catch(error => {
                    message.channel.send("Couldn't remove channel.");
                    return console.error(`${$LOG_LABEL} payload failed to send: `, { error });
                });
        }
    }
});

client.on('guildCreate', (guild) => {
    const $JOB_LABEL = 'guildCreate', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    guild.fetchAuditLogs({type: "BOT_ADD", limit: 1})
        .then(log => {
            const payload = {
                discord_user_id: log.entries.first().executor.id,
                server_id: guild.id,
                server_name: guild.name,
                server_icon: guild.iconURL(),
                owner_id: guild.ownerId
            };

            return axios({
                method: 'post',
                url: 'http://localhost:3035/discord-server/register-server',
                data: payload
            })
                .then(response => {
                    return console.log(`${$LOG_LABEL} payload sent: `, { response });
                })
                .catch(error => {
                    message.channel.send("Couldn't register server.");
                    return console.error(`${$LOG_LABEL} payload failed to send: `, { error });
                });
        });
});


client.on('guildDelete', (guild) => {
    const $JOB_LABEL = 'guildDelete', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
    const payload = {
        server_id: guild.id,
        owner_id: guild.ownerId
    };

    return axios({
        method: 'post',
        url: 'http://localhost:3035/discord-server/remove-server',
        data: payload
    })
        .then(response => {
            return console.log(`${$LOG_LABEL} payload sent: `, { response });
        })
        .catch(error => {
            message.channel.send("Couldn't remove server.");
            return console.error(`${$LOG_LABEL} payload failed to send: `, { error });
        });
});

client.login(config.DiscordConfig.token);
