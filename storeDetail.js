const fetch = require('node-fetch') 
const cheerio = require('cheerio') 
const nestedProperty = require("nested-property")
const nearbySearch = require("./nearbySearch")


const storeDetail = async (storeUrl) => {
  const url = `https://www.sahibinden.com${storeUrl}` 

  const response = await fetch(url) 
  const body = await response.text() 

  const $ = cheerio.load(body) 


/*   $('.classifiedInfo').each((i, item) => {
    const $item = $(item) 
     fs.appendFile('storeDetails.txt', `${storeUrl},`, (err) => {
      if (err) console.log(err) 
    }) 
    

   
    
     $item.find('h3,ul.classifiedInfoList li strong, ul.classifiedInfoList li span').each((j, part) => {
      const $part = $(part) 
      storeDetails[encryptedString].push($part.text().trim()) 
      
      fs.appendFile('storeDetails.txt', `${$part.text().trim()},`, (err) => {
        if (err) console.log(err) 
      }) 
     
    }) 
    
    fs.appendFile('storeDetails.txt', '\n', (err) => {
      if (err) console.log(err) 
    }) 


  }) 
 */
const latitude = $('#gmap').attr('data-lat')
const longtitude = $('#gmap').attr('data-lon')

const object = {}
const environment_obj = await nearbySearch(latitude,longtitude).catch(error => console.log(error)) 

nestedProperty.set(object,"url",storeUrl)
nestedProperty.set(object,"environment",environment_obj)

console.log("In storeDetail return object...................................."+JSON.stringify(object))

return object

 
} 

module.exports = storeDetail 
