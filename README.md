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

### Opción A: Por Netlify CLI (Recomendado)
Esta opción es más rápida si ya tienes el proyecto en tu computadora.
1. **Loguearte en Netlify:**
    ```bash
    npx netlify login
2. **Despliegue Final:**
Ejecuta el comando para subir archivos y funciones al mismo tiempo:
    ```bash
    npx netlify deploy --prod --dir=. --functions=netlify/functions

### Opción B: Interfaz Gráfica (Panel Web)
1. Ve a [Netlify](https://app.netlify.com/) y dale a **"Add new site"** > **"Import an existing project"**.
2. Conecta tu cuenta de **GitHub** y selecciona este repositorio.
3. En la configuración de despliegue:
    * **Build command:** (Dejar vacío).
    * **Publish directory:** `.` (punto).
    * **Functions directory:** `netlify/functions`.
4. Haz clic en **"Deploy site"**.

## 🔐 Paso 3: Configuración de Tokens (OBLIGATORIO)
Sin este paso, no recibirás mensajes. Debes cargar tus credenciales en el panel de Netlify:
1. En Netlify, ve a **Site Configuration** > **Environment variables**.
2. Añade las siguientes variables:
    * `TELEGRAM_TOKEN`: El token que te dio @BotFather.
    * `TELEGRAM_CHAT_ID`: Tu ID (puedes obtenerlo con @userinfobot).

## 📂 Estructura del Proyecto
* `index.html`: Contiene el "spinner" de carga, la lógica de detección de 3 escenarios y el sistema de ofuscación.
* `netlify/functions/logger.js`: El cerebro que procesa la IP, el ISP, la RAM y envía el mensaje a Telegram.
* `netlify.toml`: Archivo de configuración que asegura que las funciones se empaqueten correctamente.
* `package.json`: Lista de librerías necesarias (`axios`).

## ⚠️ Advertencia
Este proyecto es exclusivamente para uso académico y pruebas de penetración autorizadas. El uso de estas herramientas para actividades maliciosas es responsabilidad total del usuario.

### ¿Cómo crear el archivo `.env` correctamente?
Como mencionas que el proyecto debe funcionar bien al clonarlo, recuerda esto:
* **En local:** El archivo `.env` sirve para que el código reconozca las llaves mientras programas.
* **En GitHub:** El archivo `.env` **NUNCA** se sube. El archivo `.gitignore` que creamos anteriormente se encargará de que GitHub lo ignore por seguridad.