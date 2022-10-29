const LikesService = require('../services/likes.service');

class LikesController {
    likesService = new LikesService();

    //내가 좋아요한 숙소 조회
    getLikes = async (req, res, next) => {
        try {
            const { memberId } = req.locals.user
            const getLikes = await this.likesService.getLikes(memberId)
            res.status(200).json({data: getLikes})            
        } catch(err){
            const error = new Error(`좋아요한 기록이 존재하지 않습니다.`)
            error.statusCode = 500
            throw error
        }
    }

    //숙소 좋아요 (누르기, 수락, 취소)  
    updateLikes = async (req, res, next) => {
        try {
            const { accId } = req.params
            const { memberId } = req.locals.user
            const updateLikes = await this.likesService.updateLikes(accId, memberId)
            res.status(200).jso({message : updateLikes})
        } catch(err){
            const error = new Error(`좋아요 등록 불가`)
            error.statusCode = 500
            throw error
        }    
    } 
    
}

module.exports = LikesController;
