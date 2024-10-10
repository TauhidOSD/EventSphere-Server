
const express = require("express");
const { getAllPost } = require("../../controller/post/post.controller");
const { getUserPosts } = require("../../controller/post/post.controller");



const router = express.Router();

router.get("/getAllPost", getAllPost);
router.get("/getUserPosts/:email", getUserPosts);


module.exports = router;
