# base image
FROM node:18-alpine

# set workdir
WORKDIR /app

## copy files
COPY package.json package-lock.json ./

# install dependencies
RUN npm install

# set workdir
WORKDIR /app/frontend

# copy the frontend package.json for the frontend installation
COPY frontend/package.json frontend/package-lock.json ./

# install frontend dependencies
RUN npm install

# copy rest of frontend files to current workdir
COPY frontend ./

# move back to root working directory for further steps
WORKDIR /app

# copy rest of code
COPY . .

CMD ["npm", "start"]