const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) => {
    try{
        // This is used for getting request from browser,
        // as browser can't set header, so, we set the cookies to set set headers, for our clients. 
        
        const token = req.cookies['token']
        // This is used for Postman
        //req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'Thisiscool')
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        
        if(!user){
            res.redirect('/admin/login')
        }

        req.token = token
        req.user = user
        next()
    }catch(e){
        console.log(e)
        res.status(401).redirect('/admin/login')
    }
}

module.exports = auth