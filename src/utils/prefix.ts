export default (msg, client) => {
    let p = client.prefix
    let l = [`<@!${client.user.id}>`, `<@${client.user.id}>`]
    if (l.includes(msg.content)) {
        msg.send(`My prefix is \`${p}\``);
    }
    l.forEach(r => {
        if (msg.content.toLowerCase().startsWith(r.toLowerCase())) {
            p = r
        }
    })
    if (!msg.content.startsWith(p)) p = undefined
    return p
}