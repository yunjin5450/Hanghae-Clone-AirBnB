const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");

const NotificationsController = require("../controllers/notifications.controller");
const notificationsController = new NotificationsController();
const upload = require('../middleware/upload_image')

// 로그인한 유저가 받은 알림 API
router.get("/", authMiddleware, notificationsController.getNotifications);

// 로그인한 유저가 받은 알림의 개수 API
router.get("/count", authMiddleware, notificationsController.countNotifications);

// 알림 생성하는 API
router.post("/", notificationsController.postNotification);

// 알림 삭제하는 API
router.delete("/:notiId", authMiddleware, notificationsController.deleteNotification);

module.exports = router;