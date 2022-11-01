const { Reviews } = require('../models');
const { Reservations } = require('../models')

class ReviewsRepository {

    getReview = async (accId) => {

        const getAllReview = await Reviews.findAll({ where: { accId } });

        return getAllReview;
    };


    getReviewDetail = async (accId, revId) => {

        const getReviewResult = await Reviews.findOne({where: { accId, revId}})

        return {data: getReviewResult}
    };

    memberReservation = async (resId, memberId) => {
        console.log("@@@@@@@repo@memberReservation comes");
        const memberResevationLog = await Reservations.findOne({where: {resId, memberId}})
        console.log("@@@@@@@repo@memberReservation comes", memberResevationLog);
        
        return memberResevationLog
    }
    
    
    createReview = async ( accId, resId, rating, revContent, memberId ) => {
        console.log("@@@@@@@repo@createReview comes");
        const createReviews = await Reviews.create({
            accId,
            memberId,
            resId,
            rating,
            revContent
        });
        console.log("@@@@@@@repo@createReview comes", createReviews);
        
        return createReviews;
    };

    amendReview = async ( revId, revContent, memberId ) => {

        const amendReviewData = await Reviews.update({revContent},{where: {revId, memberId}})

        return amendReviewData;
    };

    deleteReview = async (revId, memberId) => {
        
        const deleteReviewData = await Reviews.update({deletedAt: Date.now()},{where: {revId, memberId}})

        return deleteReviewData;
    };
}

module.exports = ReviewsRepository;
