const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
app.use(express.static('public'));

var http = require('http')
var server = http.Server(app)

app.get("/", (req, res) => {
    res.sendFile('public/index.html', {root:__dirname})
})

app.listen(PORT, function () {
    console.log("server is running")
});
