FROM node:8 AS back-builder

WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build-ts

FROM node:8

WORKDIR /usr/src/app


COPY --from=back-builder /usr/src/app/node_modules ./node_modules
COPY --from=back-builder /usr/src/app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/index.js"]