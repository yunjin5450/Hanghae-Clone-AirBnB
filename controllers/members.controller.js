const MembersService = require('../services/members.service');
const NotificationsService = require('../services/notifications.service');

class MembersController {
    membersService = new MembersService();
    notificationsService = new NotificationsService();

    createMember = async(req, res, next) => {
        const { authorization } = req.headers;
        const { memberEmail, password, nickname, name, gender, phoneNum } = req.body;
        const fileData = req.file

        try{
            const createMemberData = await this.membersService.createMember(authorization, fileData, memberEmail, password, nickname, name, gender, phoneNum);

            const message = createMemberData.name + "님, 가입을 진심으로 축하드립니다!"

            await this.notificationsService.sendSignUpCongrats(createMemberData.memberId, message);
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
            res.status(200).send(duplicatedNicknameData);
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
            res.status(200).json({ loginData })

        }catch(error){

            res.status(400).json({error: error.message})
        };
    };

    loginInfo = async (req, res, next) => {
        const { memberId } = res.locals.user;

        const loginInfo = await this.membersService.loginInfo(memberId);
        res.status(200).json({data: loginInfo});
    };

    getMyProfile = async(req, res, next)=> {
        
        const { memberId } = res.locals.user
        
        try {

            const getMyProfileResult = await this.membersService.getMyProfile( memberId );

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
        
        const { memberId } = res.locals.user
        const { name ,nickname, password, gender, phoneNum } = req.body;
        const fileData = req.file
        try {

            await this.membersService.updateMember(fileData, memberId, name ,nickname, password, gender, phoneNum);
            res.status(201).json({message: "정보를 수정하였습니다"});

        } catch(error) {

            res.status(401).json({error: error.message});

        };
    };

    deleteMember = async(req, res, next) => {

        const { memberId } = res.locals.user;

        try {

            await this.membersService.deleteMember(memberId);
            res.status(200).json({message: "탈퇴 되었습니다"});

        } catch (error) {

            res.status(401).json({error: error.message})
        }
    }
};

module.exports = MembersController;