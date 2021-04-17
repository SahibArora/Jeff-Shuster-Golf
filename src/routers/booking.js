const express = require('express')
const bookingRouter = new express.Router()

const Booking = require('../models/booking')

bookingRouter.get('/booking', async (req,res) => {
    try{
        res.redirect('/contact')
    }catch(e){
        res.status(500).send(e)
    }
})

bookingRouter.get('/booking/:date', async (req,res)=>{
    try{
        var date = new Date(req.params.date)
        var booking = await Booking.findBooking(date)
        if(booking){
            res.send(booking)
        }else{
            res.send({})
        }
    }catch(e){
        res.status(500).send({})
    }
})

bookingRouter.get('/admin/booking/delete/:date/:timeSlot/:serviceInterest', async (req,res)=>{
    try{
        var date = req.params.date
        var timeSlot = req.params.timeSlot
        var serviceInterest = req.params.serviceInterest

        const serviceSlots = ['0900','0930','1000','1030','1100','1130','1200','1230','1300','1330','1400','1430','1500','1530','1600','1630','1700','1730','1800','1830','1900','1930','2000','2030','2100','2130']
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

        var booking = await Booking.findBooking(date)
        
        for(var i = 0 ; i < serviceSlots.length; i++){
            if(timeSlot == serviceSlots[i]){
                var index = i
                for(var j = 0; j < numberOfSlots; j++){
                    booking.timeSlots = booking.timeSlots.filter(ele => ele != serviceSlots[index])
                    index++
                }
                if(booking.timeSlots.length == 0){
                    await booking.remove()
                }else{
                    await booking.save()
                }
                break
            }
        }
        res.redirect('/admin')

    }catch(e){
        res.status(500).redirect('/error')
    }
})

module.exports = bookingRouter