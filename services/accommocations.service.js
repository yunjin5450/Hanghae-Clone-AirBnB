const { Accommodations } = require('../models');
const AccommoRepository = require('../repositories/accommocations.repository');

class AccommoService {
    accommoRepository = new AccommoRepository();

    hostAccommodation = async (
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
    ) => {
        const option = Accommodations.build({
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
        });
        const hostedAccommo = await this.accommoRepository.saveAccommodation(
            option
        );

        if (hostedAccommo) {
            return hostedAccommo;
        } else {
            throw new Error('숙소 호스트에 실패했습니다.');
        }
    };

    getAllAccommodations = async () => {
        const accommoList = await this.accommoRepository.getAllAccommodations();

        if(accommoList) {
            return accommoList;
        } else {
            throw new Error('숙소 목록을 불러오는 데 실패했습니다.');
        }
    }
}

module.exports = AccommoService;
