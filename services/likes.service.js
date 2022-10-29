const LikesRepository = require('../repositories/likes.reponsitory');

class LikesService {
    likesRepository = new LikesRepository();

    //내가 좋아요한 숙소 조회
    getLikes = async (memberId) => {
        //try{
            const findGetLikes = await this.likesRepository.getLikes(memberId)
            findGetLikes.map((getlist) => {
                return{
                    accId : getlist.accId,
                    memberId : getlist.memberId,
                    createdAt : getlist.createdAt
                }
            })
            return findGetLikes
        // }catch{
        //     const error = new Error(`좋아요한 목록을 불러오지 못했습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }
    }    
    //숙소 좋아요 (누르기, 수락, 취소) 
    updateLikes = async (accId, memberId) => {
        //try{
            const useLikes = await this.likesRepository.useLikes(accId, memberId)

            if(!useLikes){
                await this.likesRepository.updateLikes(accId, memberId)
                return '좋아요를 등록하였습니다'
            }else{
                await this.likesRepository.deleteLikes(accId, memberId)
                return '좋아요를 취소하였습니다.'
            }
        // }catch{
        //     const error = new Error(`좋아요 불러오는데 실패했습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }
    }
}

module.exports = LikesService;
