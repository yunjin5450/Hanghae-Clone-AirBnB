const ReviewsController = require('../services/reviews.service');

class ReviewsController {Id

    reviewsService = new ReviewsService()

    getReview = async (req, res, next) => {
        const { accId } = req.params;

        try {

            const getAllReview = await this.reviewsService.getReview(accId)
            res.status(200).json(getAllReview)

        } catch (error) {

            res.status(400).json({error: error.message})

        }
    }

    getReviewDetail = async (req, res, next) => {
        const { accId, revId } = req.params;

        try {

            const getReviewData = await this.reviewsService.getReviewDetail(accId, revId)
            res.status(200).json(getReviewData)

        } catch (error) {

            res.status(404).json({error: error.message})

        }
        
    }

    createReview = async (req, res, next) => {

        const { accId, resId } = req.params;
        const { revContent } = req.body;
        const { memberId } = res.locals.users;
        
        try{
           const createReviewData = await this.reviewsService.createComment({ accId, resId, revContent, memberId })
            res.status(201).json({data: createReviewData, message: "후기를 작성하였습니다."})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    

    amendReview = async (req, res, next) => {
        const { revId } = req.params;
        const { revContent } = req.body;
        const { memberId } = res.locals.users;

        try{
            await this.reviewsService.amendComment({revId, revContent, memberId})
            res.status(200).json({message: "후기를 수정하였습니다."})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    deleteReview = async (req, res, next) => {
        const { revId } = req.params;
        const { memberId } = res.locals.users;

        try{
            await this.reviewsService.deleteComment({ revId, memberId })
            res.status(200).json({message: "후기를 삭제하였습니다."})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
        
    }

}

module.exports = ReviewsController