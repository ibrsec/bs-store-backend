"user strict";

const router = require("express").Router();
const { userController } = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

router.route("/").get(validateToken,userController.list).post(userController.create);
router
  .route("/:id")
  .get(validateToken,userController.read)
  .delete(validateToken,userController.delete)
  .put(validateToken,userController.update)
  .patch(validateToken,userController.patchUpdate);

module.exports = router;
