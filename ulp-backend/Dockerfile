FROM node:lts-alpine
RUN mkdir app
WORKDIR app
#COPY Voice_Files/* ./Voice_Files/
COPY package.json .
COPY index.js .
COPY ffmpegStuff.js .
RUN npm install
RUN apk add ffmpeg
CMD node index.js

