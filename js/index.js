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

async function runApp() {
    const APIKey = `4026144c88e744a8b18160722241309`
    let desiredLocation = checkLocalStorage()
    let url = `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${desiredLocation}`

    let data = await getData(url)

    if (data) {
        console.log(data)
    }
}

runApp()