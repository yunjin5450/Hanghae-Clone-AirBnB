const MembersService = require('../services/members.service')

class MembersController {
    membersService = new MembersService();


    createMember = async(req, res, next) => {
        const { authorization } = req.headers;
        const { memberEmail, password, nickname, name, gender, phoneNum } = req.body;
        const fileData = req.file

        try{

            const createMemberData = await this.membersService.createMember(authorization, fileData, memberEmail, password, nickname, name, gender, phoneNum);
            
            res.status(201).send(createMemberData);
            
        } catch(error) {

            res.status(400).json({error: error.message})
        }
    };

    duplicatedEmail = async(req, res, next)=> {
        const { memberEmail } = req.body;

        try{

            const duplicatedEmailResult = await this.membersService.duplicatedEmail(memberEmail);
            res.status(200).send(duplicatedEmailResult);

        }catch(error){

            res.status(400).json({error: error.message})

        }
    };

    duplicatedNickname = async(req, res, next)=> {
        const { nickname } = req.body;
        try{
            const duplicatedNicknameData = await this.membersService.duplicatedNickname(nickname);
            res.status(201).send(duplicatedNicknameData);
        }catch(error){
            res.status(400).json({error: error.message})
        };
    };

    loginUser = async(req, res, next)=> {
        const { authorization } = req.headers;
        const { memberEmail, password } = req.body;  

        try{
            const loginData = await this.membersService.loginUser(authorization, memberEmail, password);
            res.header('Authorization',loginData.token)
            res.status(200).json({memberEmail: loginData.memberEmail, name:loginData.name, nickname: loginData.nickname, message: loginData.message})

        }catch(error){

            res.status(400).json({error: error.message})
        };
    };

    getMyProfile = async(req, res, next)=> {

        const { memberId } = res.locals.user

        try {

            const getMyProfileResult = await this.membersService.getMyProfile(memberId);

            res.status(200).send(getMyProfileResult);

        } catch (error){

            res.status(401).json({error: error.message});
        };
    };

    getMemberProfie = async(req, res, next) => {

        const { memberId } = req.params

        try {

            const getMemberProfile = await this.membersService.getMemberProfie(memberId);

            res.status(200).send(getMemberProfile)

        } catch (error) {

            res.status(401).json({error: error.message})
        }


    }

    updateMember = async(req, res, next)=> {
        
        const {memberId} = req.params
        const {name ,nickname, gender, phoneNum} = req.body;
        try {

            const updateMemberData = await this.membersService.updateMember(memberId, name ,nickname, gender, phoneNum);
            res.status(201).send(updateMemberData);

        } catch(error) {

            res.status(401).json({error: error.message});

        };
    };
};

module.exports = MembersController;