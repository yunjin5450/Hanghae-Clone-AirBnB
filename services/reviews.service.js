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

    getReviewDetail = async (accId, revId) => {

        try { 
            const getReviewDetailData = await this.reviewsRepository.getReviewDetail(accId, revId)

            return getReviewDetailData

        } catch (error) {

            throw new Error ("해당 후기가 존재하지 않습니다")
        }
        
    }

    createReview = async (accId, revContent, memberId) => {
        
        const  memberReserveData = await this.reviewsRepository.memberReservation(accId, memberId)

        if(!memberReserveData) {throw new Error ("후기를 작성할 권한이 없습니다")}

        try {

            const createReviewData = await this.reviewsRepository.createReview(accId, revContent, memberId)

            return (createReviewData)

        } catch (error) {

            throw new Error ("후기를 작성에 실패하였습니다")

        }
        
    }


    amendReview = async (commentId, comment, userId) => {

        try {

            const amendCommentOne = await this.reviewsRepository.amendReview(commentId, comment, userId);

            return amendCommentOne;

        } catch (error) {
            throw new Error ('후기 수정에 실패하였습니다')
        }

        
    }

    deleteReview = async (commentId, userId ) => {

        const deleteCommentOne = await this.reviewsRepository.deleteReview(commentId, userId );

        return deleteCommentOne;
    }
}

module.exports = ReviewsService