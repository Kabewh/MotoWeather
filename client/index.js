import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm'

const weatherDataURL = 'http://127.0.0.1:3000/weatherData'
let data = []

let idealCondition = document.getElementById("ideal-condition")
let temperature = document.getElementById("temperature")
let city = document.getElementById("city")
let humidity = document.getElementById("humidity")
let precip_mm = document.getElementById("precipitation")
let wind = document.getElementById("wind")
let lastUpdated = document.getElementById("last-updated")

let perfectTemperature = false
let perfectHumidity = false
let perfectPrecipitation = false
let perfectWind = false
let perfectRidingCondition = false

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const options = {
            method: 'GET',
            url: weatherDataURL,
            params: { q: `${position.coords.latitude},${position.coords.longitude}` },
            'Access-Control-Allow-Origin': '*'
        }
        try {
            const response = await axios.request(options)
            data = response.data

            if (data.current.temp_c >= 19 && data.current.temp_c <= 29) {
                perfectTemperature = true
            } else if (data.current.temp_c < 19) {
                idealCondition.innerHTML = "Temperature a bit cool..."
            } else {
                idealCondition.innerHTML = "Temperature a bit hot!"
            }

            if (data.current.humidity < 40) {
                perfectHumidity = true
            } else if (data.current.humidity > 60) {
                idealCondition.innerHTML += " Humidity a bit high..."
            } else {
                idealCondition.innerHTML += " Moderate humidity."
            }

            if (data.current.precip_mm === 0) {
                perfectPrecipitation = true
            } else if (data.current.precip_mm > 0.1 && data.current.precip_mm < 2.5) {
                idealCondition.innerHTML += " Light rain"
            } else if (data.current.precip_mm > 2.6 && data.current.precip_mm < 7.6) {
                idealCondition.innerHTML += " Heavy rain..."
            }

            if (data.current.wind_kph > 8 && data.current.wind_kph < 24) {
                perfectWind = true
            } else if (data.current.wind_kph > 24 && data.current.wind_kph < 40) {
                idealCondition.innerHTML += " Strong wind"
            } else if (data.current.wind_kph > 40) {
                idealCondition.innerHTML += " High wind"
            } else if (data.current.wind_kph < 8) {
                perfectWind = true
            }

            if (perfectHumidity && perfectPrecipitation && perfectTemperature && perfectWind) {
                perfectRidingCondition = true
            }

            if (perfectRidingCondition) {
                idealCondition.innerHTML = "Perfect day to ride!"
            }

            city.innerHTML = data.location.name;
            lastUpdated.innerHTML = `Last updated: ${data.current.last_updated}`
            temperature.innerHTML = `Temperature: ${data.current.temp_c}°c`;
            humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
            precip_mm.innerHTML = `Precipitation: ${data.current.precip_mm} mm`;
            wind.innerHTML = `Wind: ${data.current.wind_kph} kph`;
        } catch (error) {
            console.error(error)
        }

    })
}





// fetch("http://127.0.0.1:3000/weatherData")
//     .then(response => response.json())
//     .then(data => console.log(data))