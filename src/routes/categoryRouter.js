
"user strict";
const router = require('express').Router();
const {categoryController} = require('../controllers/categoryController')
router.route("/")
.get(categoryController.list)
.post(categoryController.create);

router.route('/:id')
.get(categoryController.read)
.delete(categoryController.delete)
.put(categoryController.update)
.patch(categoryController.update)

module.exports = router;