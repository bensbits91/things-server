const RegisterUserService = require('../services/registerUserService');

class RegisterUserController {
   constructor() {
      this.registerUserService = new RegisterUserService();
   }

   async registerUser(req, reply) {
      try {
         const user = await this.registerUserService.registerUser({
            // username: req.body.username,
            email: req.body.email,
            auth0Id: req.body.auth0Id
         });

         reply.code(201).send(user);
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }
}

module.exports = RegisterUserController;

// const axios = require('axios');
// const AuthService = require('../services/registerUserService');

// // Load environment variables
// if (process.env.NODE_ENV === 'development') {
//    require('dotenv').config({ path: '.env.local' });
// } else {
//    require('dotenv').config();
// }
// const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_AUDIENCE } =
//    process.env;

// class AuthController {
//    constructor() {
//       this.authService = new AuthService();
//    }

//    async registerUser(req, reply) {
//       console.log('\n\nbb ~ req:', req, '\n\n');
//       try {
//          // Register the user with Auth0
//          const response = await axios.post(
//             `https://${AUTH0_DOMAIN}/dbconnections/signup`,
//             {
//                client_id: AUTH0_CLIENT_ID,
//                email: req.body.email,
//                password: req.body.password,
//                connection: 'Username-Password-Authentication'
//             }
//          );
//          console.log('\n\nbb ~ response:', response, '\n\n');

//          // Call the AuthService to register the user
//          const user = await this.authService.registerUser({
//             username: req.body.username,
//             email: req.body.email,
//             auth0Id: req.body.auth0Id
//          });

//          const res = { auth0Response: response.data, user };
//          console.log('\n\nbb ~ res:', res, '\n\n');

//          reply.code(201).send(res);
//       } catch (error) {
//          console.log('\n\nbb ~ error:', error, '\n\n');
//          reply.code(500).send({ message: error.message });
//       }
//    }

//    async loginUser(req, reply) {
//       console.log('\n\nbb ~ req:', req, '\n\n');
//       try {
//          // Login the user with Auth0
//          const response = await axios.post(
//             `https://${AUTH0_DOMAIN}/oauth/token`,
//             {
//                grant_type: 'password', // todo: not secure in production, implement PKCE or something
//                username: req.body.email,
//                password: req.body.password,
//                audience: AUTH0_AUDIENCE,
//                client_id: AUTH0_CLIENT_ID,
//                client_secret: AUTH0_CLIENT_SECRET,
//                realm: 'Username-Password-Authentication' // when using grant_type: 'password', specify the connection name here
//             }
//          );
//          console.log('\n\nbb ~ response:', response, '\n\n');

//          // Call the AuthService to register the user
//          const user = await this.authService.loginUser({
//             // username: req.body.username,
//             email: req.body.email,
//             auth0Id: req.body.auth0Id
//          });

//          const res = { auth0Response: response.data, user };
//          console.log('\n\nbb ~ res:', res, '\n\n');

//          reply.code(200).send(res);
//       } catch (error) {
//          console.log('\n\nbb ~ error:', error, '\n\n');
//          if (error.response) {
//             reply.code(500).send(error.response.data);
//          } else {
//             reply.code(500).send({ message: error.message });
//          }
//       }
//    }
// }

// module.exports = AuthController;
