const axios = require('axios');
const FormData = require('form-data');
const qrcode = require('qrcode');
const fs = require('fs');
require('dotenv').config();

const sendQrCodetoDiscord = async(qr) => {
    try {
        // Gera o QR Code em formato data URL
        const qrImage = await qrcode.toDataURL(qr);

        // Define o caminho do arquivo
        const filePath = './qr.png';

        // Salva o QR Code como um arquivo .png
        fs.writeFileSync(filePath, qrImage.replace(/^data:image\/png;base64,/, ''), 'base64');

        // Prepara o FormData com o arquivo
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        // Configura os cabeçalhos da requisição
        const config = {
            headers: {
                ...formData.getHeaders()
            }
        };

        // Envia o arquivo para o webhook do Discord
        await axios.post(process.env.WEBHOOK_DISCORD, formData, config);
        console.log('QR Code enviado com sucesso.');

        // Opcional: remover o arquivo após o envio
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Erro ao gerar ou enviar o QR Code:', error);
    }
}

module.exports = { sendQrCodetoDiscord }