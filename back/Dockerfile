# Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN npm run build
COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run dev"]
