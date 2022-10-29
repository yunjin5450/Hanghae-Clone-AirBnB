const AccommoService = require('../services/accommocations.service');

class AccommoController {
    accommoService = new AccommoService();

    hostAccommodation = async (req, res, next) => {
        try {
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
        } catch (err) {
            next(err);
        }
    };

    getAllAccommodations = async (req, res, next) => {
        try {
            const accommoList =
                await this.accommoService.getAllAccommodations();

            res.status(200).json({ data: accommoList });
        } catch (err) {
            next(err);
        }
    };

    getAccommoDetails = async (req, res, next) => {
        try {
            // const { accId } = req.params;
            const accommoDetails = await this.accommoService.getAccommoDetails(
                accId
            );

            res.status(200).json({ data: accommoDetails });
        } catch (err) {
            next(err);
        }
    };

    updateAccommo = async (req, res, next) => {
        // const { memberId } = res.locals.user;
        const { accId } = req.params;
        const { price, description, maxPerson, bed, room, bathroom, facilities, accImg } = req.body;

        await this.accommoService.updateAccommo(
            accId,
            price,
            description,
            maxPerson,
            bed,
            room,
            bathroom,
            facilities,
            accImg
        );

        res.status(201).json({ message: '숙소 정보를 수정했습니다.' });
    };

    deleteAccommo = async (req, res, next) => {
        // const { memberId } = res.locals.user;
        const { accId } = req.params;

        await this.accommoService.deleteAccommo(accId);

        res.status(201).json({ message: '숙소를 삭제했습니다.' });
    }
}

module.exports = AccommoController;
