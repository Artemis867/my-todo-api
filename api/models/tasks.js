const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskName: String
});

module.exports = mongoose.model('Task', taskSchema);