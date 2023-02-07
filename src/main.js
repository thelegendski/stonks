//add fetch call here
const token = "cfgk7khr01qlga2ufnb0cfgk7khr01qlga2ufnbg"

fetch(`https://finnhub.io/api/v1/quote?symbol=HMC&token=${token}`).then(response => println(JSON.stringify(response), typeof response))
