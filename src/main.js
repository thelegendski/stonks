//add fetch call here
const token = "cfgk7khr01qlga2ufnb0cfgk7khr01qlga2ufnbg", symbol = "HMC"

println(fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`))
