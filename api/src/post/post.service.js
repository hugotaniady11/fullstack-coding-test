const {
    findPosts,
    findPostById,
    insertPost
} = require("./post.repository");

const getAllPosts = async () => {
    const posts = await findPosts();

    return posts;
}

const getPostById = async (id) => {
    const post = await findPostById(id)

    if (!post) {
        throw Error("Post not found");
    }

    return post;
}

const createPost = async (newPostData) => {
    const post = await insertPost(newPostData)
    return post;
}


module.exports = {
    getAllPosts,
    getPostById,
    createPost
}