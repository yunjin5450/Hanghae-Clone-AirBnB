const { Reviews } = require('../models');
const { Reservations } = require('../models')

class ReviewsRepository {

    getReview = async (accId) => {

        const getAllReview = await Reviews.findAll({ where: { accId } });

        return {data: getAllReview};
    };


    getReviewDetail = async (accId, revId) => {

        const getReviewResult = await Reviews.findOne({where: { accId, revId}})

        return {data: getReviewResult}
    };

    memberReservation = async (accId, memberId) => {

        const memberResevationLog = await Reservations.findOne({where: {accId, memberId}})

        return memberResevationLog
    }


    createReview = async ( accId, resId, revContent, memberId ) => {
        const createReviews = await Reviews.create({
            accId,
            resId,
            revContent,
            memberId
        });

        return { data: createReviews };
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
