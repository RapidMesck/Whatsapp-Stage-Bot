const { updateUserStatus } = require('../utils/DatabaseUtils.js')

const result = async(user, msg) => {
    if(msg.body == '1'){
        return "Esse e a resposta do numero 1"
    }
    if(msg.body == '4'){
        await updateUserStatus(user, '2')
        return "Voce foi tranferido para o stagio 2"
    }}

module.exports = { result }
