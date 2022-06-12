FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


#starting a new image
FROM node:alpine
WORKDIR /usr/src/app

#copy from builder image
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["node", "./dist/index.js"]
