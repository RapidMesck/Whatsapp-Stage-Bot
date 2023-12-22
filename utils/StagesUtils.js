const { checkInsertedUser, updateUserStatus, getUserStatus, updateUserLastMessage } = require('../utils/DatabaseUtils.js')

const Controller = async(msg) => {
    try{
        const userId = msg.from;

        const checkUser = await checkInsertedUser(userId);

        if(!checkUser){
            insertUser(msg.from).then(async() => {
                await updateUserStatus(userId, '1');
                return "Ola, este e o atendimento automatico Digite\n 1 - para uma resposta\n4 - Para ser transferido para o stagio 2";
            })
        }else{
            await updateUserLastMessage(userId, msg.body);
            const userStage = await getUserStatus(userId);
            if(userStage == null){
                await updateUserStatus(userId, '1');
                return "Ola, este e o atendimento automatico Digite\n 1 - para uma resposta\n4 - Para ser transferido para o stagio 2";
            }else{
                let { result } = require(`../stages/stage${userStage}.js`);
                const respose = await result(userId, msg);
                return respose;
            }
        }
    }catch(err){
        console.error(err);
        return null
    }
}

module.exports = { Controller }