const express = require('express');
const router = express.Router();

const MembersController = require('../controllers/members.controller.js');
const membersController = new UserController();

const upload = require('../middleware/upload_image')
const authMiddleware = require("../middleware/auth_middleware");
// const user_validation = require('../validation/user_validation')


// 1.회원가입 
router.post('/signup', upload.single('userPicture'), membersController.createMember)

// 2. 회원가입 - 아이디 중복확인
router.post('/checkId', membersController.duplicatedEmail);

// 3. 회원가입 - 닉네임 중복확인
router.post('/checkname', membersController.duplicatedNickname);

//4.로그인(토큰 발급)
router.post('/login' ,membersController.login);

// 5. 마이페이지 (내 정보, 내 숙소예약정보, 내가 등록한 숙소)
router.get('/:userId', authMiddleware, membersController.getUserPage);

// 6. 유저 프로필 수정
router.put('/:userId/update', authMiddleware, membersController.updateUser);



module.exports = MembersRouter;
