const AccommoService = require('../services/accommocations.service');

class AccommoController {
    accommoService = new AccommoService();

    hostAccommodation = async (req, res, next) => {
        try{
            // const { memberId } = res.locals.user;
            const {
                memberId,
                accName,
                accAddr,
                description,
                price,
                maxPerson,
                bed,
                room,
                bathroom,
                facilities,
                accImg,
            } = req.body;
    
            const hostedAccommo = await this.accommoService.hostAccommodation(
                memberId,
                accName,
                accAddr,
                description,
                price,
                maxPerson,
                bed,
                room,
                bathroom,
                facilities,
                accImg
            );
    
            res.status(201).json({ message: '숙소를 호스트했습니다.' });
        } catch(err) {
            next(err);
        }
    };

    getAllAccommodations = async (req, res, next) => {
        try {
            const accommoList = await this.accommoService.getAllAccommodations();

            res.status(200).json({data: accommoList});
        } catch (err) {
            next(err);
        }
    };

    getAccommoDetails = async (req, res, next) => {
        try {
            const { accId } = req.params;
            const accommoDetails = await this.accommoService.getAccommoDetails(accId);

            res.status(200).json({data: accommoDetails});
        } catch (err) {
            next(err);
        }
    }

    updateAccommo = async (req, res, next) => {
        const { accId } = req.params;
        const { 
            maxPerson,
            bed,
            room,
            toilet,
            thumbnail,
            accImg
        } = req.body;

        await this.accommoService.updateAccommo(accId);

    }
}

module.exports = AccommoController;
