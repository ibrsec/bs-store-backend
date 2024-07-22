"user strict";

const router = require("express").Router();
const { userController } = require("../controllers/userController");

router.route("/").get(userController.list).post(userController.create);
router
  .route("/:id")
  .get(userController.read)
  .delete(userController.delete)
  .put(userController.update)
  .patch(userController.patchUpdate);

module.exports = router;
