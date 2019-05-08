const axios = require('axios');
// const EventMitter = require('events');

const addresses = require('./addresses');
const storeDetail = require('./storeDetail');

let url = '';


/* const emitter = new EventMitter();
emitter.setMaxListeners(200); */

async function main(element, storeDetails) {
  for (let index = 0; index <= 250; index += 50) {
    url = `https://www.sahibinden.com/kiralik-isyeri-dukkan-magaza/izmir-${element}?pagingSize=50&pagingOffset=${index}`;
    const addressList = await addresses(url);
    // eslint-disable-next-line no-loop-func
    addressList.forEach((storeUrl) => {
      storeDetail(storeUrl, storeDetails[element]).catch(err => console.error(err));
    });
  }
  const data = storeDetails[element];
  await axios.put(`https://refined-cheer.firebaseio.com/${element}.json`, data)
    .then(response => console.log(response))
    .catch(err => console.log(err));

  /* let str = JSON.stringify(storeDetails);
  str = str.replace(/'/g, '"');
  storeDetails = JSON.parse(str);
  console.log(storeDetails[element]); */
}
const districts = ["buca", "bornova"];
const storeDetails = {
  "buca": {},
  "bornova": {},
};
districts.forEach((element) => {
  main(element, storeDetails).catch(err => console.error(err));
});
