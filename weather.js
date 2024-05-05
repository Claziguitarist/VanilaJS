




function onGeoOk(position)
{
    const lat = position.coords.latitude;
    const lon =position.coords.longitude;
    console.log("You live in", lat, lon);
    const API_KEY = "947b4460f0c74a4c9b749ed457cf53d4";
    const URL = `
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
    `;
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        weatherContainer.innerText = `Weather: ${data.weather[0].main} Temperature: ${data.main.temp}°C`;
        cityContainer.innerText = `City: ${data.name}`;
        leftSquare.appendChild(weatherContainer); 
        rightSquare.appendChild(cityContainer); 
    });
}

function onGeoError()
{
    alert("Can't find your location. No weather for you.");
}

/*
menuItems.forEach(item => {
    if (item.classList.contains('weater-location')) {
        item.addEventListener('click', showWeatherAndLocation);
    }
});
*/


