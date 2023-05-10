const prisma = require("../db");

const findPosts = async () => {
    const posts = await prisma.post.findMany();
  
    return posts;
  };
  
  const findPostById = async (id) => {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
  
    return post;
  };
  
  const insertPost = async (postData) => {
    const post = await prisma.post.create({
      data: {
        slug: postData.slug,
        title: postData.title,
        body: postData.body,
      },
    });
  
    return post;
  };

  module.exports = {
    findPosts,
    findPostById,
    insertPost,
  };