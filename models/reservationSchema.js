const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    from:{ type: Date, default: Date.now},
    to:{ type: Date, default: Date.now()}
});

module.exports = mongoose.model('Reservation', reservationSchema);