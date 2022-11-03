const NotificationsService = require('../services/notifications.service');

class NotificationsController {
    notificationsService = new NotificationsService();
    
    getNotifications = async (req, res, next) => {
        const { memberId } = res.locals.user;

        try {
            const notifications = await this.notificationsService.getNotifications(memberId);
    
            res.status(200).json( notifications );
        } catch (err) {
            next(err);
        }
    };

    countNotifications = async (req, res, next) => {
        const { memberId } = res.locals.user;

        try {
            const count = await this.notificationsService.countNotifications(memberId);
    
            res.status(200).json( count );
        } catch (err) {
            next(err);
        }
    };

    postNotification = async (req, res, next) => {
        const { memberId, content } = req.body;

        try {
            await this.notificationsService.postNotification(memberId, content);
            res.status(200).send("공지 메세지 보내기 완료");
        }catch (err) {
            next(err);
        }
    };

    deleteNotification = async (req, res, next) => {
        const { notiId } = req.params;

        await this.notificationsService.deleteNotification(notiId);
        res.status(200).json({message: "삭제 완료!"});
    };
};

module.exports = NotificationsController;