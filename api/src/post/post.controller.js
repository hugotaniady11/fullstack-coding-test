const express = require("express");
const { getAllPosts, getPostById, createPost } = require("./post.service");

const router = express.Router();

router.get("/", async (req, res) => {
    const posts = await getAllPosts();
    res.send(posts)
})

router.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await getPostById(postId);

        res.send(post)
    } catch (err) {
        res.status(400).send(err.message);
    }
   
})


router.post("/", async (req, res) => {
    try {
        const newProductData = req.body;
        const post = await createPost(newProductData);

        res.send({
            data: post,
            message: "create post success"
        })
    } catch (err) {
        res.status(400).send(err.message);
    }

    
})

module.exports = router;