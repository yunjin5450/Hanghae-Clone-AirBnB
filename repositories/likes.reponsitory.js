const { Likes } = require('../models');
<<<<<<< HEAD
//const { Accommodations } = require('../models')
=======
>>>>>>> 420e49f84688958f32cb6da4004f257f4d57cfa3

class LikesRepository {

    //내가 찜한 숙소 조회
<<<<<<< HEAD

    getLikes = async (memberId) => {
        //try {
            const findGetLikes = await Likes.findAll({
                where:{memberId},
                order : [['createdAt','DESC']]  
        })
        return findGetLikes
=======
    getLikes = async (memberId) => {
        //try {
            const findGetLikes = await Likes.findByPk(memberId)
            console.log(memberId)
                //order : [['accId','DESC']]  
            return findGetLikes
>>>>>>> 420e49f84688958f32cb6da4004f257f4d57cfa3
        // } catch {
        //     const error = new Error(`서버 실행 중 오류가 발생했습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }
    }
    
    //숙소 찜 누르기
    useLikes = async (accId, memberId) => {
        //try {
            const findUseLikes = await Likes.findOne({
                where: {accId, memberId}
            })
            return findUseLikes
            
        // } catch {
        //     const error = new Error(`찜하기 실행 중 오류가 발생했습니다.`)
        //     error.statusCode = 500
        //     throw error   
        // }
    }

<<<<<<< HEAD
    // //숙소 찜할 게시글이 없을 때
    // disappearAcc = async (accId) => {
    //     const likesAcc =  await Accommodations.findOne({
    //         where : {accId} })
    //     if(!Accommodations.accId){ throw new Error('숙소정보가 존재하지 않습니다.')} 
    //     return likesAcc
    // }

=======
>>>>>>> 420e49f84688958f32cb6da4004f257f4d57cfa3
    //숙소 찜 수락
    updateLikes = async (accId, memberId) => {
        //try {
            const likesAccommodations = await Likes.findOne({where: {accId, memberId}})
            await Likes.create({accId, memberId})
            return likesAccommodations
        // } catch {
        //     const error = new Error(`찜하기 중 오류가 발생했습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }
    }

    //숙소 찜 취소
    deleteLikes = async (accId, memberId) => {
        //try { 
            const likesDelete = await Likes.findOne({
                where : {accId, memberId}
            })
            await Likes.destroy({where: {accId, memberId}})
            return likesDelete
        // } catch {
        //     const error = new Error(`찜하기 취소 중 오류가 발생했습니다.`)
        //     error.statusCode =500
        //     throw error
        // }
    }
}


module.exports = LikesRepository;
