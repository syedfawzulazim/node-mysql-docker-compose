FROM node:16.11-alpine3.14 as builder

SHELL ["/bin/ash", "-o", "pipefail", "-c"]
RUN apk update && apk add curl=7.79.1-r1 --no-cache && curl -sf https://gobinaries.com/tj/node-prune | /bin/ash -s -- -b /usr/local/bin

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

RUN yarn build && yarn install --frozen-lockfile --production=true && yarn cache clean

#starting a new image
FROM node:16.11-alpine3.14

WORKDIR /usr/src/app

#copy from builder image
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/index.ts ./src/index.ts
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["node", "./dist/index.js"]
