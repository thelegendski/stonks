//for my sanity
Object.prototype.toString = function() {
  return JSON.stringify(this)
}

//as simple as you can get
async function getData (URL) {
  const response = await fetch(URL)
  const data = await response.json()
  return data
}

//function that will end up runnin' the whole program
async function getStockData (symbol) {
  //retrieve data here
  const token = "cfgk7khr01qlga2ufnb0cfgk7khr01qlga2ufnbg" //may need to base64 encode this in full release so no one is an idiot an' steals it.
  const data = await getData(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`)
  
  //cache prices in object for easier readability
  const price = {
    close: data.pc, //closin' price
    open: data.o, //openin' price
    high: data.h, //highest price of the day
    low: data.l, //lowest price of the day
    change: data.d, //price change
    percent: data.dp, //percent the price has changed
  }
  
  //need to add forecasts from longer periodz. https://finnhub.io/docs/api/stock-candles
  //looks like i'll need a UNIX converter so Date.prototype.toUNIX() = function(){return (this.getTime() / 1000) | 0;}
  //beyond that i'll need a five day, one week, one month, three month, an' one year converter for data, ;-;
  //need to figure out best way to retrieve date in readable format that will be parsed with RegEx. probs a native Date prototype or method
  
  //display data here
  println(`close price: $${price.close}`)
  println(`open price: $${price.open}`)
  println(`high price: $${price.high}`)
  println(`low price: $${price.low}`)
  println(`price change: $${price.change}`)
  println(`percent price change: ${price.percent}%`)
}

getStockData("AAPL")
