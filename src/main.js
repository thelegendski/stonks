const chart = {
    day: [1.5, 3],
    week: [3, 6],
    month: [2, 4],
    halfYear: [2, 4],
    year: [1.5, 3],
}

//as simple as you can get
async function getData (URL) {
  const response = await fetch(URL)
  const data = await response.json()
  return data
}

//function that will end up runnin' the whole program
async function getStockData (symbol) {
    /* globals */
    const token = "cfgk7khr01qlga2ufnb0cfgk7khr01qlga2ufnbg" //may need to base64 encode this in full release so no one is an idiot an' steals it.
  
    /* current data */
    let data = await getData(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`) //need to remember await when callin' asynchronous functionz
    if(data.d === null) return
    //cache prices in object for easier readability
    const price = {
        now: data.c, //current price
        change: data.d, //price change
        percent: data.dp, //percent the price has changed
    }
    
    /* past data */
    //employment of moment.js dependency
    const time = {
        //now
        now: moment().unix(),
        //one day ago
        day: moment().hour(9).minute(30).unix(),
        //one week
        week: moment().subtract(8, 'days').unix(),
        //one month
        month: moment().subtract(1, 'months').unix(),
        //six month
        halfYear: moment().subtract(6, 'months').unix(),
        //one year
        year: moment().subtract(1, 'years').unix(),
    }
      
    //need to add forecasts from longer periodz. https://finnhub.io/docs/api/stock-candles
    const stonks = {
        //data from today
        day: await getData(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=${time.day}&to=${time.now}&token=${token}`),
        //data from last week
        week: await getData(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${time.week}&to=${time.now}&token=${token}`),
        //data from last month
        month: await getData(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${time.month}&to=${time.now}&token=${token}`),
        //data from six months ago
        halfYear: await getData(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${time.halfYear}&to=${time.now}&token=${token}`),
        //data from last year
        year: await getData(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${time.year}&to=${time.now}&token=${token}`),
    }
  
    /* output */
    //day chart
    for(let key in chart){
        if(!(chart[key] instanceof Chart)){
            chart[key] = new Chart (
            document.getElementsByClassName(key)[0],
            {
                type: "line",
                data: {
                    labels: stonks[key].c.map((_, i) => key === 'day' ? moment().hour(9).minute(30).add(i * moment().diff(moment().hour(9).minute(30), 'minutes') / stonks[key].c.length, 'minutes').format('h:mm') : moment().subtract(stonks[key].c.length - i - 1, 'days').format('M/D/YYYY')),
                    datasets: [
                        {
                            borderColor: stonks[key].c[stonks[key].c.length - 1] > stonks[key].c[0] ? "rgba(50, 175, 50)" : "rgba(225, 100, 100)",
                            backgroundColor: stonks[key].c[stonks[key].c.length - 1] > stonks[key].c[0] ? "rgba(50, 175, 50, 0.5)" : "rgba(225, 100, 100, 0.5)",
                            data: stonks[key].c,
                            tension: 0.1,
                            pointRadius: chart[key][0],
                            pointHoverRadius: chart[key][1],
                        }
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: key === 'halfYear' ? 'six month' : key,
                            font: {
                                family: "Raleway",
                                size: 30
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            }
        )
        }
        else (chart[key].data.datasets[0].data = stonks[key].c, chart[key].data.datasets[0].borderColor = stonks[key].c[stonks.day.c.length - 1] > stonks[key].c[0] ? "rgba(50, 175, 50)" : "rgba(225, 100, 100)", chart[key].data.datasets[0].backgroundColor = stonks[key].c[stonks[key].c.length - 1] > stonks[key].c[0] ? "rgba(50, 175, 50, 0.5)" : "rgba(225, 100, 100, 0.5)") + chart[key].update()
    }
    //current value update here
}

//input element
const input = document.getElementsByTagName('input')[0]
//event listener
input.onkeydown = e => {
    //make sure we have a valid value
    if(!(/[a-zA-Z\-]/).test(e.key)) e.preventDefault()
    //run if the user hits enter
    if(e.key === 'Enter') getStockData(input.value)
}

/**
 * TODO:
 * ADD https://finnhub.io/docs/api/symbol-search
 * BEAUTIFY input
 * ADD current value / change in $ & %
**/
