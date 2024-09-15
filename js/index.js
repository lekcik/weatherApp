async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');  
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert('No internet connection or failed to fetch data!');
        console.error('Error:', error); 
    }
}

async function runApp() {
    const APIKey = `4026144c88e744a8b18160722241309`;
    let desiredLocation = `London`;
    let url = `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${desiredLocation}`;

    let data = await getData(url);

    if (data) {
    
    }
}
