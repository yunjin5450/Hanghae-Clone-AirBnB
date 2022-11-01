const MembersRepository = require('../repositories/members.repository');
const jwt = require("jsonwebtoken");
require('dotenv').config()
const bcrypt = require('bcrypt');

class MembersService {

    membersRepository = new MembersRepository();

    exceptLogin = async(authorization)=> {

        const [authToken] = (authorization || "").split(" ");

        return authToken

      };


    createMember = async(authorization, fileData, memberEmail, password, nickname, name, gender, phoneNum) => {
        const status = await this.exceptLogin(authorization); 
            
        if(status){ throw new Error('이미 로그인 되어 있습니다.')}; //예외처리. 이미 로그인 된 상태

        if(!memberEmail || !nickname || !password || !name || !phoneNum){ 
            throw new Error('필수 정보를 모두 입력해주세요')
        };  //예외처리. 공란
        const encryptPassword = bcrypt.hashSync(password, 10)
        
        if(!fileData) {
            //프로필 사진 없으면
            const createMemberData = await this.membersRepository.createMember(memberEmail, encryptPassword, nickname, name, gender, phoneNum);
            return createMemberData;

        } else if (fileData) {
            //프로필 사진 있으면
            const memberImg = fileData.location //S3에 저장된 멤버의 이미지 파일의 경로를 가지고옴
            const createMemberData = await this.membersRepository.createMemberWithImg(memberImg, memberEmail, encryptPassword, nickname, name, gender, phoneNum);
            return createMemberData;

        } else {
            throw new Error ('회원가입에 실패하였습니다.')
        }
    };


    duplicatedEmail = async(memberEmail)=> {
        
        if(!memberEmail){ throw new Error ("이메일을 입력하세요")}; //예외처리. 공란

        const duplicatedIdData = await this.membersRepository.duplicatedEmail(memberEmail);
       
        if(duplicatedIdData){ throw new Error ('중복된 이메일 입니다.')}; //예외처리. 중복

        return {message : "사용가능한 이메일 입니다"}
    };


    duplicatedNickname = async(nickname)=> {
        if(!nickname){ throw new Error ("닉네임을 입력하세요")}; //예외처리. 공란

        const duplicatedNicknameResult = await this.membersRepository.duplicatedNickname(nickname);
        
        if(duplicatedNicknameResult){ throw new Error ('중복된 닉네임 입니다.')};  //예외처리. 공란
        
        return {message : "사용가능한 닉네임 입니다"}
    };


    loginUser = async(authorization, memberEmail, password)=> {

        const status = await this.exceptLogin(authorization); 
        
        if(status){ throw new Error('이미 로그인 되어 있습니다.')};  //예외처리. 이미 로그인 된 상태
       
        if(!memberEmail || !password){ throw new Error('아이디와 비밀번호를 모두 입력하세요.')};  //예외처리. 공란

        const loginData = await this.membersRepository.loginUser(memberEmail); // 해당회원 존재하는지 확인
        
        //비밀번호 일치 하는지 확인
        if( bcrypt.compareSync(password, loginData.password ) === false ) {
            
            throw new Error('비밀번호가 일치하지 않습니다.')
        }

        if (!loginData){ throw new Error ('일치하는 회원정보가 없습니다. ')}; //예외처리. 일치 정보 없음

        const token = jwt.sign({ 
            memberId: loginData.memberId,
            memberEmail: loginData.memberEmail, 
            name:loginData.name, 
            nickname: loginData.nickname,
        }, 
            process.env.SECRET_KEY
        );
        
        return {
            token:`Bearer ${ token }`, 
            memberId: loginData.memberId,
            memberEmail: loginData.memberEmail, 
            name:loginData.name, 
            nickname: loginData.nickname,
            memberImg: loginData.memberImg, 
            message: '로그인 성공'
        };  //토큰 발행
    };


    getMyProfile = async(memberId) => {

        const member = await this.membersRepository.getMemberById(memberId) //멤버 정보
            
        if(!member) {throw new Error ('존재하지 않는 사용자입니다.')}  //예외처리. 불일치

        const getMemberReserveResult = await this.membersRepository.getMemberReserve(memberId); //예약한 내역찾기
        const getMemberLikeResult = await this.membersRepository.getLikeAccomodation(memberId); //찜한 내역 찾기
        
        return {memberInfo: member, ReservationData: getMemberReserveResult, LikeData: getMemberLikeResult};        
    };

    getMemberProfie = async (memberId) => {

        const member = await this.membersRepository.getMemberById(memberId) //멤버 정보
            
        if(!member) {throw new Error ('존재하지 않는 사용자입니다.')}  //예외처리. 불일치

        return {memberInfo: member}
    }


    updateMember = async(fileData, memberId, name ,nickname, password, gender, phoneNum)=> {
        const member = await this.membersRepository.getMemberById(memberId)
        
        if( !member ) {throw new Error ('존재하지 않는 사용자입니다.')} //예외처리. 불일치

        if (!fileData) {
            const updateUserData = await this.membersRepository.updateMember(memberId, name ,nickname, password, gender, phoneNum);

            return updateUserData;
    
        } else if (fileData) {
            const memberImg = fileData.location 

            const updateUserData = await this.membersRepository.updateMemberWithImg(memberImg, memberId, name ,nickname, password, gender, phoneNum);

            return updateUserData;
        } else {
            throw new Error ('회원 정보 수정에 실패하였습니다')
        }
        
    };

    deleteMember = async (memberId) => {

        const member = await this.membersRepository.getMemberById(memberId)
        
        if( !member ) {throw new Error ('존재하지 않는 사용자입니다.')} //예외처리. 불일치
        
        if( member.deletedAt ) {throw new Error ('이미 탈퇴된 회원입니다')} //예외처리, 이미 탈퇴된 회원

        try {
            
            const deleteMemberResult = await this.membersRepository.deleteMember(memberId)

            return deleteMemberResult;

        } catch (error) {

            throw new Error ("탈퇴에 실패하였습니다")
        }
    }
        
}

module.exports = MembersService;