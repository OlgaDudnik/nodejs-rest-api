const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const validateBody = require("../../middlewares/validateBody");
const { userSchema } = require("../../models/users");
const authenticate = require("../../middlewares/authenticate");

router.post("/signup", validateBody(userSchema), ctrlWrapper(ctrl.register));

router.post("/login", validateBody(userSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/:id/subscription",
  authenticate,
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
