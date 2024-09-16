function submitHandler(event) {
    event.preventDefault()
    
    const input = document.querySelector('.js-input').value
    
    localStorage.removeItem('location')
    localStorage.setItem('location', JSON.stringify(input))

    window.location.href = '../html/index.html'
}

function checkLocalStorage() {
    let location = JSON.parse(localStorage.getItem('location'))
    if (!location) {
        location = 'Berlin'
        localStorage.setItem('location', JSON.stringify(location))
        
    }
    return location
}

async function getData(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Failed to fetch data'); 
        }
        const data = await response.json()
        return data
    } catch (error) {
        alert('No internet connection or wrong city name!')
        console.error('Error:', error)
    }
}

function getDayName(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' }; 
    return date.toLocaleDateString('en-US', options);
}

function formHTMLGenerate() {
    let formHTML = ``

    formHTML += `
        <form onsubmit="submitHandler(event)" class="searchBar" aria-label="search for cities">
            <input class="js-input" type="text" placeholder="Search for cities" maxlength="36" pattern="[A-Za-z\s\-]+"
                title="Only letters, spaces, and hyphens are allowed">
        </form>
    `

    return formHTML
}

function weatherPrevHTMLGenerate(data) {
    let weatherPrevHTML = ``

    weatherPrevHTML += `
        <section class="weatherPreview" aria-label="${data.location.name} short weather forecast">
            <section class="basicInfo">
                <h1>${data.location.name}</h1>
                <p>${data.current.condition.text}</p>
                <h2>${data.current.temp_c}°</h2>
            </section>
            <section class="prevIcon">
                <img class="icon js-icon-preview" src="${data.current.condition.icon.replace('64x64', '128x128')}" alt="${data.current.condition.text}">
            </section>
        </section>
    `

    return weatherPrevHTML
}

function todayForecHTMLGenerate(data) {
    let todayForecHTML = ``

    todayForecHTML += `
        <section class="todaysForecast forecast" aria-label="${data.location.name} full forecast for today">
            <h3>Today's forecast</h3>
            <section class="forecastContainer">
                <section class="hourForecast" aria-label="forecast hourly">
                    <p>6:00 AM</p>
                    <img class="icon" src="${data.forecast.forecastday[0].hour[6].condition.icon.replace('64x64', '128x128')}" alt="${data.forecast.forecastday[0].hour[6].condition.text}">
                    <h4>${data.forecast.forecastday[0].hour[6].temp_c}°</h4>
                </section>

                <section class="hourForecast" aria-label="forecast hourly">
                    <p>9:00 AM</p>
                    <img class="icon" src="${data.forecast.forecastday[0].hour[9].condition.icon.replace('64x64', '128x128')}" alt="${data.forecast.forecastday[0].hour[9].condition.text}">
                    <h4>${data.forecast.forecastday[0].hour[9].temp_c}°</h4>
                </section>

                <section class="hourForecast" aria-label="forecast hourly">
                    <p>12:00 PM</p>
                    <img class="icon" src="${data.forecast.forecastday[0].hour[12].condition.icon.replace('64x64', '128x128')}" alt="${data.forecast.forecastday[0].hour[12].condition.text}">
                    <h4>${data.forecast.forecastday[0].hour[12].temp_c}°</h4>
                </section>

                <section class="hourForecast" aria-label="forecast hourly">
                    <p>3:00 PM</p>
                    <img class="icon" src="${data.forecast.forecastday[0].hour[15].condition.icon.replace('64x64', '128x128')}" alt="${data.forecast.forecastday[0].hour[15].condition.text}">
                    <h4>${data.forecast.forecastday[0].hour[15].temp_c}°</h4>
                </section>

                <section class="hourForecast" aria-label="forecast hourly">
                    <p>6:00 PM</p>
                    <img class="icon" src="${data.forecast.forecastday[0].hour[18].condition.icon.replace('64x64', '128x128')}" alt="${data.forecast.forecastday[0].hour[18].condition.text}">
                    <h4>${data.forecast.forecastday[0].hour[18].temp_c}°</h4>
                </section>

                <section class="hourForecast" aria-label="forecast hourly">
                    <p>9:00 PM</p>
                    <img class="icon" src="${data.forecast.forecastday[0].hour[21].condition.icon.replace('64x64', '128x128')}" alt="${data.forecast.forecastday[0].hour[21].condition.text}">
                    <h4>${data.forecast.forecastday[0].hour[21].temp_c}°</h4>
                </section>
            </section>
        </section>    
    `

    return todayForecHTML
}

