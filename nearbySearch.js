const fetch = require('node-fetch');
const fs = require('fs');
const util = require('util');


let url;

const searchResults = {};

const nearbySearch = async (long, lat) => {
  url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${long},${lat}&radius=1000&key=AIzaSyCYKvnHhXeh7hUWeg_P-VLPrT2ho-28DJo`;
  const res = await fetch(url);
  const { results } = await res.json();
  results.forEach((element) => {
    element.types.forEach((val) => {
      const number = searchResults[val];
      searchResults[val] = number ? number + 1 : 1;
    });
  });
  const searchResultsString = JSON.stringify(searchResults).replace(/,/g, ' , ');
  console.log(searchResultsString);

  fs.appendFile('output.csv', `${util.inspect(searchResultsString)}\n`, 'utf8', (err) => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }

    console.log('JSON file has been saved.');
  });
  /*
  fs.appendFile('environmentDetails.txt', searchResults, (err) => {
    if (err) console.err(err);
  });
  */
};

module.exports = nearbySearch;


const lineReader = require('line-reader');

lineReader.eachLine('coordinates.txt', (line, last) => {
  const longLat = line.split(',');
  nearbySearch(longLat[0], longLat[1]);
  if (last) {
    return false; // stop reading
  }
});
