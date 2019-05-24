const cron = require('node-cron');
const express = require('express');
const index = require('./index');
const quotes = require('./quotes')

// Loading section of my inspiring quotes

let quoteList
quotes()
  .then((all) => { quoteList = all })


const app = express();
const PORT = process.env.PORT || 5000

// Firebase database update operation is scheduled to occur at 03:33 everyday.
cron.schedule('33 3 * * *', () => index())

// Get a quote in every / get request

app.get('/', (req, res) => res.send(quoteList[Math.floor(Math.random() * 3000)]))

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))
