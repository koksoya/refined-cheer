const fetch = require('node-fetch');
const fs = require('fs');
const util = require('util');

let url;

const nearbySearch = async (URL, long, lat) => {
  url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${long},${lat}&radius=300&key=AIzaSyCYKvnHhXeh7hUWeg_P-VLPrT2ho-28DJo`;
  const res = await fetch(url);
  const searchResults = {};
  const { results } = await res.json();
  results.forEach((element) => {
    element.types.forEach((val) => {
      const number = searchResults[val];
      searchResults[val] = number ? number + 1 : 1;
    });
  });
  const searchResultsString = JSON.stringify(searchResults);
  console.log(searchResultsString);

  fs.appendFile('labeledData.json', `"${URL}":${util.inspect(searchResultsString)},\n`, 'utf8', (err) => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }
  });
};

module.exports = nearbySearch;

nearbySearch('Migros_cankaya2', 39.8938379,32.8771857);

/*
const lineReader = require('line-reader');

lineReader.eachLine('coordinates.txt', (line, last) => {
  const longLat = line.split(',');
  setTimeout(() => nearbySearch(longLat[0], longLat[1], longLat[2]).catch(err => console.err(err)), 200);
  if (last) {
    return false; // stop reading
  }
});
*/