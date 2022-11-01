const LikesRepository = require('../repositories/likes.repository');

class LikesService {
    likesRepository = new LikesRepository();

    //내가 찜한 숙소 조회
    getLikes = async (memberId) => {
        //try{
            const getlist = await this.likesRepository.getLikes(memberId)
                return getlist
        // }catch{
        //     const error = new Error(`찜한 숙소 목록을 불러오지 못했습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }
    }    
    //숙소 찜하기 (누르기, 수락, 취소) 
    updateLikes = async (accId, memberId) => {
        //try{
            const useLikes = await this.likesRepository.useLikes(accId, memberId)
            if(!useLikes){
                await this.likesRepository.updateLikes(accId, memberId)
                return '찜하기를 등록하였습니다'
            }else{
                await this.likesRepository.deleteLikes(accId, memberId)
                return '찜하기를 취소하였습니다.'
            }
        // }catch{
        //     const error = new Error(`찜한 숙소 불러오는데 실패했습니다.`)
        //     error.statusCode = 500
        //     throw error
        // }
    }
}

module.exports = LikesService;