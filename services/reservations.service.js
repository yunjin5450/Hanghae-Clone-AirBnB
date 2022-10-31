const ReservationsRepository = require('../repositories/reservations.reponsitory')

class ReservationsService{
    reservationsRepository = new ReservationsRepository()

//예약 목록 보기
findAllReservations = async () => {
    //try{
        const findlist = await this.reservationsRepository.findAllReservations(memberId)
        findlist.map((getlist) => {
            return{
                resId: getlist.resId,
                accId: getlist.accId,
                memberId: getlist.memberId,
                personNum: getlist.personNum,
                resCheckin: getlist.resCheckin,
                resCheckOut: getlist.resCheckOut,
                createdAt: getlist.createdAt,
                updatedAt: getlist.updatedAt,
                deletedAt: getlist.deletedAt
            }
        })
    // }catch{
    //     const error = new Error(`예약 목록 불러오기 실패했습니다.`)
    //     error.statusCode = 500
    //     throw error
    // }
}

//예약 상세 보기 

findReservationsId = async (accId) => {
    //try{
        const findId = await this.reservationsRepository.findReservationsId(accId)
            return {
                 resId: findId.resId,
                 accId: findId.accId,
                 memberId: findId.memberId,
                 personNum: findId.personNum,
                 resCheckin: findId.resCheckin,
                 resCheckOut: findId.resCheckOut,
                 createdAt: findId.createdAt,
                 updatedAt: findId.updatedAt,
                 deletedAt: findId.deletedAt
            }
    // } catch (err) {
    //     err = new Error(`예약 상세 보기 실패했습니다.`);
    //     err.statusCode = 500;
    //     throw err;
    // }
}

//예약 등록 작성 하기
createReservations = async(resId, accId, memberId, personNum, resCheckin, resCheckOut,createdAt, updatedAt, deletedAt) => {
    //try{
        await this.reservationsRepository.createReservations({
            resId, 
            accId, 
            memberId, 
            personNum, 
            resCheckin, 
            resCheckOut,
            createdAt, 
            updatedAt, 
            deletedAt
        })
        return '숙소 예약이 되었습니다.'
    // }catch{
    //     const error = new Error(`숙소예약에 실패했습니다.`)
    //     error.statusCode = 500
    //     throw error
    // }
    }

}
module.exports = ReservationsService