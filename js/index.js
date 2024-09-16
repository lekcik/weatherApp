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

function airCondHTMLGenerate(data) {
    let airCondHTML = ``

    airCondHTML += `
        <section class="airConditions forecast" aria-label="air conditions for today">
            <h3>Air Conditions</h3>
            <section class="conditionsContainer">
                <section class="condition">
                    <svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M281.12,353.354V42.221C281.12,18.941,262.18,0,238.899,0c-23.282,0-42.221,18.941-42.221,42.221v311.133 c-26.391,15.093-42.646,42.761-42.756,73.36c-0.078,21.959,8.481,42.96,24.097,59.132c15.624,16.179,36.315,25.453,58.26,26.115 c0.886,0.026,1.767,0.04,2.649,0.04c22.227-0.001,43.14-8.461,59.142-23.987c16.642-16.149,25.806-37.809,25.806-60.992 C323.875,396.291,307.619,368.505,281.12,353.354z M286.905,476.506c-13.496,13.095-31.316,20.003-50.142,19.427 c-17.741-0.534-34.507-8.072-47.21-21.226c-12.701-13.152-19.661-30.176-19.597-47.937c0.093-26.181,14.773-49.723,38.31-61.438 c2.724-1.355,4.444-4.136,4.444-7.177V42.221c0-14.44,11.748-26.188,26.188-26.188c14.44,0,26.188,11.748,26.188,26.188v315.935 c0,3.042,1.721,5.821,4.444,7.177c23.632,11.762,38.311,35.4,38.311,61.689C307.842,445.831,300.407,463.405,286.905,476.506z"></path> </g> </g> <g> <g> <path d="M246.915,376.889V93.528c0-4.427-3.589-8.017-8.017-8.017c-4.427,0-8.017,3.589-8.017,8.017v283.361 c-24.2,3.855-42.756,24.866-42.756,50.133c0,27.995,22.777,50.772,50.772,50.772c27.995,0,50.772-22.777,50.772-50.772 C289.671,401.755,271.115,380.744,246.915,376.889z M238.899,461.761c-19.155,0-34.739-15.584-34.739-34.739 c0-19.155,15.584-34.739,34.739-34.739s34.739,15.584,34.739,34.739C273.638,446.177,258.054,461.761,238.899,461.761z"></path> </g> </g> <g> <g> <path d="M350.063,256.534h-42.756c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h42.756 c4.427,0,8.017-3.589,8.017-8.017S354.492,256.534,350.063,256.534z"></path> </g> </g> <g> <g> <path d="M332.961,213.778h-25.653c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h25.653 c4.427,0,8.017-3.589,8.017-8.017C340.978,217.368,337.388,213.778,332.961,213.778z"></path> </g> </g> <g> <g> <path d="M350.063,171.023h-42.756c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h42.756 c4.427,0,8.017-3.589,8.017-8.017C358.08,174.612,354.492,171.023,350.063,171.023z"></path> </g> </g> <g> <g> <path d="M332.961,128.267h-25.653c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h25.653 c4.427,0,8.017-3.589,8.017-8.017C340.978,131.856,337.388,128.267,332.961,128.267z"></path> </g> </g> <g> <g> <path d="M350.063,85.511h-42.756c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h42.756 c4.427,0,8.017-3.589,8.017-8.017C358.08,89.101,354.491,85.511,350.063,85.511z"></path> </g> </g> </g></svg>
                    <div>
                        <p>Real feel</p>
                        <h5>${data.current.feelslike_c}°</h5>
                    </div>
                </section>

                <section class="condition">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5ZM14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5ZM3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#1C274C"></path> </g></svg>
                    <div>
                        <p>Wind</p>
                        <h5>${data.current.wind_kph} km/h</h5>
                    </div>
                </section>

                <section class="condition">
                    <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path class="st0" d="M391.703,195.531l-0.203-0.344l-0.266-0.375L256,0L120.516,195.156l-0.234,0.375 c-27.172,42.719-45.609,92.109-45.703,141.75c-0.016,21.328,3.5,42.688,11.438,63.063c7.906,20.375,20.281,39.688,37.313,56.719 h0.016C159.906,493.641,208.063,512.031,256,512c47.938,0.031,96.078-18.359,132.656-54.938l-15.859,15.859l15.859-15.859 c17.047-17.031,29.422-36.344,37.328-56.703c7.938-20.391,11.438-41.75,11.438-63.063 C437.328,287.641,418.891,238.25,391.703,195.531z M384.141,384.078c-5.719,14.672-14.453,28.438-27.219,41.234l15.875-15.875 l-15.875,15.875C329,453.219,292.609,467.078,256,467.109c-36.609-0.031-73-13.891-100.922-41.797l0,0 c-12.781-12.797-21.5-26.563-27.234-41.25c-5.703-14.672-8.375-30.344-8.375-46.781c-0.109-38.078,14.859-80.328,38.531-117.375 l98-141.188l98.031,141.219c23.641,37.047,38.594,79.281,38.5,117.359C392.531,353.734,389.859,369.406,384.141,384.078z"></path> <path class="st0" d="M205.328,237.781c-23.422,26.031-60.719,94.547-37.297,142.25c26.156,53.281,61.75,21.609,45.109-12.125 C181.047,302.844,205.328,237.781,205.328,237.781z"></path> </g> </g></svg>
                    <div>
                        <p>Chance of rain</p>
                        <h5>${data.forecast.forecastday[0].day.daily_chance_of_rain}%</h5>
                    </div>
                </section>

                <section class="condition">
                    <svg viewBox="0 -5 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>sun</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-206.000000, -831.000000)"> <path d="M211.218,847 C212.146,842.438 216.161,839 221,839 C225.839,839 229.854,842.438 230.782,847 L232.886,847 C232.118,841.359 227.096,837 221,837 C214.904,837 209.882,841.359 209.114,847 L211.218,847 L211.218,847 Z M235,849 L207,849 C206.448,849 206,849.447 206,850 C206,850.553 206.448,851 207,851 L235,851 C235.552,851 236,850.553 236,850 C236,849.447 235.552,849 235,849 L235,849 Z M209,839.414 C209.391,839.805 210.024,839.805 210.414,839.414 C210.805,839.023 210.805,838.391 210.414,838 L209,836.586 C208.609,836.195 207.977,836.195 207.586,836.586 C207.195,836.977 207.195,837.609 207.586,838 L209,839.414 L209,839.414 Z M233,839.414 L234.414,838 C234.805,837.609 234.805,836.977 234.414,836.586 C234.023,836.195 233.391,836.195 233,836.586 L231.586,838 C231.195,838.391 231.195,839.023 231.586,839.414 C231.977,839.805 232.609,839.805 233,839.414 L233,839.414 Z M221,835 C221.552,835 222,834.553 222,834 L222,832 C222,831.448 221.552,831 221,831 C220.448,831 220,831.448 220,832 L220,834 C220,834.553 220.448,835 221,835 L221,835 Z" id="sun" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                    <div>
                        <p>UV index</p>
                        <h5>${data.current.uv}</h5>
                    </div>
                </section>
            </section>
        </section>
    `

    return airCondHTML
}

function generateHTML(data) {
    let HTML = ``

    HTML += formHTMLGenerate()

    HTML += weatherPrevHTMLGenerate(data)

    HTML += todayForecHTMLGenerate(data)

    HTML += weekForecHTMLGenerate(data)

    HTML += airCondHTMLGenerate(data)

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

        mainContainer.innerHTML = HTML
    }

    else {
        let HTML = formHTMLGenerate()
        const mainContainer = document.querySelector('.js-main')
        mainContainer.innerHTML += HTML
        mainContainer.innerHTML += `Data was not loaded :( Refresh the page`
        localStorage.clear()
    }
}

runApp()