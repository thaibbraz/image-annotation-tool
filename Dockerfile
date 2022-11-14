# Specify the parent image from which we build
FROM node:current-alpine


# Set the working directory
WORKDIR /app

# Copy files from your host to the current working directory
COPY package*.json ./

# Build the application 
RUN npm run install

# Copy all the files to the container
COPY . .

# Run the application
CMD ["npm", "start"]