# Use an official Node.js runtime as the base image
FROM node:20-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the source code
COPY . .
COPY .env .env

# Build the application
RUN npm run build

# Use a minimal Caddy image as the base image
FROM caddy:2.6.4-alpine

# Set the working directory to /site
WORKDIR /site

# Copy the built files from the previous stage
COPY --from=builder /app/build .

# Expose port 80
EXPOSE 80
COPY Caddyfile Caddyfile
# Start the Caddy server
CMD ["caddy", "file-server", "--root", "/site", "--listen", "0.0.0.0:80"]
