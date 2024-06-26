const express = require("express");
const router = express.Router();

const controller = require("../controllers/task.controller");
const taskValidate = require("../validates/task.validate");

router.get("/", controller.task);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.post(
    "/create",
    taskValidate.create,
    controller.create
);

router.patch(
    "/edit/:id",
    taskValidate.edit,
    controller.edit
);

router.patch("/delete/:id", controller.delete);

router.patch("/delete-multi", controller.deleteMulti);

module.exports = router;