const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: String,
    enum: [
      'Kelseys',
      'Montanas',
      'Outbacks',
      'Harveys',
      'Swiss Chalet'
    ],
    default: 'Kelseys',
    required: true
  },
  dateAndTime: {
    type: Date,
    required: true,
    set: val => {
      return new Date(val);
    },
    get: val => {
      // return `${val.getFullYear()}-${val.getMonth() + 1}-${val.getDate()}T${val.getHours()}:${val.getMinutes()}:${val.getSeconds()}`;
      const date = val.toISOString();
      return date.substring(0, date.length - 1);
    }
  },
  quantityOfGuests: {
    type: Number,
    default: 2,
    required: true
  }
}, {
  timestamps: true
});



module.exports = mongoose.model('Reservation', ReservationSchema);