const { Accommodations } = require('../models');
const AccommoRepository = require('../repositories/accommodations.repository');
const MembersRepository = require('../repositories/members.repository');
const ReviewsRepository = require('../repositories/reviews.repository');

class AccommoService {
    accommoRepository = new AccommoRepository();
    membersRepository = new MembersRepository();
    reviewsRepository = new ReviewsRepository();

    hostAccommodation = async (
        filesData,
        memberId,
        accName,
        accAddr,
        description,
        price,
        maxPerson,
        bed,
        room,
        bathroom,
        facilities
    ) => {
        

        const accImg = filesData.map((data) => {
            let result = [];
                
            result= data.location
                
            return result;
        })
            
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
        });

    
        
        const hostedAccommo = await this.accommoRepository.saveAccommodation(
            option, accImg
        );
        // const hostedAccommo = await this.accommoRepository.saveAccommodation(
        //     option
        // );

        if (hostedAccommo) {
            return hostedAccommo;
        } else {
            throw new Error('숙소 호스트에 실패했습니다.');
        }
    };

    getAllAccommodations = async () => {
        const accommoList = await this.accommoRepository.getAllAccommodations();

        if (accommoList) {
            return accommoList;
        } else {
            throw new Error('숙소 목록을 불러오는 데 실패했습니다.');
        }
    };

    getAccommoDetails = async (accId) => {
        
        const accommoDetails = await this.accommoRepository.getAccommoDetails(
            accId
        );
        const accommoHost = await this.membersRepository.getMemberById(accommoDetails.memberId);
        const accommoReviews = await this.reviewsRepository.getReview(accId);

        if (accommoDetails) {
            return {accommoInfo: accommoDetails, hostInfo: accommoHost, accommoReviews: accommoReviews};
        } else {
            throw new Error('숙소 상세조회를 불러오는 데 실패했습니다.');
        }
    };
    
    updateAccommo = async (
            fileData,
            memberId,
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
        
    ) => {

        const existAccommo = await this.accommoRepository.getAccommoDetails(accId)

        if (existAccommo.memberId !== memberId) { throw new Error ('수정 권한이 없습니다')}

        const accImg = fileData.map((data) => {
            let result = [];
                
            result = data.location
                
            return result;
        })

        const updatedAccommo = await this.accommoRepository.updateAccommo(
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
        );
        
        
        if (updatedAccommo) {
            return '숙소 정보를 수정했습니다.';
        } else {
            throw new Error('숙소 정보를 수정하는 데 실패했습니다.')
        }
    };

    deleteAccommo = async (memberId, accId) => {
        
        const option = { where: { accId } };

        const existAccommo = await this.accommoRepository.getAccommoDetails(accId)
        
        if (existAccommo.memberId !== memberId) { throw new Error ('삭제 권한이 없습니다')}

        const deletedAccommo = await this.accommoRepository.deleteAccommo(
            option
        );

        if (deletedAccommo) {
            return '숙소를 삭제했습니다.';
        } else {
            throw new Error('숙소를 삭제하는 데 실패했습니다.');
        }
    };
}

module.exports = AccommoService;
