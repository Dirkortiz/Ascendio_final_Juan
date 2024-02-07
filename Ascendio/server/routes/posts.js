var express = require("express");
var router = express.Router();
const postsControllers = require("../controllers/postsControllers");
const multerSingle = require("../middleware/multerSingle");

//http:localhost:3000/posts
router.post(
  "/createtrade",
  multerSingle("trades"),
  postsControllers.createTrade
);
router.post(
  "/createpostgeneral",
  multerSingle("generalPost"),
  postsControllers.createPostGeneral
);
router.get("/callcategorys", postsControllers.callCategorys);
router.get("/lasttrades", postsControllers.showLastTrades);
router.put("/markatrade/:id", postsControllers.markATrade);
router.get("/onetradepost/:id", postsControllers.OneTradePost);
router.get("/getgeneralposts", postsControllers.getAllPostGeneral)
router.get("/getposttrades", postsControllers.getAllPostTrades)
router.get('/getcategories', postsControllers.getCategories)


module.exports = router;
