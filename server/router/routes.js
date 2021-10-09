const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const weatherIconsJSON = fs.readFileSync(path.resolve(__dirname, "../json/icons.json"))
const weatherIcons = JSON.parse(weatherIconsJSON);

const weatherApiKey = process.env.WEATHER_API_KEY;

// routes for apis
router.post('/weather', async (req, res) => {

    console.log('weather');
    const coords = req.body;
    const longitude = coords.longitude;
    const latitude = coords.latitude;
   
    console.log('from router');
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${latitude},${longitude}&days=10&aqi=yes&units=auto`;
    
    const options = {
        url: url,
        responseType: 'json'
    }

    const weatherReq = await axios(options);
    
    const weatherData = weatherReq.data;
    console.log(weatherData);
    res.json({data: weatherData});
});

// JSON routes

router.post('/icons', (req, res) => {
    res.json({weatherIcons});
}); 


module.exports = router;