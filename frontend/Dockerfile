# Stage 1: Build Vite app

FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve built files using a lightweight Express server
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY server.js .

RUN npm install express

EXPOSE 80

CMD ["node", "server.js"]
