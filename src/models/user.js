const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter valid email!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password itself');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'Thisiscool')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Invalid Login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Invalid Login!')
    }

    return user
}

userSchema.pre('save',async function (next) {
    const user = this //current user which is going to be saved!

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next() // ends the middleware
})

const User = mongoose.model('Users',userSchema)  

module.exports = User