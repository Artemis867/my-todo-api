const express = require('express');
const app = express();
const taskRoutes = require('./api/routes/tasks');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://administrator:"+process.env.MONGO_ATLAS_PW+"@node-rest-shop-shard-00-00.ozelk.mongodb.net:27017,node-rest-shop-shard-00-01.ozelk.mongodb.net:27017,node-rest-shop-shard-00-02.ozelk.mongodb.net:27017/"+process.env.DB_NAME+"?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true&w=majority",
{ useUnifiedTopology: true, useNewUrlParser: true });

// body parser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.disable('etag');

// CORS SETUP
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    } else {
        next();
    }
});

app.use('/task', taskRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = "404";
    next(error);
});
app.use((error, req, res, next) => {
    if(error) {
        res.status(error.status || 500).json({
            error: {
                status: error.status,
                message: error.message
            }
        });
    }
});

module.exports = app;