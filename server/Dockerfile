# Use an official Node runtime as the base image
FROM node:20-alpine

# Set the working directory in the container to /server
WORKDIR /server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /server
COPY . .

# Run the build step
RUN npm run build

# Make port 3333 available to the world outside this container
EXPOSE 3333

# Run the app when the container launches
CMD ["npm", "start"]
