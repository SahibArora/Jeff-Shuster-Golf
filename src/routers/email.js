const path = require('path')
const express = require('express')
const emailSubscribeRouter = new express.Router()

const EmailSubscribe = require('../models/email')

emailSubscribeRouter.post('/emailSubscribe', async (req,res) => {
    try{
        const emailSubscriber = new EmailSubscribe(req.body)
        await emailSubscriber.save();
        res.render('home')
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = emailSubscribeRouter