const index = require("./index");
const cron = require("node-cron")
const express = require("express")

const app = express();
const port = 3000

cron.schedule("33 3 * * *", () => index())

app.listen(port, () => console.log(`Example app listening on port ${port}!`))