'use strict';

require('dotenv').config();

const express = require('express');
const service = express();
const weatherApiKey = process.env.WEATHER_API_KEY;
const request = require('superagent');
const moment = require('moment');

//https://api.openweathermap.org/data/2.5/weather?q={city name}

service.get('/service/:location', (req, res, next) => {

    request.get('https://api.openweathermap.org/data/2.5/weather?q=' + 
    req.params.location + '&APPID=' + weatherApiKey + '&units=imperial',
    (err, response) => {
        if (err) {
            console.log(err);
            return res.sendStatus(404);
        }

        res.json({result: `${response.body.weather[0].description} at ${response.body.main.temp} degrees`});
    });
    
});

    module.exports = service;