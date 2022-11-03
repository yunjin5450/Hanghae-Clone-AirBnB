const { Accommodations } = require('../models');
const { AccommodationsPictures } = require('../models');
const { Likes } = require('../models');

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

    getAccommoDetails = async (accId, memberId) => {
        let result = {};
        if(memberId) {
            result = await Accommodations.findOne({where: {accId}, include: [{model: AccommodationsPictures}]});
            const likesData = await Likes.findAll({where: {accId, memberId}});
            console.log("@@@@@repo", likesData);
            if(likesData.length) {
                return {result, likesData: true};
            } else {
                return {result, likesData: false};
            }
        } else {
            result = await Accommodations.findOne({where: {accId}, include: [{model: AccommodationsPictures}]});
            return result;
        }
    };

    updateAccommo = async (
            accId,
            accName,
            accAddr,
            price,
            description,
            maxPerson,
            bed,
            room,
            bathroom,
            facilities,
            accImg
    ) => {
        
        const result = await Accommodations.update(

            {
                accName,
                accAddr,
                price,
                description,
                maxPerson,
                bed,
                room,
                bathroom,
                facilities,
            },
            { where: { accId } }
        );
        console.log(result)

        await AccommodationsPictures.update(
            {
                thumbnail: accImg[0],
                image1: accImg[1],
                image2: accImg[2],
                image3: accImg[3],
                image4: accImg[4]
            },
            { where: {accId}}
        );

        return result;
    };

    deleteAccommo = async (option) => {

        console.log(option)
        const result = await Accommodations.destroy(option);

        await AccommodationsPictures.destroy(option)
        
        return result;
    };
}

module.exports = AccommoRepository;
