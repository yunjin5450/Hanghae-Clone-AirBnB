const ReviewsService = require('../services/reviews.service');

class ReviewsController {

    reviewsService = new ReviewsService()

    getReview = async (req, res, next) => {
        const { accId } = req.params;

        try {

            const getAllReview = await this.reviewsService.getReview(accId)
            res.status(200).json({data: getAllReview})

        } catch (error) {

            res.status(400).json({error: error.message})

        }
    }

    getReviewDetail = async (req, res, next) => {
        const { accId, revId } = req.params;

        try {

            const getReviewData = await this.reviewsService.getReviewDetail(revId)
            res.status(200).json(getReviewData)

        } catch (error) {

            res.status(404).json({error: error.message})

        }
        
    }

    createReview = async (req, res, next) => {

        const { accId, resId } = req.params;
        const { rating, revContent } = req.body;
        const { memberId } = res.locals.user;
        const fileData = req.file;
        console.log(fileData)

        try{
            const createReviewData = await this.reviewsService.createReview(fileData, accId, resId, rating, revContent, memberId)
            res.status(201).json({data: createReviewData, message: "후기를 작성하였습니다."})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    

    amendReview = async (req, res, next) => {
        
        const { revId } = req.params;
        const { revContent } = req.body;
        const { memberId } = res.locals.user;

        const fileData = req.file;
        

        try{
            await this.reviewsService.amendReview(fileData, revId, revContent, memberId)
            res.status(200).json({message: "후기를 수정하였습니다."})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    deleteReview = async (req, res, next) => {
        const { revId } = req.params;
        const { memberId } = res.locals.user;

        try{
            await this.reviewsService.deleteReview(revId, memberId)
            res.status(200).json({message: "후기를 삭제하였습니다."})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
        
    }

}

module.exports = ReviewsController