const session = require("express-session");

const MongoStore = require("connect-mongo")(session);

const mongoose = require("mongoose");

module.exports = (app) => {
    // <== app is just a placeholder here
    // but will become a real "app" in the app.js

    // use session
    app.use(
        session({
            secret: process.env.SESS_SECRET,
            name: "appCookie",
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 60000
            }, // 60 * 1000 ms === 1 min
            store: new MongoStore({
                // <== ADDED !!!
                mongooseConnection: mongoose.connection,
                // ttl => time to live
                ttl: 60 * 60 * 24, // 60sec * 60min * 24h => 1 day
            }),
        })
    );
};