var express = require('express');
var router = express.Router();
const adminControllers = require('../controllers/adminControllers');


router.get('/adminusers', adminControllers.adminGetAllUsers)
router.put('/disableuser/:user_id', adminControllers.disableUser)
router.put('/activateuser/:user_id', adminControllers.activateUser)
router.get('/allstatistics', adminControllers.allStats)
router.get('/allcomments/:user_id', adminControllers.oneComment)
router.get('/usercomment', adminControllers.adminComments)
router.get('/admindisabledallusers', adminControllers.adminGetDisabledUsers)
router.get('/adminactivatedallusers', adminControllers.adminGetActivatedUsers)
router.get('/admingetallcourses', adminControllers.adminGetCourses)
router.put('/admindisableonecourse/:course_id', adminControllers.disableCourse)
router.put('/adminenableonecourse/:course_id', adminControllers.enableCourse)
router.get('/getalldisabledcourses', adminControllers.getAllDisabledCourses)
router.get('/getallenabledcourses', adminControllers.getAllEnabledCourses)
router.put('/enableonecourse/:course_id', adminControllers.enableOneCourse)
router.put('/disableonecourse/:course_id', adminControllers.disableOneCourse)




module.exports = router;