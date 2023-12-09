"use strict";
const { ForgeClient } = require("forgescript");
const { ForgeDB } = require("../index");
const client = new ForgeClient({
    intents: [
        "GuildMessages",
        "Guilds",
        "MessageContent" // This intent is privileged, must be enabled in https://discord.com/developers/applications
    ],
    events: [
        "messageCreate",
        "ready"
    ],
    prefixes: [
        "t!",
        "?"
    ],
    extensions: [new ForgeDB()]
});
client.commands.add({
    name: "e",
    code: `$eval[$message]`,
    type: "messageCreate" // The event to act on
});
client.login("MTE0NTAzNjYzODA2NjU4NTY1Mw.GgiaNg.KQQmJJpv8HbMXsRGANGnusLjXq8vnLZ2jzOc9o");
//# sourceMappingURL=runner.js.map