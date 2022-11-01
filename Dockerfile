FROM node:lts-alpine3.15 as BUILDER
#RUN nmp install -g http-server
WORKDIR /src
COPY package*.json ./
COPY package-lock*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "run", "build"]
#ENTRYPOINT [ "executable" ]