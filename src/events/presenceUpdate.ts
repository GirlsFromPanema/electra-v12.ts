import { Presence } from "discord.js";
import { Client } from "../classes";

export default {
    name: "presenceUpdate",
    execute(oldPresence: Presence, newPresence: Presence, client: Client) {
        if (!oldPresence || !oldPresence.user.bot) return;
        let oldSt: string = oldPresence.status
        let newSt: string = newPresence.status
        if (oldSt == newSt) return;
        if (oldSt == "offline") { //if a bot became online
            let config: { channel: string, role: string } = client.db.get(oldPresence.member.guild.id)
            if (!config || !config.channel || !config.role) return;
            //@ts-ignore
            oldPresence.member.guild.channels.cache.get(config.channel).send(`<@&${config.role}>`, { embed: { title: "Yay! A bot went online!", description: `Looks like ${oldPresence.member} (${oldPresence.user.tag}) just went back online! `, thumbnail: { url: oldPresence.user.avatarURL({ format: "png", size: 1024 }) }, timestamp: new Date(Date.now()) } })
        } else if (newSt == "offline") { //if a bot became offline
            let config: { channel: string, role: string } = client.db.get(oldPresence.member.guild.id)
            if (!config || !config.channel || !config.role) return;
            //@ts-ignore
            oldPresence.member.guild.channels.cache.get(config.channel).send(`<@&${config.role}>`, { embed: { title: "Oh no, a bot went offline :(", description: `${oldPresence.member} (${oldPresence.user.tag}) just wenf offline :(`, thumbnail: { url: oldPresence.user.avatarURL({ format: "png", size: 1024 }) }, timestamp: new Date(Date.now()) } })
        } else return;
    }
}