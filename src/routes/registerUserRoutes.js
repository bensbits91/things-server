const RegisterUserController = require('../controllers/registerUserController');

const registerUserRoutes = async (fastify, options) => {
   const registerUserController = new RegisterUserController();

   fastify.post(
      '/register',
      registerUserController.registerUser.bind(registerUserController)
   );
};

module.exports = registerUserRoutes;

// const AuthController = require('../controllers/registerUserController');

// const authRoutes = async (fastify, options) => {
//    const authController = new AuthController();

//    // todo: why do we need to bind the controller methods?
//    fastify.post('/register', authController.registerUser.bind(authController));
//    fastify.post('/login', authController.loginUser.bind(authController));

//    // Protected route example
//    fastify.get(
//       '/protected',
//       { preValidation: [fastify.authenticate] },
//       async (req, reply) => {
//          reply.send({ message: 'This is a protected route' });
//       }
//    );
// };

// module.exports = authRoutes;
