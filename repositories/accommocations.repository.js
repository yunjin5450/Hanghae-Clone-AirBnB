const { Accommodations } = require('../models');

class AccommoRepository {
    saveAccommodation = async (option) => {
        return await option.save();
    };

    getAllAccommodations = async () => {
        return await Accommodations.findAll();
    };

    getAccommoDetails = async (option) => {
        return await Accommodations.findOne(option);
    };

    updateAccommo = async (
        accId,
        price,
        description,
        maxPerson,
        bed,
        room,
        bathroom,
        facilities,
        accImg
    ) => {
        return await Accommodations.update(
            {
                price,
                description,
                maxPerson,
                bed,
                room,
                bathroom,
                facilities,
                accImg,
            },
            { where: { accId } }
        );
    };

    deleteAccommo = async (option) => {
        return await Accommodations.destroy(option);
    };
}

module.exports = AccommoRepository;
