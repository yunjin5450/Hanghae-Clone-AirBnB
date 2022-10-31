const { Reservations } = require('../models')

class ReservationsRepository {

//예약 목록 보기
findAllReservations = async (memberId) => {
    //try{
        const getReservations = await Reservations.findAll({
            attributes: {exclude: [memberId]},
            order : [['createdAt', 'DESC']]
            })
        return getReservations
    // }catch{
    //     const error = new Error(`서버 실행 중 오류가 발생했습니다.`)
    //     error.statusCode = 500
    //     throw error
    // }
}

//예약 상세 보기 
findReservationsId = async (accId) => {
    //try{
        const getReservations = await Reservations.findByPk(accId)
        return getReservations
    // }catch{
    //     const error = new Error(`서버 실행 중 오류가 발생했습니다.`)
    //     error.statusCode = 500
    //     throw error
    // }
}

//예약 등록 작성 하기
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

//예약 내역 수정

//예약 내역 삭제


}

module.exports = ReservationsRepository