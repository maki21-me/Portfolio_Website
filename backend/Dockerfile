FROM node:18

# install mysql server
RUN apt-get update && apt-get install -y mysql-server

# create app directory
WORKDIR /app

# copy package files
COPY package*.json ./

RUN npm install

# copy project
COPY . .

# expose port
EXPOSE 10000

# start mysql and node
CMD service mysql start && npm start
