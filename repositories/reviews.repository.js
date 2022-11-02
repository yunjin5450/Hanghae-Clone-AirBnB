const { Reviews } = require('../models');
const { Reservations } = require('../models')

class ReviewsRepository {

    getReview = async (accId) => {

        const getAllReview = await Reviews.findAll({ where: { accId } });

        return getAllReview;
    };


    getReviewDetail = async (revId) => {

        const getReviewResult = await Reviews.findOne({where: { revId }})

        return getReviewResult
    };

    memberReservation = async (resId, memberId) => {
        
        const memberResevationLog = await Reservations.findOne({where: {resId, memberId}})
        
        
        return memberResevationLog
    }
    
    
    createReview = async ( accId, resId, rating, revContent, memberId ) => {
        
        const createReviews = await Reviews.create({
            accId,
            memberId,
            resId,
            rating,
            revContent
        });
        
        
        return createReviews;
    };

    createReviewWithImg = async ( revImg, accId, resId, rating, revContent, memberId ) => {
        
        const createReviews = await Reviews.create({
            revImg,
            accId,
            memberId,
            resId,
            rating,
            revContent
        });
        
        
        return createReviews;
    }


    amendReview = async ( revId, revContent ) => {

        const amendReviewData = await Reviews.update({revContent},{where: {revId}})

        return amendReviewData;
    };

    amendReviewWithImg = async ( revImg, revId, revContent ) => {

        const amendReviewData = await Reviews.update({revImg, revContent},{where: {revId}})

        return amendReviewData;
    };

    deleteReview = async (revId) => {
        
        const deleteReviewData = await Reviews.update({deletedAt: Date.now()},{where: {revId}})

        return deleteReviewData;
    };
}

module.exports = ReviewsRepository;
