const { sendQrCodetoDiscord } = require('./utils/SendQR.js')
const { Controller } = require('./utils/StagesUtils.js')
const { getUsersNotUpdatedIn30Minutes, updateUserStatus } = require('./utils/DatabaseUtils.js')
const cron = require('node-cron');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
		args: ['--no-sandbox'],
	}
});

client.on('qr', async qr => {
    console.log('QR CODE:', qr);
    sendQrCodetoDiscord(qr)
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    const resultMessage = await Controller(msg);
    if(resultMessage != null){
        client.sendMessage(msg.from, resultMessage)
    }
})

client.initialize();

// Agenda a tarefa para ser executada a cada 30 minutos
cron.schedule('*/30 * * * *', async () => {
    console.log('Executando a verificação de usuários sem atualizações nos últimos 30 minutos.');
    try {
        // Obter usuários que não foram atualizados nos últimos 30 minutos
        const users = await getUsersNotUpdatedIn30Minutes();

        // Iterar sobre cada usuário e atualizar seu status para null
        for (const user of users) {
            await updateUserStatus(user.user_number, null);
        }

        console.log(`${users.length} usuários tiveram seus status atualizados para null.`);
    } catch (err) {
        console.error('Erro ao atualizar os status dos usuários:', err);
    }
});