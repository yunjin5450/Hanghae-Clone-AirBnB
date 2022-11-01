const NotificationsRepository = require('../repositories/notifications.repository');

class NotificationsService {
    notificationsRepository = new NotificationsRepository();

}

module.exports = NotificationsService;
