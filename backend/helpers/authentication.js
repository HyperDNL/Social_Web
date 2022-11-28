const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  }
  return { message: "Not authorized." };
};
