import { Client, Command } from "../classes";
import { Message } from "discord.js"

export default class Bot_name extends Command {
    constructor(client: Client) {
        super({
            name: "setup",
            description: "The setup command! Usage: `setup #channel @role`",
        });
        this.client = client;
    }

    async run(msg: Message, args: string[]) {
        let channel = this.client.parseChannelMention(args[0], msg.guild)
        let role = this.client.parseRoleMention(args[1], msg.guild)
        console.log(role, channel)
        if (!args[1] || !channel || !role) return msg.channel.send("Usage: `setup #channel @role`")
        this.client.db.set(msg.guild.id, { channel: channel.id, role: role.id })
        msg.channel.send("Done! Please double-check that I have the permissions to talk in the channel!")
    }
}