const ReservationsService = require('../services/reservations.service')

class ReservationsController {
    reservationsService = new ReservationsService()

//예약 목록 보기
findAllReservations = async (req, res, next) =>{
    //try{
        const { memberId } = req.params
        const findlist = await reservationsService.findAllReservations(memberId)
        res.status(200).json({data: findlist})
    // }catch{
    //     const error = new Error(`예약 목록이 존재하지 않습니다.`)
    //     error.statusCode = 500
    //     throw error
    // }
}

//예약 상세 보기 
findReservationsId = async (req, res, next) =>{
    //try{
        const { accId } = req.params
        const findId = await this.reservationsService.findReservationsId(accId)
        res.status(200).json({data: findId})
    // }catch{
    //     const error = new Error(`예약 정보가 존재하지 않습니다.`)
    //     error.statusCode = 500
    //     throw error
    // }
}

//예약 등록 작성 하기
createReservations = async(req, res, next) => {
    //try{
        const { accId } = req.params;
        const { personNum } = req.body;
        const { memberId } = res.locals.users;
        

        await this.reservationsService.createReservations( 
            accId,
            personNum,
            memberId
        )
        const createReservations = await this.createReservations.findAllReservations()
        res.status(200).json({data : createReservations})
    // }catch{
    //     const error = new Error(`예약 등록 작성이 존재하지 않습니다.`)
    //     error.statusCode = 500
    //     throw error
    // }
}







}
module.exports = ReservationsController