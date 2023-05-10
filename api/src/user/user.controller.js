const express = require("express");
const { getAllUsers, getUserById, register, login, findUserByEmail, comparePasswords } = require("./user.service");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await getAllUsers();
    res.send(users)
})

router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);

        res.send(user)
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post("/register", async (req, res) => {
    try {
        const newUserData = req.body;
        const userEmail = await findUserByEmail(newUserData.email)
        
          if (userEmail) {
            return res.status(401).json({
              message: "Email has been taken"
            })
          }
        
        const user = await register(newUserData);
        res.send({
            data: user,
            message: "create user success",
          });

          
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post("/login", async (req, res) => {
    try {
        const userData = req.body;
        const user = await findUserByEmail(userData.email)

        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
          }

          const passwordMatches = await comparePasswords(
            userData.password,
            user.password
          );

          if (!passwordMatches) {
            return res.status(401).json({ message: 'Wrong Password' });
          }
      
          // Generate a JWT token
          const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
          const refreshToken = jwt.sign(
            { userId: user.id, email: user.email, type: user.type },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7h' }
          );
      
          res.status(200).json({
            message: "User logged in",
            accessToken,
            refreshToken
          });
       
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;