import axios from 'axios'
import http from 'http'
import express from 'express'
import cors from 'cors'
const URL = 'https://weatherapi-com.p.rapidapi.com/current.json'

const hostname = '127.0.0.1';
const port = 3000;

const app = express()

app.use(cors())

app.get('/weatherData', async function (req, res) {
    const options = {
        method: 'GET',
        url: URL,
        params: { q: req.query.q },
        headers: {
            'X-RapidAPI-Key': 'b38b021d35mshe296b254043832cp12b968jsn55db3950b3e9',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            'Access-Control-Allow-Origin': '*'
        }
    }
    try {
        const response = await axios.request(options)
        res.json(response.data)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
})

app.listen(port, () => console.log(`server running on port: `, port))