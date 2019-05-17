const fetch = require('node-fetch')
//  const fs = require('fs')
//  const util = require('util')

let url

const nearbySearch = async (lat, lon) => {
  url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=75&key=AIzaSyAS50lQcxrkJSwzJWrhsInHsAVbsiSVq_s`
  const res = await fetch(url)
  const searchResults = {}
  const { results } = await res.json()
  results.forEach((element) => {
    element.types.forEach((val) => {
      const number = searchResults[val]
      searchResults[val] = number ? number + 1 : 1
    })
  })
  // console.log("Nearbysearch results : .................................."+JSON.stringify(searchResults))

  return searchResults

  // The Code Below can be used in creating training data. May be benefitial.

  /* fs.appendFile('positive150.json', `"${URL}":${util.inspect(searchResultsString)},\n`, 'utf8', (err) => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }
  })  */
}

module.exports = nearbySearch


// The Code Below can be used in creating training data. May be benefitial.

/*
const lineReader = require('line-reader')


lineReader.eachLine('coordinatePositive.txt', (line, last) => {
  const longLat = line.split(',')
  setTimeout(() => nearbySearch(longLat[0], longLat[1], longLat[2])
    .catch(err => console.error(err)), 200)
  if (last) {
    return false  // stop reading
  }
})  */
