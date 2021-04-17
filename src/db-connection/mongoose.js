const mongoose = require('mongoose')

mongoose.connect(('mongodb+srv://admin:admin1997@cluster0.vjfiu.mongodb.net/jeff-shuster-golf?retryWrites=true&w=majority'),{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//Localhost - mongodb://127.0.0.1:27017/jeff-shuster-golf