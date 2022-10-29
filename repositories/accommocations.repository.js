const { Accommodations } = require('../models');

class AccommoRepository {

    saveAccommodation = async (option) => {
        return await option.save();
    }

    getAllAccommodations = async () => {
        return await Accommodations.findAll();
    }

    getAccommoDetails = async(option) => {
        return await Accommodations.findOne(option);
    }

    deleteAccommo = async(option) => {
        return await Accommodations.destroy(option);
    }
}

module.exports = AccommoRepository;