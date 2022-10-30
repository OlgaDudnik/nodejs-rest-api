const { Schema, model } = require("mongoose");
const Joi = require("joi");

const UserSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

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

const User = model("user", UserSchema);

module.exports = {
  User,
  userSchema,
  updateSubscriptionSchema,
};
