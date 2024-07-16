const mongoose = require('mongoose');


async function connectDatabase(){
    try{
     await mongoose.connect(`mongodb://127.0.0.1:${process.env.PORT_MONGO}/${process.env.DATABASE_NAME}`)
    }
    catch(error){
    console.log(`connect database fail`,error)
    }
}
module.exports =connectDatabase;