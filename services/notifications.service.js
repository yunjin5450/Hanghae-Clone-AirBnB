const NotificationsRepository = require('../repositories/notifications.repository');

class NotificationsService {
    notificationsRepository = new NotificationsRepository();

    sendSignUpCongrats = async(memberId, content) => {
        console.log("@@service", memberId);
        await this.notificationsRepository.sendSignUpCongrats(memberId, content);

        return;
    };

    getNotifications = async(memberId) => {
        const notifications = await this.notificationsRepository.getNotifications(memberId);

        return notifications;
    };

    countNotifications = async(memberId) => {
        const count = await this.notificationsRepository.countNotifications(memberId);

        return count;
    };

    postNotification = async(memberId, content) => {
        await this.notificationsRepository.postNotification(memberId, content);
        return;
    };

    deleteNotification = async(notiId) => {
        await this.notificationsRepository.deleteNotification(notiId);
        return;
    }
}

module.exports = NotificationsService;
