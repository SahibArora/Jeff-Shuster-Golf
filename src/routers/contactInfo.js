const express = require('express')
const contactInfoRouter = new express.Router()

const ContactInfo = require('../models/contactInfo')
const auth = require('../middlewares/auth')

contactInfoRouter.post('/contactinfo', async (req,res) => {
    try{
        const contactInfo = new ContactInfo(req.body)
        await contactInfo.save();
        res.redirect('/contact')
    }catch(e){
        res.status(500).redirect('/error')
    }
})

contactInfoRouter.get('/admin/getContact', auth, async (req, res)=>{
    try{
        const contactInfo = await ContactInfo.find()
        res.send(contactInfo)
    }catch(e){
        res.status(500).redirect('/error')
    }
})

contactInfoRouter.get('/admin/delete/contactInfo/booking/:_id', async (req, res) => {
    try{
        var _id = req.params._id
        var contactInfo = await ContactInfo.findOne({_id})

        var url = '/admin/booking/delete/'+contactInfo.date+'/'+contactInfo.timeSlot+'/'+contactInfo.serviceInterest 

        if(contactInfo.message == ''){
            await contactInfo.remove()
        }else{
            contactInfo.date = null
            contactInfo.timeSlot = ''
            await contactInfo.save()
        }
        
        res.redirect(url)
    }catch(e){
        res.status(500).redirect('/error')
    }

})

contactInfoRouter.get('/admin/delete/contactInfo/message/:_id', async (req, res) => {
    try{
        var _id = req.params._id
        var contactInfo = await ContactInfo.findOne({_id})

        if(contactInfo.date == null){
            await contactInfo.remove()
        }else{
            contactInfo.message = ''
            await contactInfo.save()
        }
        res.redirect('/admin')

    }catch(e){
        res.status(500).redirect('/error')
    }

})

module.exports = contactInfoRouter