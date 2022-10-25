const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
