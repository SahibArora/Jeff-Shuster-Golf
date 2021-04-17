const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    timeSlots: [{ 
        type: String
    }]
}, {
    timestamps: true
})

bookingSchema.methods.toJSON = function(){
    const booking = this
    const bookingObject = booking.toObject()

    return bookingObject
}

bookingSchema.statics.findBooking = async function(date){
    try{
        var booking = await Booking.findOne({date})
        return booking
    }catch(e){
        return null
    }
}

bookingSchema.pre('save',async function (next) {
    const user = this //current user which is going to be saved!

   // Anything want to do before saving.

    next() // ends the middleware
})

const Booking = mongoose.model('Booking',bookingSchema) 

module.exports = Booking