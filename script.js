document.getElementById('submit-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

document.getElementById('city-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const city = document.getElementById('city-input').value;
        getWeather(city);
    }
});

function getWeather(city) {
    const apiKey = 'd40c1eda2e6976c574f567f43b5a44c4'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather:', error));
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const { name, sys, weather, main, wind } = data;
    const { country } = sys;
    const { description } = weather[0];
    const { temp, feels_like, humidity } = main;
    const { speed, deg } = wind;

    weatherInfo.innerHTML = `
        <h2>${name}, ${country}</h2>
        <p>${description}</p>
        <p>Temperature: ${temp}°F</p>
        <p>Feels like: ${feels_like}°F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${speed} mph</p>
        <p>Wind Direction: ${getWindDirection(deg)}</p>
    `;

    if (description.toLowerCase() === 'clear sky') {
        const clearSkyImage = document.createElement('img');
        clearSkyImage.src = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png';
        clearSkyImage.alt = 'Clear Sky';
        clearSkyImage.style.width = '50px';
        weatherInfo.appendChild(clearSkyImage);
    }
}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
}
