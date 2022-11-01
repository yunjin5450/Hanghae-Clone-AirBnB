const NotificationsRepository = require('../repositories/notifications.repository');

class NotificationsService {
    notificationsRepository = new NotificationsRepository();

    sendSignUpCongrats = async(memberId, content) => {
        console.log("@@service", memberId);
        await this.notificationsRepository.sendSignUpCongrats(memberId, content);

        return;
    };
}

module.exports = NotificationsService;
