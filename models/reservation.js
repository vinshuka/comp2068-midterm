// You need to define the schema for a reservation
// The fields you require are:
// associated user
// numOfOccupants (number of occupants)
// roomType (options are 'single bed', 'double bed', 'queen', 'king')
// checkIn (just date, not time)
// checkOut (just date, not time)
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    numOfOccupants: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        enum: ['SINGLE BED', 'DOUBLE BED', 'QUEEN', 'KING'],
        default: 'SINGLE BED'
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);