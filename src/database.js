const mongoose = require("mongoose"), { mongodb } = require("./keys");

mongoose.connect(mongodb.URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
}).then(db => console.log(`${db.connection.host}`))
    .catch(err => console.error(err));