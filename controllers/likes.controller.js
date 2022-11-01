const LikesService = require('../services/likes.service');

class LikesController {
    likesService = new LikesService();

    //내가 찜한 숙소 조회
    getLikes = async (req, res, next) => {
        //try {
            const {memberId} = req.params
            const getLikes = await this.likesService.getLikes(memberId)
            res.status(200).json({data: getLikes})            
        // } catch(err){
        //     const error = new Error(`찜한 숙소 기록이 존재하지 않습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }
    }


    //숙소 찜하기 (누르기, 수락, 취소)  
    updateLikes = async (req, res, next) => {
        //try {
            const { accId } = req.params
            const { memberId } = res.locals.user
            const updateLikes = await this.likesService.updateLikes(accId, memberId)
            res.status(200).json({message : updateLikes})
        // } catch(err){
        //     const error = new Error(`숙소 찜하기를 등록 하지 못했습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }    
    } 
    
}

module.exports = LikesController;