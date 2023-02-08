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
  const token = "cfgk7khr01qlga2ufnb0cfgk7khr01qlga2ufnbg"
  const data = await getData(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`)
  
  //display data here
  println(data)
}

getStockData("AAPL")
