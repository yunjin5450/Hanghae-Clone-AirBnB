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
        } catch {
            next(err);
        }
    };

    getAllAccommodations = async (req, res, next) => {
        const accommoList = await this.accommoService.getAllAccommodations();
        res.status(200).json({data: accommoList});
    };
}

module.exports = AccommoController;
