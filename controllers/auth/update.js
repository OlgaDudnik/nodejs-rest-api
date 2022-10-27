const { updateSubscriptionSchema } = require("../../models/users");
const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { error } = updateSubscriptionSchema.validate(req.body);
  if (error) {
    throw RequestError(
      400,
      "this field must contain only one of these values: starter, business, pro"
    );
  }
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateSubscription;