function weekForecHTMLGenerate(data) {
    let weekForecHTML = ``

    weekForecHTML += `
        <section class="weekly-forecast forecast" aria-label="${data.location.name} forecast for the week">
            <h3>7-day Forecast</h3>
            <section class="forecast-grid">
                <section class="forecast-day">
                    <div class="forecast-date">Today</div>
                    <div class="forecast-details">
                        <img class="weather-icon" src="${data.forecast.forecastday[0].day.condition.icon}">
                        <span class="weather-description">${data.forecast.forecastday[0].day.condition.text}</span>
                    </div>
                    <div class="temperature-range">${data.forecast.forecastday[0].day.maxtemp_c}°<span>/${data.forecast.forecastday[0].day.mintemp_c}°</span></div>
                </section>
        
                <section class="forecast-day">
                    <div class="forecast-date">${getDayName(data.forecast.forecastday[1].date)}</div>
                    <div class="forecast-details">
                        <img class="weather-icon" src="${data.forecast.forecastday[1].day.condition.icon}">
                        <span class="weather-description">${data.forecast.forecastday[1].day.condition.text}</span>
                    </div>
                    <div class="temperature-range">${data.forecast.forecastday[0].day.maxtemp_c}°<span>/${data.forecast.forecastday[0].day.mintemp_c}°</span></div>
                </section>
        
                <section class="forecast-day">
                    <div class="forecast-date">${getDayName(data.forecast.forecastday[2].date)}</div>
                    <div class="forecast-details">
                        <img class="weather-icon" src="${data.forecast.forecastday[2].day.condition.icon}">
                        <span class="weather-description">${data.forecast.forecastday[2].day.condition.text}</span>
                    </div>
                    <div class="temperature-range">${data.forecast.forecastday[1].day.maxtemp_c}°<span>/${data.forecast.forecastday[1].day.mintemp_c}°</span></div>
                </section>
        
                <section class="forecast-day">
                    <div class="forecast-date">${getDayName(data.forecast.forecastday[3].date)}</div>
                    <div class="forecast-details">
                        <img class="weather-icon" src="${data.forecast.forecastday[3].day.condition.icon}">
                        <span class="weather-description">${data.forecast.forecastday[3].day.condition.text}</span>
                    </div>
                    <div class="temperature-range">${data.forecast.forecastday[3].day.maxtemp_c}°<span>/${data.forecast.forecastday[2].day.mintemp_c}°</span></div>
                </section>
        
                <section class="forecast-day">
                    <div class="forecast-date">${getDayName(data.forecast.forecastday[4].date)}</div>
                    <div class="forecast-details">
                        <img class="weather-icon" src="${data.forecast.forecastday[4].day.condition.icon}">
                        <span class="weather-description">${data.forecast.forecastday[4].day.condition.text}</span>
                    </div>
                    <div class="temperature-range">${data.forecast.forecastday[4].day.maxtemp_c}°<span>/${data.forecast.forecastday[4].day.mintemp_c}°</span></div>
                </section>
        
                <section class="forecast-day">
                    <div class="forecast-date">${getDayName(data.forecast.forecastday[5].date)}</div>
                    <div class="forecast-details">
                        <img class="weather-icon" src="${data.forecast.forecastday[5].day.condition.icon}">
                        <span class="weather-description">${data.forecast.forecastday[5].day.condition.text}</span>
                    </div>
                    <div class="temperature-range">${data.forecast.forecastday[5].day.maxtemp_c}°<span>/${data.forecast.forecastday[5].day.mintemp_c}°</span></div>
                </section>
        
                <section class="forecast-day">
                    <div class="forecast-date">${getDayName(data.forecast.forecastday[6].date)}</div>
                    <div class="forecast-details">
                        <img class="weather-icon" src="${data.forecast.forecastday[6].day.condition.icon}">
                        <span class="weather-description">${data.forecast.forecastday[6].day.condition.text}</span>
                    </div>
                    <div class="temperature-range">${data.forecast.forecastday[6].day.maxtemp_c}°<span>/${data.forecast.forecastday[6].day.mintemp_c}°</span></div>
                </section>
            </section>
        </section>
    `

    return weekForecHTML
}

function generateHTML(data) {
    let HTML = ``

    HTML += formHTMLGenerate()

    HTML += weatherPrevHTMLGenerate(data)

    HTML += todayForecHTMLGenerate(data)

    HTML += weekForecHTMLGenerate(data)

    return HTML
}

async function runApp() {
    const APIKey = `4026144c88e744a8b18160722241309`
    let desiredLocation = checkLocalStorage()
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${desiredLocation}&days=7`

    let data = await getData(url)

    if (data) {
        const mainContainer = document.querySelector('.js-main')
        let HTML = generateHTML(data)
        console.log(HTML)

        console.log(data)

        mainContainer.innerHTML = HTML
    }
}

runApp()