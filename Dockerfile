FROM node:argon

# Create app directory
RUN npm install supervisor -g
RUN git clone --recursive https://github.com/Nek/todo-backend.git /usr/src/app
WORKDIR /usr/src/app
RUN npm install
WORKDIR /usr/src/app/todo-frontend
RUN npm install --verbose
RUN npm run-script build

WORKDIR /usr/src/app
EXPOSE 8080
CMD [ "npm", "start" ]