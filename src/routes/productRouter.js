"use strict";
const router  = require('express').Router();
const {productController} = require('../controllers/productController.js');

router.route("/")
.get(productController.list)
.post(productController.create);

router.route('/:id')
.get(productController.read)
.delete(productController.delete)
.put(productController.update)
.patch(productController.patchUpdate)


module.exports = router;