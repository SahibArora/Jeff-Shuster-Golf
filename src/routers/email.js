const express = require('express')
const emailSubscribeRouter = new express.Router()
const auth = require('../middlewares/auth')

const EmailSubscribe = require('../models/email')

emailSubscribeRouter.get('/admin/email', auth, async (req, res) => {
    try{
        var emails = await EmailSubscribe.find()
        res.send(emails)
    }catch(e){
        res.status(500).redirect('/error')
    }
})

emailSubscribeRouter.post('/emailSubscribe', async (req,res) => {
    try{
        var emails = await EmailSubscribe.find()
        if(emails.length != 0){
            for(var i = 0 ; i < emails.length; i++){
                if(emails[i].email.toLowerCase() == req.body.email.toLowerCase()){
                    res.redirect('/')
                }else {
                    const emailSubscriber = new EmailSubscribe(req.body)
                    await emailSubscriber.save();
                    res.redirect('/')
                }
            }
        }else{
            const emailSubscriber = new EmailSubscribe(req.body)
            await emailSubscriber.save();
            res.redirect('/')
        }
    }catch(e){
        res.status(500).redirect('/error')
    }
})

emailSubscribeRouter.get('/admin/email/delete/:e', auth, async (req, res) => {
    try {
        var e = req.params.e
        var email = await EmailSubscribe.findOne({email: e})
        await email.remove()
        res.redirect('/admin')
    } catch (e) {
        res.status(500).redirect('/error')
    }
})

module.exports = emailSubscribeRouter