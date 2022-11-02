const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth_middleware")

const LikesController = require('../controllers/likes.controller')
const likesController = new LikesController();


// 1.내가 좋아요한 숙소 조회
router.get('/', authMiddleware, likesController.getLikes)

// 2. 숙소 좋아요 (누르기, 수락, 취소)
router.put('/:accId', authMiddleware, likesController.updateLikes)

module.exports = router