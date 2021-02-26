var express = require('express')
var app = express()

var port = process.env.PORT || 2000

app.get('/',(req,res)=>{
    res.send("<h1>Welcome </h1>")
})

app.listen(port, (req,res)=>{
    console.log('Server listening at port: ' + port)
})