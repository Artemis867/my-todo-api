const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');

router.get('/all', (req, res, next) => {
    Task.find({}).then(data => {
        res.status(200).json({
            message: 'tasks retrieved',
            data
        });
    }).catch( err => {
        const status = 500;
        res.status(status).json({ status, err});
    });
});


module.exports = router;