const puppeteer = require('puppeteer');
const $ = require('cheerio');

const addresses = (url) => new Promise(((resolve, reject) => {
    puppeteer
      .launch()
      .then(browser => browser.newPage())
      .then(page => page.goto(url).then(() => page.content()))
      .then((html) => {
        const arr = $('a.classifiedTitle', html).toArray().map((element) => {
          return element.attribs.href;
        });
        resolve(arr);
      })
      .catch((err) => {
        // handle error
        console.log(err);
        reject(err);
    });
  
}));


module.exports = addresses;
