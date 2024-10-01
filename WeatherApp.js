
const API_KEY = 'your-api-key';


const weatherInfo = document.getElementById('weather-info');
const locationInput = document.getElementById('location-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const getLocationBtn = document.getElementById('get-location-btn');


async function getWeatherByLocation(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = "Error fetching weather data!";
        weatherInfo.style.display = "block";
    }
}


async function getWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = "Error fetching weather data!";
        weatherInfo.style.display = "block";
    }
}


function displayWeather(data) {
    const weatherHtml = `
        <h2>Weather in ${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherInfo.innerHTML = weatherHtml;
    weatherInfo.style.display = "block";
}

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeatherByLocation(location);
    } else {
        weatherInfo.innerHTML = "Please enter a location!";
        weatherInfo.style.display = "block";
    }
});


getLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        });
    } else {
        weatherInfo.innerHTML = "Geolocation is not supported by your browser.";
        weatherInfo.style.display = "block";
    }
});
