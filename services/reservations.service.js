const ReservationsRepository = require('../repositories/reservations.repository')

class ReservationsService{
    reservationsRepository = new ReservationsRepository()

//예약 등록 작성 하기
createReservations = async(accId, memberId, personNum) => {

    const findaccId = await this.reservationsRepository.findaccId(accId)

        if (!findaccId) {
            return {'message': '예약 가능한 숙소가 없습니다.'}
        }

        if (personNum === '') {
            return {'message': '예약인원을 확인해주세요.'}
        } 

        await this.reservationsRepository.createReservations( 
            accId,
            memberId, 
            personNum
        )
        return {'message' : '숙소 예약이 되었습니다.'}
    }

//예약 목록 보기
findAllReservations = async (memberId) => {
    try{
        const findlist = await this.reservationsRepository.findAllReservations(memberId)
            return findlist
            } catch (err) {
        err = new Error(`예약 내역 목록 조회를 실패했습니다.`);
        err.statusCode = 500;
        throw err;
    }
}

//예약 상세 보기 

findReservationsId = async (accId) => {
    try{
        const findId = await this.reservationsRepository.findReservationsId(accId)

            return findId.map((reserlist) => {
                 return {
                 resId: reserlist.resId,
                 accId: reserlist.accId,
                 memberId: reserlist.memberId,
                 personNum: reserlist.personNum,
                 resCheckin: reserlist.resCheckin,
                 resCheckOut: reserlist.resCheckOut,
                 createdAt: reserlist.createdAt,
                 updatedAt: reserlist.updatedAt,
                 deletedAt: reserlist.deletedAt
            }
        })
    } catch (err) {
        err = new Error(`예약 내역이 존재하지 않습니다.`);
        err.statusCode = 500;
        throw err;
    }
}
//예약 내역 수정
updateReservations = async (resId, memberId, personNum) => {
    const findReserResId = await this.reservationsRepository.findReserResId(resId)

        //수정할 예약내역이 없을 때
        if(findReserResId === null){
            return {'message' : '수정 가능한 예약 내역이 없습니다.'}
        }

        if (personNum === '') {
            return {'message': '예약인원을 확인해주세요.'};
        }

        //resId의 memberId와 로그인한 memberId가 다를 때
        if(findReserResId.memberId !== memberId){
            return {'message' : '예약 내역 수정 권한이 없습니다.'}
        }

        await this.reservationsRepository.updateReservations(resId, memberId, personNum)
        return {'message' : '예약 내역이 수정되었습니다.'}
}


//예약 내역 삭제
deleteReservations = async (resId, memberId) => {
    const findReserResId = await this.reservationsRepository.findReserResId(resId)

        //삭제할 예약 내역이 없을 때
        if(findReserResId === null){
            return {'message' : '삭제 가능한 예약 내역이 없습니다.'}
        }

        //resId의 memberId와 로그인한 memberId가 다를 때
        if(findReserResId.memberId !== memberId){
             return {'message' : '예약 내역 삭제 권한이 없습니다.'}
        }

        await this.reservationsRepository.deleteReservations(resId,memberId)
        return {'message' : '예약 내역이 삭제되었습니다.'}   
}
}

module.exports = ReservationsService