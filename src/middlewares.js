export const isAuthenticated = (req) => {
  if (!req.user) {
    throw Error("You need to log in to perform this action");
  }
  return;
}
export const isAuthenticatedUpload = (req, res, next) => {
  if (!req.user) {
    throw Error("You need to log in to perform this action");
  }
  return next();
}