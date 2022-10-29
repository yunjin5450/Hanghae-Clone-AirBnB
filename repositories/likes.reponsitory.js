const { Likes } = require('../models');
const { Accommodations } = require('../models');

class LikesRepository {

    //내가 좋아요한 숙소 조회

// let likes = []
// result likes

    getLikes = async (accId, memberId) => {
        //try {
            const findGetLikes = await Likes.findAll({
                where:{accId, memberId},
                order : [['accId','DESC']]  
        })
        return findGetLikes
        // } catch {
        //     const error = new Error(`서버 실행 중 오류가 발생했습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }
    }

    //숙소 좋아요 누르기
    useLikes = async (accId, memberId) => {
        //try {
            const findUseLikes = await Likes.findOne({
                where:accId, memberId
            })
            return findUseLikes
        // } catch {
        //     const error = new Error(`좋아요 실행 중 오류가 발생했습니다.`)
        //     error.statusCode = 500
        //     throw error   
        // }
    }

    //숙소 좋아요 수락
    updateLikes = async (accId, memberId) => {
        //try {
            const likesAccommodations = await Accommodations.findOne({
                where: {accId, memberId}
            })
            //await Accommodations.increment({likes: 1}, {where :{accId}})
            await Likes.create({accId, memberId})
            return likesAccommodations
        // } catch {
        //     const error = new Error(`좋아요 요청 중 오류가 발생했습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }
    }

    //숙소 좋아요 취소
    deleteLikes = async (accId, memberId) => {
        //try { 
            const likesDelete = await Accommodations.findOne({
                where : {accId, memberId}
            })
            //await Accommodations.decrement({likes: 1}, {where: {accId}})
            await Likes.destroy({where: {accId, memberId}})
            return likesDelete
        // } catch {
        //     const error = new Error(`좋아요 취소 중 오류가 발생했습니다.`)
        //     error.statusCode =500
        //     throw error
        // }
    }
}


module.exports = LikesRepository;
