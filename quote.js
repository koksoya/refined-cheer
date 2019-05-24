const fetch = require('node-fetch')
const cheerio = require('cheerio')


const quote = async (page) => {
  const array = []
  const url = `https://www.goodreads.com/quotes/tag/inspiration?page=${page}`

  const response = await fetch(url)
  const body = await response.text()

  const $ = cheerio.load(body)

  $('.quoteDetails ').each((i, item) => {
    const $item = $(item)

    $item.find('div.quoteText').each((j, part) => {
      const $part = $(part)
      const quoteText = $part.text().trim()
      array.push(quoteText)
    })
  })
  return new Promise((res) => {
    res(array)
  })
// console.log("In storeDetail return object............"+JSON.stringify(object))
}

module.exports = quote
