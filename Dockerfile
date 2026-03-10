# Frontend Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173
EXPOSE 5174

# We use --host so Vite binds to 0.0.0.0 (required inside Docker)
CMD ["npm", "run", "dev", "--", "--host"]
