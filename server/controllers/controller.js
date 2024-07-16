const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')
const userModel = require("../Models/UserModels");


const getListUser = async (req, res) => {
  //get token from client


  try {
    //verify token
    
      const users = await userModel.find();
      return res.status(200).send(users);
    
  } catch (error) {
    //gui ma loi ve de thong bao token het han biet refesh token
   
  }
};
const postUser = async (req, res) => {
  

  try {
    //verify token
      const{username,password,dateOfBirth,email,role}=req.body;
      await userModel.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password,10),
        dateOfBirth: dateOfBirth,
        role: role,
        
    })
      return res.status(200).send('create user success');
    
  } catch (error) {
  //log error

    }
  }
  const deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId; // Sử dụng req.params thay vì req.param
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (deletedUser) {
        return res.status(200).send('Delete user success');
      } else {
        return res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).send('Server error');
    }
  };
  

module.exports = {
  getListUser: getListUser,
  postUser:postUser,
  deleteUser:deleteUser,
};
