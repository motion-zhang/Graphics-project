// const express = require('express');
// const app = express();
// app.use(express.static('public'));
// app.listen(3000);

console.log("Hello!")

const express = require("express")
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'run')))

app.get("./hello", (req, res) => {
    res.send("hello from the server")
})

const world = require("./world/world")
world(app)

app.listen(3000)