const API_KEY = "5a285c7eaa7e772a3cee7efa94f8e1c0";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");

const error = document.querySelector(".error");

async function checkWeather(city) {
    const response = await fetch(API_URL + city + `&appid=${API_KEY}`);

    if (!response.ok) {
        error.style.display = "block"
        weather.style.display = "none"
        return;
    }
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = (data.wind.speed * 3.6).toFixed(1) + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png"
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png"
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png"
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png"
    } else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "images/snow.png"
    }

    weather.style.display = "block"
    error.style.display = "none"

}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

});

searchBox.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        checkWeather(searchBox.value);
    }
})

