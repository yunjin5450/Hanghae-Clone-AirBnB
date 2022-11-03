const { Members, Accommodations, Reservations, Reviews, Likes } = require("../models");
const { Op } = require("sequelize");


class MembersRepository {

    createMember = async(memberEmail, encryptPassword, nickname, name, gender, phoneNum) =>{
        const result = await Members.create({ memberEmail, password: encryptPassword, nickname, name, gender, phoneNum });
        return result;
    };

    createMemberWithImg = async(memberImg, memberEmail, encryptPassword, nickname, name, gender, phoneNum) =>{
        const result = await Members.create({ memberImg, memberEmail, password: encryptPassword, nickname, name, gender, phoneNum });
        return result;
    };

     // 이메일 중복확인
    duplicatedEmail = async(memberEmail)=> {
        const existEmail = await Members.findOne({ where : { memberEmail }});
        return existEmail;
    };
    // 닉네임 중복확인
    duplicatedNickname = async(nickname)=> {
        const existNickname = await Members.findOne({ where : { nickname }});
        return existNickname;        
    };

    //로그인
    loginUser = async(memberEmail)=> {     

        const member = await Members.findOne({ where: { memberEmail } });

        return member;

    };

    // memberId로 유저 조회
    getMemberById = async(memberId)=> {

        const member = await Members.findOne({ where : { memberId }});
        
        return {
            memberId: member.memberId,
            memberEmail: member.memberEmail,
            nickname: member.nickname,
            name: member.name,
            gender: member.gender,
            phoneNum: member.phoneNum,
            memberImg: member.memberImg,
            createdAt: member.createdAt,
            deletedAt: member.deletedAt
        };

    }; 

    getMemberReserve = async(memberId) => {
        //예약 테이블에서 예약한 기록 찾기
        const memberReserve = await Reservations.findAll({ where: { memberId }})
        //예약한 기록에서, 숙소 Id 뽑아내기
        const memberReserveAccomodation = memberReserve.map((reservation) => {
            let result = [];

            result = reservation.accId

            return result;
        })
        //숙소 Id를 이용해서 숙소 테이블의 내용 가져오기
        const ReserveAccomodation = await Accommodations.findAll({where: { accId: memberReserveAccomodation }})
        
        return {           
                accName: ReserveAccomodation.accName,
                accImg: ReserveAccomodation.accImg,
                accAddr: ReserveAccomodation.accAddr,
                price: ReserveAccomodation.price,
                resCheckIn: memberReserve.resCheckIn,
                resCheckOut: memberReserve.resCheckOut
            };
    };

    getLikeAccomodation = async(memberId) => {
        //라이크 테이블에서 찜한 기록찾기
        const LikeLog = await Likes.findAll({where: {memberId}})
        //라이크 테이블에서 찾은 기록에서 accid추출
        const LikeAccomodationNumber = LikeLog.map((like) => {
            let result = [];

            result = like.accId

            return result
        })
        //추출한  accid값으로 숙소 정보 찾기
        const LikeAccomodation = Accommodations.findAll({where: {accId: LikeAccomodationNumber}})

        return {
                accName: LikeAccomodation.accName,
                accImg: LikeAccomodation.accImg,
                accAddr: LikeAccomodation.accAddr,
                price: LikeAccomodation.price
        }
    };

    // 유저 프로필 수정
    updateMember = async(memberId, name ,nickname, password, gender, phoneNum)=> {
        
        await Members.update({ name ,nickname, password, gender, phoneNum },{ where: { memberId } });  // nickname 중복확인은 '/checkname' api 이용

        return {};
    };

    updateMemberWithImg = async(memberImg, memberId, name ,nickname, password, gender, phoneNum)=> {
        
        await Members.update({ memberImg, name ,nickname, password, gender, phoneNum },{ where: { memberId } });  // nickname 중복확인은 '/checkname' api 이용

        return {};
    };

    //프로필 삭제
    deleteMember = async(memberId) => {

        await Members.update({deletedAt: Date.now()},{where: {memberId}})

        return {};
    }
};  



module.exports = MembersRepository;