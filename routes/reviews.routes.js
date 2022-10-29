const { Reservations } = require('../models')

class ReservationsRepository {

//예약 등록 하기
createReservations = async(resId, accId, memberId, personNum, resCheckin, resCheckOut,createdAt, updatedAt, deletedAt) => {
    //try{
        const createData = await Reservations.create({
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
        return createData
    // }catch{
    //     const error = new Error(`서버 실행 중 오류가 발생했습니다.`)
    //     error.statusCode = 500
    //     throw error
    // }
    }
}

module.exports = ReservationsRepository