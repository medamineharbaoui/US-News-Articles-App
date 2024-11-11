# Stage 1: Build the React app
FROM node:20 AS build

WORKDIR /usr/src/app

# Install dependencies and build the app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy build files from the build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html


EXPOSE 3000

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
