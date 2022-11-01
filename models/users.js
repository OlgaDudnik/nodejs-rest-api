const { Schema, model } = require("mongoose");
const Joi = require("joi");

const UserSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const userSchema = Joi.object({
  password: Joi.string().messages({ "any.required": "not valid password" }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({ "any.required": "not valid e-mail" }),
  subscription: Joi.string().default("starter"),
  token: Joi.string().default(null),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required field email" }),
});

const User = model("user", UserSchema);

module.exports = {
  User,
  userSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
};
