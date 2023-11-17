# Utiliza una imagen base de Node.js
FROM node:20.7.0

# Crea un directorio de trabajo en el contenedor
WORKDIR src

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos de tu proyecto al contenedor
COPY . .

# Asegúrate de que el archivo de credenciales de Firebase esté incluido
COPY src/greenmint-firebase-adminsdk.json ./greenmint-firebase-adminsdk.json
# Expone el puerto que utiliza tu aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
