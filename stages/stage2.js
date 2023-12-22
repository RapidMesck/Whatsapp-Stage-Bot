const { updateUserStatus } = require('../utils/DatabaseUtils.js')

const result = async(user, msg) => {
    if(msg.body == '1'){
        return "Esse e a resposta do numero 1 no stagio 2"
    }
    if(msg.body == '2'){
        await updateUserStatus(user, '1')
        return "Voce foi tranferido para o stagio 1"
    }
}

module.exports = result