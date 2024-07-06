FROM node:16-bullseye

# Instalar dependencias del sistema
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp \
  software-properties-common && \
  add-apt-repository ppa:deadsnakes/ppa && \
  apt-get update && \
  apt-get install -y \
  python3.8 \
  python3-pip && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

# Crear alias para que python3 sea la versión predeterminada de python
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1

COPY package.json .

RUN npm install && npm install qrcode-terminal

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

