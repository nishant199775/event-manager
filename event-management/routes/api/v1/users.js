const express=require('express');
const router=express.Router();
const usersController=require('../../../controllers/usersController')

router.post('/signup',usersController.create);
router.get('/signin',usersController.createSession);
router.get('/',usersController.home);
router.get('/showCreatedEvents',usersController.showCreatedEvents);

module.exports=router;

