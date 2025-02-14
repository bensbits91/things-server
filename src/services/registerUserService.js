const User = require('../models/userModel');

class RegisterUserService {
   async registerUser(userData) {
      const user = new User(userData);
      await user.save();
      return user;
   }
}

module.exports = RegisterUserService;

// const User = require('../models/userModel');

// class AuthService {
//    constructor() {
//       this.userModel = User;
//    }

//    async registerUser(userData) {
//       console.log('\n\nbb ~ userData:', userData, '\n\n');
//       const user = new this.userModel(userData);
//       await user.save();
//       return user;
//    }

//    async loginUser({email, auth0Id}) {
//       console.log('\n\nbb ~ {email, auth0Id}:', {email, auth0Id}, '\n\n');
//       const user = await this.userModel.findOneAndUpdate(
//          { email: email },
//          { lastLogin: new Date() },
//          { new: true }
//       );
//       return user;
//    }
// }

// module.exports = AuthService;
