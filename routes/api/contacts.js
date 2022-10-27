const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers/contacts");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post("/", authenticate, ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeContact)
);

module.exports = router;
