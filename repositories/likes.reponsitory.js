const { Likes } = require('../models');

class LikesRepository {

    //내가 찜한 숙소 조회
    getLikes = async (memberId) => {
        //try {
            const findGetLikes = await Likes.findAll(
                {
                    where : {memberId},
                    //order : [['createdAt','DESC']] 
                })       
            return findGetLikes
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

    //숙소 찜 수락
    updateLikes = async (accId, memberId) => {
        //try {
            const likesAccommodations = await Likes.findOne({where: {accId, memberId}})
            await Likes.create({accId, memberId});
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