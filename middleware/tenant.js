module.exports = (req, res, next) => {
  if (!req.organizationId) {
    return res.status(400).send("Organization ID is required");
  }
  next();
};
