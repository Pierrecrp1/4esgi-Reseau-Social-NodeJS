const express = require("express");
const app = express();

const authMiddleware = require('./middleware/auth.middleware');

const {connect} = require('./database/connection.js');

//always return json objects
app.use(express.json());

const database = async () => {
    await connect();
}

database();

const authRoute = require("./routes/auth.route");
const postsRoute = require("./routes/posts.route")
const reactionRoute = require("./routes/reaction.route")
const postRoute = require("./routes/post.route")
//common headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST");

    next();
});


app.use('/auth', authRoute);
app.use('/post', postRoute)
app.use('/posts', authMiddleware, postsRoute)
app.use('/reaction', reactionRoute)

module.exports = app;