const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const dukkanOzellik = [];

const storeDetail = async (storeUrl) => {
  const url = `https://www.sahibinden.com${storeUrl}`;

  const response = await fetch(url);
  const body = await response.text();

  const $ = cheerio.load(body);


  $('.classifiedInfo').each((i, item) => {
    const $item = $(item);
    fs.appendFile('storeDetails.txt', '\n', (err) => {
      if (err) console.log(err);
      else console.log('Write operation complete.');
    });


    $item.find('h3,ul.classifiedInfoList li strong, ul.classifiedInfoList li span').each((j, part) => {
      const $part = $(part);
      dukkanOzellik.push($part.text().trim());
      // console.log(dukkanOzellik);

      fs.appendFile('storeDetails.txt', `${$part.text().trim()},`, (err) => {
        if (err) console.log(err);
        else console.log('Write operation complete.');
      });
    });
  });


  fs.appendFile('coordinates.txt', `${$('#gmap').attr('data-lat')  },${  $('#gmap').attr('data-lon')}\n`, (err) => {
    if (err) console.log(err);
  });
};

module.exports = storeDetail;
