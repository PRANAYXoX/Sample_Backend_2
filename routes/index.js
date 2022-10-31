const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.use("/user", require("./fetchContacts"));
router.use("/new", require("./newContact"));

module.exports = router;
