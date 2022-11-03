const LikesService = require('../services/likes.service');

class LikesController {
    likesService = new LikesService();

    //내가 찜한 숙소 조회
    getLikes = async (req, res, next) => {
        try {
            const {memberId} = res.locals.user;
            const getLikes = await this.likesService.getLikes(memberId)
            res.status(200).json(getLikes)            
        } catch(error) {
        res.status(error.statusCode).json({error: error.message})
        }
    }


    //숙소 찜하기 (누르기, 수락, 취소)  
    updateLikes = async (req, res, next) => {
        try {
            const { accId } = req.params
            const { memberId } = res.locals.user
            const updateLikes = await this.likesService.updateLikes(accId, memberId)
            res.status(200).json(updateLikes)
        } catch(error) {
        res.status(400).json({error: error.message})
        }   
    } 
    
}

module.exports = LikesController