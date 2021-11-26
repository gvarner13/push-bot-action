const { Client, Intents } = require('discord.js');
const core = require('@actions/core');
const github = require('@actions/github');
// need to change this to get token from github action yaml
const { token } = require('./config.json');

const createMessage = (channelId, gitHubPayload) => ({
    "channel_id": channelId,
    "content": `A new pull request has been submitted by ${gitHubPayload.user}`,
    "tts": false,
    "components": [
      {
        "type": 1,
        "components": [
          {
            "style": 5,
            "label": `View Pull Request`,
            "url": gitHubPayload.url,
            "disabled": false,
            "type": 2
          }
        ]
      }
    ],
    "embeds": [
      {
        "type": "rich",
        "title": `Pull Request for ${gitHubPayload.repoName}`,
        "description": `Please look over the pull request when you have time`,
        "color": 0x05f341
      }
    ]
  });

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

const gitHubPayload = {
    user: 'gvarner13',
    repoName: 'test-repo',
    url: 'https://www.github.com'
};

const channelName = core.getInput('channel-name');
client.once('ready', () => {
    console.log('Ready!')
    const { id: channelId } = client.channels.cache.find(channel => channel.name === channelName);
    // console.log(channel);
    const channel = client.channels.cache.get(channelId);
    channel.send('Sup!');

    client.on("messageCreate", function(message){
        // console.log(`message is created -> ${message}`);
        // channel.send('That is a cool emjoi you just used, NOT!');
        // console.log({message});
        if(!message.author.bot) {
            channel.send(createMessage(channelId, gitHubPayload));
        }
    });
});

client.login(token);