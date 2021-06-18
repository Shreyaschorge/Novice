FROM ubuntu:20.04
USER root
RUN apt update

RUN apt update
RUN apt install -y curl
RUN apt install -y nano
RUN cd ~
RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install nodejs
RUN node --version
RUN npm --version
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]