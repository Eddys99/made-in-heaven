require('app-module-path').addPath(`${__dirname}/..`);

const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const config = require('config');

const $LABEL = 'Discord-Bot';

const commands = [
    {
        name: 'add-ch',
        description: 'Register channel to your list.',
    },
    {
        name: 'remove-ch',
        description: 'Remove channel from your list.'
    }
];

const rest = new REST({ version: '10'}).setToken(config.DiscordConfig.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(config.DiscordConfig.client_id), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
    const $JOB_LABEL = 'ready', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
    console.log(`${$LOG_LABEL} Logged as ${client.user}`);
});

client.on("interactionCreate", async interaction => {
    const $JOB_LABEL = 'interactionCreate', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    if (interaction.commandName === 'add-ch') {
        const payload = {
            discord_user_id: interaction.user.id,
            server_id: interaction.guildId,
            server_name: interaction.guild.name,
            server_icon: interaction.guild.iconURL(),
            owner_id: interaction.guild.ownerId,
            channel_id: interaction.channelId,
            channel_name: interaction.channel.name
        };

        return axios({
            method: 'POST',
            url: 'http://localhost:3035/discord-servers/add-channel',
            data: payload
        })
            .then(response => {
                interaction.reply("Request sent, wait for response...");
                return console.log(`${$LOG_LABEL} payload sent: `, { response });
            })
            .catch(error => {
                interaction.reply("Couldn't register channel.");
                return console.error(`${$LOG_LABEL} failed to send payload: `, { error, payload });
            });
    }

    if (interaction.commandName === 'remove-ch') {
        const payload = {
            discord_user_id: interaction.user.id,
            server_id: interaction.guildId,
            channel_id: interaction.channelId
        }

        return axios({
            method: 'POST',
            url: 'http://localhost:3035/discord-servers/remove-channel',
            data: payload
        })
            .then(response => {
                interaction.reply("Request sent, wait for response...");
                return console.log(`${$LOG_LABEL} payload sent: `, { response });
            })
            .catch(error => {
                interaction.reply("Couldn't remove channel.");
                return console.error(`${$LOG_LABEL} payload failed to send: `, { error });
            });
    }
});

client.on('guildCreate', (guild) => {
    const $JOB_LABEL = 'guildCreate', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    guild.fetchAuditLogs()
        .then(log => {
            const payload = {
                discord_user_id: log.entries.first().executor.id,
                server_id: guild.id,
                server_name: guild.name,
                server_icon: guild.iconURL(),
                owner_id: guild.ownerId
            };
            console.log(`${$LOG_LABEL} payload: `, { payload });
            return axios({
                method: 'POST',
                url: 'http://localhost:3035/discord-servers/add-server',
                data: payload
            })
                .then(response => {
                    return console.log(`${$LOG_LABEL} payload sent: `, { response });
                })
                .catch(error => {
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
    console.log(`${$LOG_LABEL} payload: `, { payload });
    return axios({
        method: 'POST',
        url: 'http://localhost:3035/discord-servers/remove-server',
        data: payload
    })
        .then(response => {
            return console.log(`${$LOG_LABEL} payload sent: `, { response });
        })
        .catch(error => {
            return console.error(`${$LOG_LABEL} payload failed to send: `, { error });
        });
});

client.login(config.DiscordConfig.token);
