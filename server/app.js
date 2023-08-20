// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const { isValidDate, isWeekend } = require('./utilities');
const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData',async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    const {symbol,date} = req.body;
    if(symbol==null || date==null || !isValidDate(date)){
        res.status(422).json("Unprocessable Entity")
        return;
    }
    if(isWeekend(date)){
        res.status(422).json("Date is a weekend")
        return;
    }
    const URL = `https://api.polygon.io/v1/open-close/${symbol.toUpperCase()}/${date}?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`
    axios.get(URL)
    .then(response=>{
        const {open,high,low,close,volume} = response.data;
        res.status(200).json({open,high,low,close,volume})
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json("Not Found")
    })
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));