const express=require('express');
const router=express.Router();
const events=require('../../../models/events');
const evetntsController=require('../../../controllers/eventsController')

router.get('/',evetntsController.getEvents);
router.post('/create',evetntsController.create);
router.post('/addUser',evetntsController.addUser)
router.get('/showJoinedUsers',evetntsController.showJoinedUsers);
router.use('/token',require('./token'));


module.exports=router;