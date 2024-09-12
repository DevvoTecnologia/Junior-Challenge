FROM node:18-alpine AS builder

WORKDIR /app
COPY .env.example .env
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
FROM node:18-alpine

WORKDIR /app/src
RUN apk add --no-cache postgresql-client

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env .env

EXPOSE 3000
CMD ["npm", "start"]
