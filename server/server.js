if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const router = require('./router/routes.js')
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('', router);

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Contrl-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});



app.post('/private', (req, res) => {
    console.log(req.body.message);
    res.json({
        message: 'Hello there'
    });
});



app.get('/public', (req, res, next) => {
    res.json({ message: "here is your public resource" });
});

// will match any other path
app.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});



app.listen(5001, () => console.log('Server started on port 5001'));
