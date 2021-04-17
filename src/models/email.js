const mongoose = require('mongoose')
const validator = require('validator')

const emailSubscribeSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
})

emailSubscribeSchema.methods.toJSON = function(){
    const email = this
    const emailObject = email.toObject()

    return emailObject
}

emailSubscribeSchema.pre('save',async function (next) {
    const user = this //current user which is going to be saved!

   // Anything want to do before saving.

    next() // ends the middleware
})

const EmailSubscribe = mongoose.model('EmailSubscribe',emailSubscribeSchema) 

module.exports = EmailSubscribe