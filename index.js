const addresses = require('./addresses');
const storeDetail = require('./storeDetail');

let url = '';

async function main() {
  // storeDetails.txt and coordinates.txt documents have been filled up with data.
  const storeDetails = {};
  for (let index = 0; index <= 250; index += 50) {
    url = `https://www.sahibinden.com/kiralik-isyeri-dukkan-magaza/izmir-buca?pagingSize=50&pagingOffset=${index}`;
    const addressList = await addresses(url);
    addressList.forEach((storeUrl) => {
      storeDetail(storeUrl, storeDetails);
    });
  }
  console.log(storeDetails);
}
main().catch(err => console.error(err));
