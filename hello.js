console.log("Hello!")

const express = require("express")
const app = express()

app.listen(3000)
app.get("./hello", (req, res) => {
    res.send("hello from the server")
})