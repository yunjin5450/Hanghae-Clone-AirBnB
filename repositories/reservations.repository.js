const { Reservations, Accommodations } = require('../models')

class ReservationsRepository {

//예약 등록 작성 하기
createReservations = async(accId, memberId, personNum) => {
    try{
        const createData = await Reservations.create({
            accId,
            memberId, 
            personNum
        })
        return createData
    }catch{
        const error = new Error(`서버 실행 중 오류가 발생했습니다.`)
        error.statusCode = 500
        throw error
    }
    }

//Accommodations에서 accId 찾기
findaccId = async (accId) => { 
    const findaccId = await Accommodations.findOne({where: {accId}});

    return findaccId;
};

//예약 목록 보기
findAllReservations = async (memberId) => {
    try{
        const getReservations = await Reservations.findAll({
            where: { memberId },
            order : [['createdAt', 'DESC']]
            })
        return getReservations
    }catch{
        const error = new Error(`서버 실행 중 오류가 발생했습니다.`)
        error.statusCode = 500
        throw error
    }
}

//Reservations에서 resId 찾기
findReserResId = async (resId) => {
    const findReserResId = await Reservations.findOne({where: {resId}})
    return findReserResId
}

//예약 상세 보기 
findReservationsId = async (accId) => {
    try{
        const getReservations = await Reservations.findAll(
            {
                where : {accId}
            })
        return getReservations
    }catch{
        const error = new Error(`서버 실행 중 오류가 발생했습니다.`)
        error.statusCode = 500
        throw error
    }
}

//예약 내역 수정
updateReservations = async (resId, memberId, personNum) => {
    const updateReservations = await Reservations.update(
        {personNum}, {where : {resId, memberId}}
        )
    return updateReservations
}

//예약 내역 삭제
deleteReservations = async (resId, memberId) => {
    const deleteReservations = await Reservations.destroy(
        {where : {resId, memberId}}
        )
    return deleteReservations
}


}

module.exports = ReservationsRepository