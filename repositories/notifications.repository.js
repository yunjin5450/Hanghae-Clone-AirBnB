const { Notifications } = require('../models');

class NotificationsRepository {

    sendSignUpCongrats = async(memberId, content) => {
        return await Notifications.create({memberId, content});
    };

    getNotifications = async(memberId) => {
        return await Notifications.findAll({where: {memberId}});
    };

    countNotifications = async(memberId) => {
        return await Notifications.count({where: {memberId}});
    };

    postNotification = async(memberId, content) => {
        return await Notifications.create({memberId, content});
    };

    deleteNotification = async(notiId) => {
        return await Notifications.destroy({where: {notiId}});
    }
}

module.exports = NotificationsRepository;
