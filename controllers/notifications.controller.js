const NotificationsService = require('../services/notifications.service');

class NotificationsController {
    notificationsService = new NotificationsService();
    
};

module.exports = NotificationsController;