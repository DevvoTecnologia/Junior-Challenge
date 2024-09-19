# Use an official Node runtime as the base image
FROM node:20-alpine

# Set the working directory in the container to /client
WORKDIR /client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /client
COPY . .

# Run the build step
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# 1. Runs migrations with the data source
# 2. Run the app when the container launches
CMD ["npm", "run", "start"]