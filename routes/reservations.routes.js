const express = require('express')
const router = express.Router();

const ReservationsController = require('../controllers/reservations.controller')
const reservationsController = new ReservationsController();
const authMiddleware = require("../middleware/auth_middleware");

//1.예약 등록 작성 하기
router.post('/:accId', authMiddleware, reservationsController.createReservations)

//2.예약 목록 보기
router.get('/length/:memberId', authMiddleware, reservationsController.findAllReservations)

//3.예약 상세 보기
router.get('/:accId', authMiddleware, reservationsController.findReservationsId)

//4.예약 내역 수정 
router.put('/:accId', authMiddleware, reservationsController.updateReservations)

//5.예약 내역 취소
router.delete('/:accId', authMiddleware, reservationsController.deleteReservations)


module.exports = router;