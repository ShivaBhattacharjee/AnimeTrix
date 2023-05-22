# Base image
FROM node:18.14.1-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app files
COPY . .

# Start the Node.js app
CMD npm start

# Expose the port
EXPOSE 3000
