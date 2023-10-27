import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm'

const weatherDataURL = 'http://127.0.0.1:3000/weatherData'
let data = {}
let dataDiv = document.getElementById("#weatherData")

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const options = {
            method: 'GET',
            url: weatherDataURL,
            params: { q: `${position.coords.latitude},${position.coords.longitude}` },
        }
        try {
            const response = await axios.request(options)
            console.log(response.data)
            data = response.data
            dataDiv?.innerHTML(data)
        } catch (error) {
            console.error(error)
        }
    })
}








// fetch("http://127.0.0.1:3000/weatherData")
//     .then(response => response.json())
//     .then(data => console.log(data))