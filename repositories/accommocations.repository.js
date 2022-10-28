const { Accommodations } = require('../models');

class AccommoRepository {

    saveAccommodation = async (option) => {
        return await option.save();
    }

    getAllAccommodations = async () => {
        return await Accommodations.findAll();
    }
}

module.exports = AccommoRepository;