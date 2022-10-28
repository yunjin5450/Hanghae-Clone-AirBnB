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
        const { userEmail } = req.body;

        try{

            const duplicatedEmailData = await this.membersService.duplicatedEmail(userEmail);
            res.status(200).send(duplicatedEmailData);

        }catch(error){

            res.status(400).json({error: error.message})

        }
    };

    duplicatedNickname = async(req, res, next)=> {
        const {name ,nickname} = req.body;
        try{
            const duplicatedNicknameData = await this.membersService.duplicatedNickname(name ,nickname);
            res.status(201).send(duplicatedNicknameData);
        }catch(error){
            res.status(400).json({error: error.message})
        };
    };

    login = async(req, res, next)=> {
        const { authorization } = req.headers;
        const { userEmail, password } = req.body;  
        try{
            const loginData = await this.membersService.login(authorization, userEmail, password);
            res.header('Authorization',loginData.token)
            res.status(200).json({userEmail: loginData.userEmail, nickname: loginData.nickname, message: loginData.message})
        }catch(error){
            res.status(400).json({error: error.message})
        };
    };

    getUserPage = async(req, res, next)=> {
        const {userEmail} = req.params
        try{
            const getUserPageData = await this.membersService.getUserPage(userEmail);
            res.status(201).send(getUserPageData);
        }catch(error){
            res.status(401).json({error: error.message});
        };
    };

    updateUser = async(req, res, next)=> {
        const {userEmail} = req.params
        const {name ,nickname, statusText} = req.body;
        try{
            const updateUserData = await this.membersService.updateUser(userEmail, name ,nickname, statusText);
            res.status(201).send(updateUserData);
        }catch(error){
            res.status(401).json({error: error.message});
        };
    };
};

module.exports = MembersController;