//for my sanity
class Dictionary {
  constructor (object) {
    Object.assign(this, object)
  }
  set (key, value) {
    this[key] = value
  }
  get (key) {
    return this[key]
  }
  toString () {
    return JSON.stringify(this)
  }
}

//as simple as you can get
async function getData (URL) {
  const response = await fetch(URL)
  const data = await response.json()
  return new Dictionary(data)
}

//function that will end up runnin' the whole program
async function getStockData (symbol) {
  /* globals */
  const token = "cfgk7khr01qlga2ufnb0cfgk7khr01qlga2ufnbg" //may need to base64 encode this in full release so no one is an idiot an' steals it.
  
  /* now data */
  let data = await getData(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`) //need to remember await when callin' asynchronous functionz
  
  //cache prices in object for easier readability
  const price = {
    now: data.get('c'), //current price
    close: data.get('pc'), //closin' price
    open: data.get('o'), //openin' price
    high: data.get('h'), //highest price of the day
    low: data.get('l'), //lowest price of the day
    change: data.get('d'), //price change
    percent: data.get('dp'), //percent the price has changed
  }
  
  /* past data */
  //employment of moment.js dependency
  //now
  const now = moment().unix()
  //one week
  const weekAgo = moment().subtract(7, 'days').unix()
  //one month
  const monthAgo = moment().subtract(1, 'months').unix()
  //one year
  const yearAgo = moment().subtract(1, 'years').unix()
  
  //need to add forecasts from longer periodz. https://finnhub.io/docs/api/stock-candles
  data = await getData(`https://finhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${weekAgo}&to=${now}&token=${token}`)
  println(data)
  /* output */
  
  //current prices here
  //just set some values with CSS stylin'
  
  //chart.js here
  //week
  //month
  //year
  
  //just print the data out for now
  println(`current price: $${price.now}`)
  println(`close price: $${price.close}`)
  println(`open price: $${price.open}`)
  println(`high price: $${price.high}`)
  println(`low price: $${price.low}`)
  println(`price change: $${price.change}`)
  println(`percent price change: ${price.percent}%`)
}

//will need to be attached to an event listener for an input element
getStockData("AAPL")

//may end up listin' the potential symbols for the company inputted with event listener for such an element here
//actually that's probs over my paygrade, xD.
