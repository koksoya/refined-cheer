const quote = require('./quote')

const quotes = async () => {
  const wholeList = []

  for (let page = 1; page < 101; page++) {
    // eslint-disable-next-line no-await-in-loop
    await quote(page)
      .then(element => element.forEach((each) => {
        wholeList.push(each)
      }))
      .catch(err => console.log(err))
  }
  return new Promise(res => res(wholeList))
}

module.exports = quotes
