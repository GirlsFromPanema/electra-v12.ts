import { Client, ClientOptions, Collection } from "discord.js"
import { readdirSync } from "fs"
import { brandingColor } from "../consts"
import Command from "./Command"

export default class extends Client {
    config: { token: string, prefix: string, owners: string[] };
    commands: Collection<string, any>
    aliases: Collection<string, string>
    brandingColor: string;

    constructor(opts: ClientOptions, config: { token: string, prefix: string, owners: string[] }) {
        super(opts)
        this.config = config
        this.commands = new Collection()
        this.aliases = new Collection()
        this.loadEvents()
        this.loadCommands()
        this.brandingColor = brandingColor
    }

    start() {
        this.login(this.config.token)
    }

    loadEvents() {
        const eventFiles = readdirSync(`${__dirname}/../events`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`${__dirname}/../events/${file}`).default;
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args, this));
                console.log(`[${new Date().toISOString()}][STARTUP][EVENTS] Event ${event.name} registered! Type: once`)
            } else {
                this.on(event.name, (...args) => event.execute(...args, this));
                console.log(`[${new Date().toISOString()}][STARTUP][EVENTS] Event ${event.name} registered! Type: on`)
            }
        }
    }

    loadCommands() {
        readdirSync(`${__dirname}/../commands`)
            .filter((f) => f.endsWith(".js"))
            .forEach(async (command) => {
                //@ts-ignore
                const comm = await import(`${__dirname}/../commands/${command}`)
                const c = new comm.default(this);
                this.commands.set(c.name, c);
                c.aliases.forEach((a) => {
                    this.aliases.set(a, c.name);
                });
                console.log(`[${new Date().toISOString()}][STARTUP][COMMANDS] Command ${c.name} registered!`)
            })
    }

    isOwner(id: string): boolean {
        return this.config.owners.includes(id)
    }

    getCommand(name: string): Command {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }
}