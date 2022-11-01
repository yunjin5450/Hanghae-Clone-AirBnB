const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");

const AccommoController = require("../controllers/accommodations.controller");
const accommoController = new AccommoController();
const upload = require('../middleware/upload_image')

// 숙소 호스팅 하기(숙소 글 올리기) API
router.post("/", authMiddleware, upload.array('accImg', 10) ,accommoController.hostAccommodation);
router.get("/", accommoController.getAllAccommodations);
router.get("/:accId", accommoController.getAccommoDetails);
router.patch("/:accId", accommoController.updateAccommo);
router.delete("/:accId", accommoController.deleteAccommo);

module.exports = router;