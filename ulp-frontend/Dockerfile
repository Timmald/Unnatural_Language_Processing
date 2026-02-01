FROM node:lts-trixie-slim
RUN mkdir app
COPY ./ ./app/
RUN ls ./app/src/
WORKDIR ./app
RUN npm install
CMD npm run dev
