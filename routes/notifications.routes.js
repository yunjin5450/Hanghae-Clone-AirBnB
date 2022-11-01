const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");

const NotificationsController = require("../controllers/notifications.controller");
const notificationsController = new NotificationsController();
const upload = require('../middleware/upload_image')

router.get("/", authMiddleware, notificationsController.getNotifications);
router.get("/count", authMiddleware, notificationsController.countNotifications);
router.post("/", notificationsController.postNotification);
router.delete("/:notiId", authMiddleware, notificationsController.deleteNotification);

module.exports = router;