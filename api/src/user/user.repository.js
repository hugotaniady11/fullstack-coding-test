const prisma = require("../db");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const findUsers = async () => {
    const users = await prisma.user.findMany();
  
    return users;
  };

  const findUserById = async (id) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
  
    return user;
  };

  const createUser = async (userData) => {
    const hashedPw = bcrypt.hashSync(userData.password, 5);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPw,
        type: userData.type
      },
    });

    return user;
  }

  const compareUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  };

  const loginUser = async (userData) => {

    const user = await prisma.user.findUnique({ where: { email } });

    const passwordMatches = await bcrypt.compare(password, userData.password);
  }

  module.exports = {
    findUsers,
    findUserById,
    createUser,
    loginUser,
    compareUserByEmail
  };