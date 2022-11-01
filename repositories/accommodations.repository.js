const { Accommodations } = require('../models');
const { AccommodationsPictures } = require('../models');

class AccommoRepository {
    saveAccommodation = async (option, accImg) => {
        const hostAccommodation = await option.save();

        const hostAccommodationImage = await AccommodationsPictures.create({
            accId: hostAccommodation.accId,
            thumbnail: accImg[0],
            image1: accImg[1],
            image2: accImg[2],
            image3: accImg[3],
            image4: accImg[4],
        });

        return {
            data: hostAccommodation,
            thumbnail: hostAccommodationImage.thumbnail,
            accImg:
                (hostAccommodationImage.image1,
                hostAccommodationImage.image2,
                hostAccommodationImage.image3,
                hostAccommodationImage.image4),
        };
    };

    getAllAccommodations = async () => {
        return await Accommodations.findAll({
            include: {model: AccommodationsPictures, attributes: ['thumbnail']}

    });
    };

    getAccommoDetails = async (accId) => {
        const result = await Accommodations.findOne({where: {accId}, include: {model: AccommodationsPictures}});

        console.log(result);

        return result
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
