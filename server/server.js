const express = require('express')
const app = express();
const cors=require('cors')
const AuthRoute=require('./Router/AuthRoute')
const useRoute=require('./Router/UserRoute')
const connectDB=require('./services/connectDBservice')
require('dotenv').config()

//connect database
connectDB();

//middleware apply cors ad all request
app.use(cors());
//middleware get info from client by req.body
app.use(express.json());

//router middleware
app.use('/auth/admin',useRoute);
app.use('/api/auth',AuthRoute);



app.listen(process.env.PORT,function(){
  console.log(`server is running ${process.env.PORT}`)
});