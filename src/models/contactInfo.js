const mongoose = require('mongoose')
const Booking = require('./booking')

const contactInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email_form: {
        type: String,
        trim: true,
        required: true
    },
    subject: {
        type: String,
        trim: true,
        required: true
    },
    serviceInterest: {
        type: String,
        trim: true
    },
    date: {
        type: Date
    },
    timeSlot: { 
        type: String
    },
    message: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

contactInfoSchema.methods.toJSON = function(){
    const contactInfo = this
    const contactinfoObject = contactInfo.toObject()

    return contactinfoObject
}

contactInfoSchema.pre('save',async function (next) {
    const contactInfo = this
    const serviceSlots = ['0900','0930','1000','1030','1100','1130','1200','1230','1300','1330','1400','1430','1500','1530','1600','1630','1700','1730','1800','1830','1900','1930','2000','2030','2100','2130']
    var serviceInterest = contactInfo.serviceInterest
    var timeSlot = contactInfo.timeSlot
    var numberOfSlots = 0;

    if(serviceInterest == 'Driver Fitting'){
        numberOfSlots = 2
    }else if(serviceInterest == 'Iron Fitting'){
        numberOfSlots = 3
    }else if(serviceInterest == 'Wedge Fitting'){
        numberOfSlots = 2
    }else if(serviceInterest == 'Full Bag Fitting'){
        numberOfSlots = 7
    }else if(serviceInterest == 'Long Game Fitting'){
        numberOfSlots = 5
    }else if(serviceInterest == 'Short Game Fitting'){
        numberOfSlots = 4
    }else if(serviceInterest == 'Putter Fitting'){
        numberOfSlots = 2
    }else if(serviceInterest == 'Lie/Loft Fitting'){
        numberOfSlots = 1
    }else if(serviceInterest == 'Re-shafting/Repairs'){
        numberOfSlots = 1
    }else if(serviceInterest == 'Other'){
        numberOfSlots = 1
    }

    if(contactInfo.serviceInterest != ''){
        var booking = await Booking.findBooking(contactInfo.date)
        if(booking){
            for(var i = 0; i < serviceSlots.length; i++){
                if(timeSlot == serviceSlots[i]){
                    var index = i
                    for(var j = 0; j < numberOfSlots; j++){
                        booking.timeSlots = booking.timeSlots.concat(serviceSlots[index])
                        index++
                    }
                    await booking.save()    
                    break
                }
            }
        }else{
            var newBooking = new Booking()
            newBooking.date = contactInfo.date
            
            for(var i = 0; i < serviceSlots.length; i++){
                
                if(timeSlot == serviceSlots[i]){
                    var index = i
                    for(var j = 0; j < numberOfSlots; j++){
                        newBooking.timeSlots = newBooking.timeSlots.concat(serviceSlots[index])
                        index++
                    }
                    await newBooking.save()
                    break
                }
            }
        }
    }

    next() // ends the middleware
})

const ContactInfo = mongoose.model('ContactInfo',contactInfoSchema) 

module.exports = ContactInfo