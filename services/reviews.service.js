const ReviewsRepository = require('../repositories/reviews.repository');

class ReviewsService {

    reviewsRepository = new ReviewsRepository();
    
    getReview = async (accId) => {
       
        try{
            const getAllReview = await this.reviewsRepository.getReview(accId)

            return getAllReview;

        } catch (error) {

            throw new Error ("후기가 존재하지 않습니다")
        }
       
    }

    getReviewDetail = async (revId) => {

        try { 
            const getReviewDetailData = await this.reviewsRepository.getReviewDetail(revId)

            return getReviewDetailData

        } catch (error) {

            throw new Error ("해당 후기가 존재하지 않습니다")
        }
        
    }
    
    createReview = async (fileData, accId, resId, rating, revContent, memberId) => {
        const memberReserveData = await this.reviewsRepository.memberReservation(resId, memberId);
        
        if(!memberReserveData) {throw new Error ("후기를 작성할 권한이 없습니다")};
        
        if(!fileData) { 

            const createReviewData = await this.reviewsRepository.createReview(accId, resId, rating, revContent, memberId);
    
            return createReviewData;
    
        } else if (fileData) {

            const revImg = fileData.location

            const createReviewData = await this.reviewsRepository.createReviewWithImg(revImg, accId, resId, rating, revContent, memberId);
    
            return createReviewData;

        } else {
            
            throw new Error ("후기 작성에 실패하였습니다")
            
        }

    };
    
   
    amendReview = async (fileData, revId, revContent, memberId) => {

        const existReviewData = await this.reviewsRepository.getReviewDetail(revId)

        if(existReviewData.memberId !== memberId) { throw new Error ('수정 권한이 없습니다')}

        if (!fileData) {

            const amendReviewResult = await this.reviewsRepository.amendReview(revId, revContent);

            return amendReviewResult;

        } else if (fileData) {

            const revImg = fileData.location  

            const amendReviewResult = await this.reviewsRepository.amendReviewWithImg(revImg, revId, revContent);

            return amendReviewResult;
        } else {

            throw new Error ('후기 수정에 실패하였습니다')

        }
        
            
   
    }

    deleteReview = async (revId, memberId ) => {
        
        
        const existReviewData = await this.reviewsRepository.getReviewDetail(revId)

        if(existReviewData.memberId !== memberId) { throw new Error ('삭제 권한이 없습니다')}

        try {
            const deleteReviewResult = await this.reviewsRepository.deleteReview(revId) ;

            return deleteReviewResult;

        } catch (error) {

            throw new Error ('후기 삭제에 실패하였습니다')
        }
        
    }
}

module.exports = ReviewsService