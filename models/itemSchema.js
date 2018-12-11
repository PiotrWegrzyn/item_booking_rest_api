const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}],
});


module.exports = mongoose.model('Item', itemSchema);