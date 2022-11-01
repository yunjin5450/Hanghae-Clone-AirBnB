const ReservationsService = require('../services/reservations.service')

class ReservationsController {
    reservationsService = new ReservationsService()

//예약 등록 작성 하기
createReservations = async(req, res, next) => {
    //try{
        const { accId } = req.params
        const { memberId } = res.locals.user
        const { personNum } = req.body
        
        const createReservations = await this.reservationsService.createReservations( 
            accId,
            memberId,
            personNum,
        )
        res.status(200).json(createReservations)
        // } catch(error) {
        // res.status(400).json({error: error.message})
        // }
    }

//예약 목록 보기
findAllReservations = async (req, res, next) =>{
    //try{
        const { memberId } = req.params
        const findlist = await this.reservationsService.findAllReservations(memberId)
        res.status(200).json({data: findlist})
        // } catch(error) {
        // res.status(400).json({error: error.message})
        // }
}

//예약 상세 보기 
findReservationsId = async (req, res, next) =>{
    //try{
        const { accId } = req.params
        const findId = await this.reservationsService.findReservationsId(accId)
        res.status(200).json({data: findId})
        // } catch(error) {
        // res.status(400).json({error: error.message})
        // }
}

//예약 내역 수정
updateReservations = async (req, res, next) => {
    //try{
        const {accId} = req.params;
        const {memberId} = res.locals.user;
        const {personNum} = req.body;

        const updateReser = await this.reservationsService.updateReservations(accId, memberId, personNum)
        res.status(200).json(updateReser)

    // } catch(error) {
    // res.status(400).json({error: error.message})
    // }   
}

//예약 내역 삭제
deleteReservations = async (req, res, next) => {
    //try
        const {accId} = req.params;
        const {memberId} = res.locals.user

        const deleteReservations = await this.reservationsService.deleteReservations(accId, memberId)
        res.status(200).json(deleteReservations)
    // } catch(error) {
    // res.status(400).json({error: error.message})
    // }   
}






}
module.exports = ReservationsController