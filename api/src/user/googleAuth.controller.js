// googleAuth.controller.js

const passport = require('passport');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const UserService = require('./user.service');

const prisma = new PrismaClient();

const GoogleAuthController = {
  login: (req, res, next) => {
    // Use passport.authenticate with the 'google' strategy to initiate the Google OAuth login flow
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  },

  register: (req, res, next) => {
    // Use passport.authenticate with the 'google' strategy to initiate the Google OAuth registration flow
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  },

  callback: async (req, res, next) => {
    // Handle the Google OAuth callback after successful authentication
    passport.authenticate('google', async (err, user) => {
      if (err) {
        console.error(err);
        return res.redirect('/login');
      }

      if (!user) {
        return res.redirect('/login');
      }

      try {
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({ where: { email: user.email } });

        if (existingUser) {
          // User already exists, perform login
          const loggedInUser = await UserService.login(existingUser.email, '');
          req.login(loggedInUser, (err) => {
            if (err) {
              console.error(err);
              return res.redirect('/login');
            }
            return res.redirect('/dashboard');
          });
        } else {
          // Create a new user in the database
          const password = ''; // Generate a random password or leave it blank
          const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              password: hashedPassword,
              type: 'Google', // Set the appropriate account type
            },
          });

          // Perform login for the newly created user
          req.login(newUser, (err) => {
            if (err) {
              console.error(err);
              return res.redirect('/login');
            }
            return res.redirect('/dashboard');
          });
        }
      } catch (err) {
        console.error(err);
        return res.redirect('/login');
      }
    })(req, res, next);
  },
};

module.exports = GoogleAuthController;
