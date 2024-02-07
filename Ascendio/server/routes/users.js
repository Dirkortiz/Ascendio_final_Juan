var express = require("express");
var router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const multerSingle = require("../middleware/multerSingle");

/* GET users listing. */

// ruta base http://localhost:3000/users
// router.get('/', usersControllers.home);
router.post("/createuser", usersControllers.createUser);
router.put("/confirmationuser/:token", usersControllers.confirmateUser);
router.post("/loginuser", usersControllers.loginUser);
router.get("/oneuser/:id", usersControllers.oneUser);
router.post("/mailrecoverpassword", usersControllers.mailRecoverPassword);
router.put("/recoverpassword/:token", usersControllers.recoverPassword);
router.get("/statisticsuser/:id", usersControllers.getStatisticsUser);
router.post("/followuser", usersControllers.followUser);
router.delete("/unfollowuser", usersControllers.unfollowUser);
router.get("/getfollowuser/:id", usersControllers.getFollowUser);
router.put("/edituser", multerSingle("users"), usersControllers.editUser);
router.post("/verifypassword/:id", usersControllers.verifyPassword);
router.put("/updatepassword/:id", usersControllers.updatePassword);
router.get("/followersuser/:id", usersControllers.getFollowersUser);
router.get("/followingsuser/:id", usersControllers.getFollowingUser);
router.get("/postsuser/:id", usersControllers.getPostsUser);
router.get("/tradespostsuser/:id", usersControllers.getTradesPostsUser);
router.get("/generalpostsuser/:id", usersControllers.getGeneralPostsUser);
router.get("/showallusers", usersControllers.showAllUsers);
router.get("/showalluserssuccesses", usersControllers.showAllUsersSuccesses);
router.get("/traderprofile/:id", usersControllers.traderProfile);
router.put("/deleteuser/:id", usersControllers.deleteUser);
router.post("/usersendcategory", usersControllers.userSendCategory);
router.get("/getcategoriesuser/:id", usersControllers.getCategoriesUser);

module.exports = router;
