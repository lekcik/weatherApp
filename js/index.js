async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function getIpAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
    } catch (error) {
      console.error('Error fetching IP address:', error)
    }
}

async function runApp() {
    const APIKey = `4026144c88e744a8b18160722241309`
    let desiredLocation = await getIpAddress()
    let url = `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${desiredLocation}`

    let data = await getData(url)

    console.log(data.current.condition.icon)
}