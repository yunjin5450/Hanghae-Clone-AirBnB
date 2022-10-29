const { comments } = require('../models');

class ReviewsRepository {
    
    getAllComments = async ({ postId }) => {
        const getAllComment = await comments.findAll({ where: { postId } });

        return getAllComment;
    };

    createReview = async ({ postId, comment, userId, nickname }) => {
        const createComments = await comments.create({
            postId,
            comment,
            userId,
            nickname,
        });

        return { data: createComments };
    };



    memberReservation

    amendComment = async ({ commentId, comment, userId }) => {
        const amendCommentOne = await comments.update(
            {
                comment,
            },
            {
                where: {
                    commentId,
                    userId,
                },
            }
        );
        return amendCommentOne;
    };

    deleteComment = async ({commentId, userId }) => {
        const deleteCommentOne = await comments.destroy(
            {where:{
                commentId, 
                userId
            }}
        )
        return deleteCommentOne;
    };
}

module.exports = ReviewsRepository;
