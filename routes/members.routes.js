const express = require('express');
const router = express.Router();

const MembersController = require('../controllers/members.controller.js');
const membersController = new MembersController();

const upload = require('../middleware/upload_image')
const authMiddleware = require("../middleware/auth_middleware");

// 1.회원가입 
router.post('/signup', upload.single('memberImg'), membersController.createMember)

// 2. 회원가입 - 아이디 중복확인
router.post('/checkId', membersController.duplicatedEmail);

// 3. 회원가입 - 닉네임 중복확인
router.post('/checkname', membersController.duplicatedNickname);

//4.로그인(토큰 발급)
router.post('/login', membersController.loginUser);

router.get('/loginInfo', authMiddleware, membersController.loginInfo);

// 5. 마이페이지 (내 정보, 내 숙소예약정보, 내가 찜한 숙소, 내가 호스팅한 숙소)
router.get('/me', authMiddleware, membersController.getMyProfile);

//6. 타유저 프로필 페이지(타 유저 정보)
router.get('/:memberId', authMiddleware, membersController.getMemberProfie)

// 6. 유저 프로필 수정
router.patch('/amend', upload.single('memberImg'), authMiddleware, membersController.updateMember);

//7. 유저 프로필 삭제
router.delete('/delete', authMiddleware, membersController.deleteMember);


module.exports = router;
