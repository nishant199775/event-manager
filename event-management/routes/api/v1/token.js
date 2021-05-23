const express=require('express');
const router=express.Router();
const tokenController=require('../../../controllers/tokenController');
router.post('/create',tokenController.create)
router.post('/markAttendance',tokenController.authToken)

module.exports=router;