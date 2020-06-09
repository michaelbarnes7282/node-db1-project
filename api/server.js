const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

const accountRouter = require("./accountRouter.js");

server.use(express.json());

server.use("/accounts", logger, accountRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Hey I'm working!</h2>`);
});

function logger(req, res, next) {
    const today = new Date().toLocaleDateString('en-US');
    console.log(`${today} ${req.method} ${req.url}`);

    next();
};

module.exports = server;
