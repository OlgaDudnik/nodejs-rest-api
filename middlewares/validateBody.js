const { RequestError } = require("../helpers");

const validateBody = (userSchema) => {
  const func = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
