const { Notifications } = require('../models');

class NotificationsRepository {

    sendSignUpCongrats = async(memberId, content) => {
        console.log("@@repo", memberId);
        return await Notifications.create({memberId, content});
    }
}

module.exports = NotificationsRepository;
