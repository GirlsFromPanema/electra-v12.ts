module.exports = {
    apps: [
        {
            name: "Koni's 2nd bot",
            script: ".",
            //options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            autorestart: true,
            watch: false,
        },
    ],
};
