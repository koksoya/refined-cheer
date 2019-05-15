const fetch = require('node-fetch')
const cheerio = require('cheerio')
const nestedProperty = require('nested-property')
const nearbySearch = require('./nearbySearch')


const storeDetail = async (storeUrl) => {
  const url = `https://www.sahibinden.com${storeUrl}`

  const response = await fetch(url)
  const body = await response.text()

  const $ = cheerio.load(body)
  let rent
  let size

  $('.classifiedInfo').each((i, item) => {
    const $item = $(item)

    $item.find('h3,ul.classifiedInfoList li strong, ul.classifiedInfoList li span').each((j, part) => {
      const $part = $(part)
      if (j == 0) {
        rent = parseInt($part.text().trim().split(' ')[0].replace('.', ''), 10)
      }
      if (j == 12) {
        size = parseInt($part.text().trim(), 10)
      }
    })
  })

  const latitude = $('#gmap').attr('data-lat')
  const longtitude = $('#gmap').attr('data-lon')

  const object = {}
  const environmentObj = await nearbySearch(latitude, longtitude).catch(error => console.log(error))

  nestedProperty.set(object, 'url', storeUrl)
  nestedProperty.set(object, 'environment', environmentObj)
  nestedProperty.set(object, 'size', size)
  nestedProperty.set(object, 'rent', rent)

  // console.log("In storeDetail return object...................................."+JSON.stringify(object))

  return object
}

module.exports = storeDetail
