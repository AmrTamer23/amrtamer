FROM node:lts-alpine AS runtime
WORKDIR /app

COPY . .

RUN npm i -g pnpm

RUN pnpm install
RUN pnpm run build

EXPOSE 4321
CMD node ./dist/server/entry.mjs