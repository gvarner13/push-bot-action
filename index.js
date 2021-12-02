const { Client, Intents } = require("discord.js");
const core = require("@actions/core");
const github = require("@actions/github");

const createMessage = (channelId, gitHubPayload) => ({
  channel_id: channelId,
  content: `A new pull request has been submitted by ${gitHubPayload.pusher.name}`,
  tts: false,
  components: [
    {
      type: 1,
      components: [
        {
          style: 5,
          label: `View Pull Request`,
          url: gitHubPayload.head_commit.url,
          disabled: false,
          type: 2,
        },
      ],
    },
  ],
  embeds: [
    {
      type: "rich",
      title: `Pull Request for ${gitHubPayload.repository.name}`,
      description: `Please look over the pull request when you have time`,
      color: 0x05f341,
    },
  ],
});

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

try {
  const channelName = core.getInput("channel-name");
  const token = core.getInput("bot-token");
  const gitHubPayload = github.context.payload;
  // console.log(`The event payload: ${payload}`);
  client.once("ready", () => {
    const { id: channelId } = client.channels.cache.find(
      (channel) => channel.name === channelName
    );
    const channel = client.channels.cache.get(channelId);

    channel.send(createMessage(channelId, gitHubPayload));
    client.destroy();
  });
  client.login(token);
} catch (error) {
  core.setFailed(error.message);
}
