const userModel = require('../Models/UserModels');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req,res) =>{
    try{
        const{username,password,dateOfBirth,email}=req.body;
        //checkmail co trung lap
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email này đã được sử dụng. Vui lòng sử dụng một email khác.' });
        }

      await  userModel.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password,10),
            dateOfBirth: dateOfBirth,
            role: 'regular'
            
        })
        return res.status(200).send('register user complete')
    }catch(error){
        console.log('error :',error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng ký' });
    }
}

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Invalid Email or password');
    }
    const isPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isPassword) {
      return res.status(400).send('Invalid Email or password');
    }
    const jwtToken =jwt.sign({
      _id:user.id,
      username:user.username,
      role:user.role
    },process.env.SECRET_JWT,{expiresIn: '1h'})

    return res.status(200).send({
      accessToken: jwtToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}
  
module.exports={
    register : register,
    login : login,
   
}