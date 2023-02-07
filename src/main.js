//add fetch call here
const token = "cfgk7khr01qlga2ufnb0cfgk7khr01qlga2ufnbg", symbol = "HMC"

async function getData (URL) {
  const response = await fetch(URL)
  const data = await response.json()
  println(JSON.stringify(data), response)
}

getData(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`)
