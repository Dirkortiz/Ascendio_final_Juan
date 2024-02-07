const express = require("express");
const router = express.Router();
const commentsControllers = require("../controllers/commentsControllers");
const multerSingle = require("../middleware/multerSingle");

// http://localhost:3000/comments/
router.post("/createcomment", commentsControllers.createComment);
router.get("/showallcomments/:id", commentsControllers.showAllComments);
router.put("/deletecomments/:id", commentsControllers.deleteComments);

module.exports = router;
