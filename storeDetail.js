/* eslint-disable no-console */
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const Cryptr = require('cryptr');

const cryptr = new Cryptr('BehlulKoksoya');


const storeDetail = async (storeUrl, storeDetails) => {
  const url = `https://www.sahibinden.com${storeUrl}`;

  const response = await fetch(url);
  const body = await response.text();

  const $ = cheerio.load(body);


  $('.classifiedInfo').each((i, item) => {
    const $item = $(item);
    /* fs.appendFile('storeDetails.txt', `${storeUrl},`, (err) => {
      if (err) console.log(err);
    });
    */
    const encryptedString = cryptr.encrypt(storeUrl);
    //  const decryptedString = cryptr.decrypt(encryptedString);

    const array = [];
    storeDetails[encryptedString] = array;
    $item.find('h3,ul.classifiedInfoList li strong, ul.classifiedInfoList li span').each((j, part) => {
      const $part = $(part);
      storeDetails[encryptedString].push($part.text().trim());
      /*
      fs.appendFile('storeDetails.txt', `${$part.text().trim()},`, (err) => {
        if (err) console.log(err);
      });
      */
    });
    /*
    fs.appendFile('storeDetails.txt', '\n', (err) => {
      if (err) console.log(err);
    });

*/
  });
/*
  fs.appendFile('coordinates.txt', `${storeUrl},${$('#gmap').attr('data-lat')},${$('#gmap').attr('data-lon')}\n`, (err) => {
    if (err) console.log(err);
  });
  */
};

module.exports = storeDetail;
