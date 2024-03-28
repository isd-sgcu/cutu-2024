FROM node:20.12.0-bookworm AS builder

WORKDIR /build

COPY package*.json ./

RUN npm install --omit=dev && npm install -g typescript

COPY . ./

RUN npm run build

FROM node:20.12.0-bookworm AS runner

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules/
COPY --from=builder /build/dist/ ./dist/
COPY package*.json ./

EXPOSE 3000

CMD [ "npm", "start" ]
