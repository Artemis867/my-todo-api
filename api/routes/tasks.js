const express = require('express');
const { update } = require('../models/tasks');
const router = express.Router();
const Task = require('../models/tasks');
const mongoose = require('mongoose');

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

router.post('/', (req, res, next) => {
    const params = req.body;
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        taskName: params.taskName
    });

    task.save().then( resp => {
        res.status(201).json({
            status: 'success',
            message: 'access post'
        });
    })
});

router.patch('/:taskId',(req, res, next) => {
    const params = req.body;
    const updateObj = {
        taskName: params.taskName
    };

    const doUpdateTask = Task.updateOne({_id: req.params.taskId},updateObj);
    doUpdateTask.then(resp => {
        res.status(200).json({
            status: 'success',
            message: 'access patch'
        });
    });
});

router.delete('/:taskId', (req, res, next) => {
    const doDelete = Task.findByIdAndDelete(req.params.taskId);
    doDelete.then(resp => {
        res.status(200).json({
            status: 'success',
            message: 'Document deleted'
        });
    });
});

module.exports = router;