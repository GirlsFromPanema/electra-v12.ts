import { Message } from "discord.js";
import { Client } from "../classes";

export default (msg: Message, client: Client) => {
    let p = client.config.prefix
    let l = [`<@!${client.user.id}>`, `<@${client.user.id}>`]
    if (l.includes(msg.content)) {
        msg.channel.send(`My prefix is \`${p}\``);
    }
    l.forEach(r => {
        if (msg.content.toLowerCase().startsWith(r.toLowerCase())) {
            p = r
        }
    })
    if (!msg.content.startsWith(p)) p = undefined
    return p
}