
function searchCity(cityName) {
    // URL to get the latitude and longitude for the city
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=d14dc1a2603bb58e9a119a4e4f70812f`;

    fetch(geoApiUrl)
        .then(response => {
            if (!response.ok) throw new Error(`City not found: ${cityName}`);
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                fetchWeather(lat, lon, cityName);
            } else {
                throw new Error(`City not found: ${cityName}`);
            }
        })
        .catch(error => {
            console.error('Fetching city data error:', error);
        
        });
}


function fetchWeather(lat, lon, cityName) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=d14dc1a2603bb58e9a119a4e4f70812f`;

    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Weather data fetch failed');
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data.current, cityName);
            displayForecast(data.daily);
            saveSearchHistory(cityName);
        })
        .catch(error => {
            console.error('Fetching weather data error:', error);
            
        });
}


function displayCurrentWeather(weather, cityName) {
    
}

function displayForecast(forecast) {
    const forecastCardsContainer = document.getElementById('forecast-cards-container');
    // Clear previous content
    forecastCardsContainer.innerHTML = '';

    
    for (let i = 1; i <= 5; i++) { // start from 1 to skip the current day
        const day = forecast[i];
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        const forecastCardHTML = `
            <div class="forecast-card">
                <h3>${date}</h3>
                <img src="${iconUrl}" alt="${day.weather[0].description}" />
                <p>Temp: ${day.temp.day}°F</p>
                <p>Wind: ${day.wind_speed} MPH</p>
                <p>Humidity: ${day.humidity} %</p>
            </div>
        `;

       
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = forecastCardHTML;
        forecastCardsContainer.appendChild(forecastCard);
    }
}



function saveSearchHistory(cityName) {
   
}

function displaySearchHistory() {
    
}


document.getElementById('search-button').addEventListener('click', function() {
    const cityName = document.getElementById('city-input').value.trim();
    if (cityName) {
        searchCity(cityName);
    }
});


window.onload = displaySearchHistory;
