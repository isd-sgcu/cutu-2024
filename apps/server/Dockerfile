FROM node:20.12.0-alpine3.19 AS builder

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:20.12.0-alpine3.19 AS runner

WORKDIR /app

COPY --from=builder /build/dist/ ./dist/
COPY package*.json ./
RUN npm install --omit=dev

EXPOSE 3000

CMD [ "npm", "start" ]
