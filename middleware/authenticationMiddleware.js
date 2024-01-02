// middleware/authenticationMiddleware.js
exports.authenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware/route handler
    }
    // If not authenticated, return unauthorized status
    return res.status(401).json({ message: 'Unauthorized access' });
  };
  