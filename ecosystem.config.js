module.exports = {
    apps: [
        {
            name: "Util's bot",
            script: ".",
            //options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            autorestart: true,
            watch: false,
        },
    ],
};
