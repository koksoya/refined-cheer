const axios = require('axios')
const nestedProperty = require("nested-property")
const randomstring = require("randomstring")

const addresses = require('./addresses') 
const storeDetail = require('./storeDetail') 

let url = '' 


async function main(element, storeDetails) {
  
  for (let index = 0;  index <= 250;  index += 50) {
    url = `https://www.sahibinden.com/kiralik-isyeri-dukkan-magaza/izmir-${element}?pagingSize=50&pagingOffset=${index}` 
    const addressList = await addresses(url) 
    
    addressList.forEach(async(storeUrl) => {
    const obj = await storeDetail(storeUrl).catch(err => console.error(err))
    console.log("In Index Object  : ..........................................."+JSON.stringify(obj))
    const randomString = randomstring.generate(7) 
    nestedProperty.set(storeDetails,randomString,obj)
    
    }) 
  }
  const data = storeDetails
  console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.............................."+JSON.stringify(data))
  await axios.put(`https://refined-cheer.firebaseio.com/${element}.json`, data)
    .then(response => console.log(response))
    .catch(err => console.log(err)) 

}

const districts = ["buca", "bornova"] 
const storeDetails = {
  "buca":{},
  "bornova":{}
} 
districts.forEach((element) => {
  main(element, storeDetails[element]).catch(err => console.error(err)) 
}) 
