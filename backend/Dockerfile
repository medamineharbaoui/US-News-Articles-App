FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

COPY . . 

# Expose port 5000 for the backend API
EXPOSE 5000

# Start the backend API
CMD ["npm", "start"]
