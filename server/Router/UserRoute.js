const express = require('express');
const router = express.Router();
const userController=require('../controllers/controller');
const authMiddleware=require('../Middleware/authMiddleware')

router.get('/user', [
    authMiddleware.isAuthentication
], userController.getListUser);
router.post('/user/create',[
    authMiddleware.isAuthentication,
    authMiddleware.isAdmin
] ,userController.postUser);
router.delete('/user/delete/:userId' ,[
    authMiddleware.isAuthentication,
    authMiddleware.isAdmin
],userController.deleteUser);

module.exports = router;