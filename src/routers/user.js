const path = require('path')
const express = require('express')
const userRouter = new express.Router()

const User = require('../models/user')
const auth = require('../middlewares/auth')

userRouter.get('/admin/login', (req,res) => {
    try{
        res.render('login',{})
    }catch(e){
        res.status(500).send(e)
    }
})

userRouter.post('/admin/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('token', token)
        res.redirect('/admin')
    } catch (e) {
        res.status(400).send({Error: "Invalid Login"})
    }
})

userRouter.get('/admin', auth,  (req,res) =>{
    try{
        res.render('admin', req.user)
    }catch(e){

    }
})

userRouter.get('/admin/getUsers', auth, async (req, res) => {
    try{
        var users = await User.find()
        res.send(users)
    }catch(e){
       res.redirect('/admin') 
    }
})

userRouter.post('/admin/addUser', auth, async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.redirect('/admin')
    } catch (e) {
        res.status(500).send(e)
    }
})

userRouter.get('/admin/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.redirect('/admin/login')
    } catch (e) {
        res.status(500).send()
    }
})

userRouter.get('/admin/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.redirect('/admin/login')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = userRouter