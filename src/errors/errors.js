class AppError extends Error {
   constructor(statusCode, message, isOperational) {
      super(message);
    //   Object.setPrototypeOf(this, new.target.prototype); // todo: is this needed? (Restore prototype chain)
      this.statusCode = statusCode;
      this.isOperational = isOperational; // Indicates if the error is operational (expected) or not
      Error.captureStackTrace(this, this.constructor);
   }
}

class ValidationError extends AppError { // todo: I want to include details about what was invalid
   constructor(message = 'Validation error') {
      super(400, message, true);
   }
}

class NotFoundError extends AppError {
   constructor(message = 'Resource not found') {
      super(404, message, true);
   }
}

class DuplicateKeyError extends AppError {
   constructor(message = 'Duplicate key error') {
      super(409, message, true);
   }
}

module.exports = { AppError, ValidationError, NotFoundError, DuplicateKeyError };
