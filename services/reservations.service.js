const ReservationsRepository = require('../repositories/reservations.repository')

class ReservationsService{
    reservationsRepository = new ReservationsRepository()

//예약 등록 작성 하기
createReservations = async(accId, memberId, personNum) => {

    const findaccId = await this.reservationsRepository.findaccId(accId)

    //try{
        if (!findaccId) {
            return {'message': '예약 가능한 숙소가 없습니다.'};
        }

        if (personNum === '') {
            return {'message': '예약인원을 확인해주세요.'};
        }

        await this.reservationsRepository.createReservations( 
            accId,
            memberId, 
            personNum
        )
        return '숙소 예약이 되었습니다.'
    // }catch{
    //     const error = new Error(`숙소예약에 실패했습니다.`)
    //     error.statusCode = 500
    //     throw error
    // }
    }

//예약 목록 보기
findAllReservations = async (memberId) => {
    //try{
        const findlist = await this.reservationsRepository.findAllReservations(memberId)
            return findlist
            // {
            //     resId: getlist.resId,
            //     accId: getlist.accId,
            //     memberId: getlist.memberId,
            //     personNum: getlist.personNum,
            //     resCheckin: getlist.resCheckin,
            //     resCheckOut: getlist.resCheckOut,
            //     createdAt: getlist.createdAt,
            //     updatedAt: getlist.updatedAt,
            //     deletedAt: getlist.deletedAt
            // }
        //}
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
    // } catch (err) {
    //     err = new Error(`예약 상세 보기 실패했습니다.`);
    //     err.statusCode = 500;
    //     throw err;
    // }
}
//예약 내역 수정
updateReservations = async (accId, memberId, personNum) => {
    const updateReser = await this.reservationsRepository.updateReservations(accId)
    //try{
        //수정할 예약내역이 없을 때
        if(updateReser === null){
            return{'message' : '수정 가능한 예약 내역이 없습니다.'}
        }

        //예약 수정하려는 memberId와 예약 등록한 memberId가 다를 때
        // if (memberId !== updateReser.dataValues.memberId){
        //     return{'meassage' : '예약내역 수정 권한이 없습니다.'}
        // }

        await this.reservationsRepository.updateReservations(accId, memberId, personNum)
        return {'message' : '예약 내역이 수정되었습니다.'}

    // } catch (err) {
    //     err = new Error(`예약 내역 수정에 실패했습니다.`);
    //     err.statusCode = 500;
    //     throw err;
    // }    
}

//예약 내역 삭제
deleteReservations = async (accId, memberId) => {
    const updateReser = await this.reservationsRepository.updateReservations(accId)
    //try{
        //삭제할 예약 내역이 없을 때
        if(updateReser === null){
            return {'message' : '삭제 가능한 예약 내역이 없습니다.'}
        }

        //예약 삭제하려는 memberId와 예약 등록한 memberId가 다를 때
        // if(memberId !== updateReser.dataValues.memberId){
        //     return {'message' : '예약내역을 삭제할 권한이 없습니다.'}
        // }

        await this.reservationsRepository.deleteReservations(accId,memberId)
        return {'message' : '예약 내역이 삭제되었습니다.'}
    // } catch (err) {
    //     err = new Error(`예약 내역 삭제에 실패했습니다.`);
    //     err.statusCode = 500;
    //     throw err;
    // }     
}
}

module.exports = ReservationsService