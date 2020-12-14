let world = require("./world.json")

module.exports = (app) => {
    const getWorld = (req, res) => {
        res.send(world)
    }

    app.get("/world", getWorld)
}
