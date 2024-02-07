const express = require('express');
const coursesControllers = require('../controllers/coursesControllers');
const router = express.Router();
const multerSingle = require('../middleware/multerSingle')


// http://localhost:3000/courses/ 
router.post('/createcourse', multerSingle('cursos'), coursesControllers.createCourse);
router.get('/onecourse/:course_id', coursesControllers.oneCourse);
router.put('/editcourse/:course_id', multerSingle('cursos'), coursesControllers.editOneCourse);
router.get('/calltags', coursesControllers.callTags);
router.get('/callcourses', coursesControllers.callCourses);
router.get('/callcoursesdates', coursesControllers.callCoursesDates);
router.get('/getpurchasedcourse/:course_id/:user_id', coursesControllers.getPurchaseCourse);
router.put('/addtopurchasecourse/:course_id', coursesControllers.addToPurchaseCourse);
 /* router.get('/viewpurchasedcourse', coursesControllers.viewPurchasedCourse) */
router.post('/addsection', coursesControllers.addSection);
router.delete('/deletesection/:course_id/:section_id', coursesControllers.deleteSection);
router.post('/addtopic', coursesControllers.addTopic);
router.get('/oneusercourses/:user_id', coursesControllers.oneUserCourses);
router.put('/deletecourse/:course_id', coursesControllers.deleteCourse);
router.delete('/deletetopic/:course_id/:section_id/:topic_id', coursesControllers.deleteTopic);
router.get('/getwishcourse/:course_id/:user_id', coursesControllers.getWishCourse);
router.put('/addwishescourse/:course_id', coursesControllers.addWishesCourse);
router.put('/addtovalidatecourse/:course_id', coursesControllers.addToValidateCourse);
router.post('/delfromwishes/:course_id', coursesControllers.delFromWishes);
router.get('/getalltagsonecourse/:course_id', coursesControllers.getAllTagsOneCourse);
router.get('/getcreatoruser/:course_id', coursesControllers.getCreatorUser);
router.post('/addresourcepdf', multerSingle("resource"), coursesControllers.addResourcePdf)
router.delete('/deleteresource/:course_id/:section_id/:topic_id/:resource_id', coursesControllers.deleteResource)
router.get('/getallratesonecourse/:course_id', coursesControllers.getAllRatesOneCourse);
router.get('/getoneresource/:course_id/:section_id/:topic_id', coursesControllers.getOneResource)
router.get('/gettyperesource', coursesControllers.getTypeResource)
router.get('/getOneBreadCrumbs/:course_id/:section_id', coursesControllers.getOneBreadCrumbs)
router.put('/getpeoplevotescourses/:course_id', coursesControllers.getPeopleVotesCourses);
router.post('/userrateonecourse/:course_id', coursesControllers.userRateOneCourse)
router.get('/getonerateonecourseoneuser/:course_id/:user_id', coursesControllers.getOneRateOneCourseOneUser)
router.get('/getonewishedcourse/:user_id', coursesControllers.getOneWishedCourse)
router.get('/getonepurchasedcourse/:user_id', coursesControllers.getOnePurchasedCourse)

//vuelvo a estar harta del git :)



module.exports = router;