const { ForgeClient } = require("forgescript")
const { ForgeDB } = require("../index")

const client = new ForgeClient({
    intents: [
        "GuildMessages",
        "Guilds",
        "MessageContent" // This intent is privileged, must be enabled in https://discord.com/developers/applications
    ],
    events: [
        "messageCreate",
        "ready"
    ], // Events our bot will act on
    prefixes: [
        "t!",
        "?"
    ],
    extensions: [ new ForgeDB()]
})

client.commands.add({
    name: "e", // Not defining a command name creates a command that will be executed for every event fired of given type.
    code: `$eval[$message]`,
    type: "messageCreate" // The event to act on
})

client.login("MTE0NTAzNjYzODA2NjU4NTY1Mw.GgiaNg.KQQmJJpv8HbMXsRGANGnusLjXq8vnLZ2jzOc9o")