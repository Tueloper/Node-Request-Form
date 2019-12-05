const express = require("express");
const router = express.Router();
const ContactCntroller = require('./../controllers/Form');
// const Auth = require('../middleware/Auth');

/* GET users listing. */
router.post("/create/request", ContactCntroller.sendMessage);

module.exports = router;