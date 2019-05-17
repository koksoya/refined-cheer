const cron = require('node-cron');
const express = require('express');
const index = require('./index');

const app = express();

cron.schedule('33 3 * * *', () => index())
