# Push-bot Discord Action 🤖

This action will post a message to the channel of your choice with the PR information and a link to the PR.

## Inputs

## `channel-name`

**Required** The name of the channel the bot posts to. Default `"general"`.

## `bot-token`

**Required** The discord token you generated for your bot.

## Example usage

```yaml
with: gvarner13/push-bot-action@v1.0
    channel-name: "general"
    bot-token: ${{ secrets.BotSecret }}
```
