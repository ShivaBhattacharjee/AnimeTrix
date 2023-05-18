# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app files
COPY . .

# Start the React app
CMD npm start

# Expose the port
EXPOSE 3000
