const {
    findUsers,
    findUserById,
    createUser,
    loginUser,
    compareUserByEmail
} = require("./user.repository");
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
    const users = await findUsers();

    return users;
}

const getUserById = async (id) => {
    const user = await findUserById(id)
    if (!user) {
        throw Error("User not found");
    }
    return user;
}

const register = async (newUser) => {
    const user = await createUser(newUser);

    return user;
}

const login = async (newUser) => {
    const user = await loginUser(newUser);

  return user;
}

const findUserByEmail = async(email) => {
    const userEmail = await compareUserByEmail(email)

    return userEmail;
}

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };



module.exports = {
    getAllUsers,
    getUserById,
    register,
    login,
    findUserByEmail,
    comparePasswords
}