const express = require('express')
const router = express.Router();

const ReviewsController = require('../controllers/reviews.controller')
const reviewsController = new ReviewsController();
const authMiddleware = require("../middleware/auth_middleware");
const upload = require('../middleware/upload_image')
//1.후기 전체조회
router.get('/:accId', reviewsController.getReview)

//2.후기 상세조회
router.get('/:accId/:revId', reviewsController.getReviewDetail)

//3.후기 작성
router.post('/:accId/:resId', authMiddleware, upload.single('revImg'), reviewsController.createReview)

//4.후기 수정
router.patch('/:accId/:revId', authMiddleware, upload.single('revImg'), reviewsController.amendReview)

//5.후기 삭제
router.delete('/:accId/:revId', authMiddleware, reviewsController.deleteReview)


module.exports = router;