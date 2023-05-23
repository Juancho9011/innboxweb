# Obtén la imagen base de Node.js
FROM node:14-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y el archivo package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación de React en una versión optimizada para producción
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
