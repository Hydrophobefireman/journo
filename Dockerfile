# Use an official Node.js runtime as the base image
FROM node:20-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY frontend/package*.json ./

# Install Node.js dependencies
RUN npm install --legacy-peer-deps

# Copy the source code
COPY frontend /app
COPY frontend/.env .env

# Build the application
RUN npm run build

# Use a minimal Caddy image as the base image
FROM caddy:2.6.4-alpine as caddy


FROM python:3.11-slim-bullseye

# Set the working directory to /site
WORKDIR /site

# Copy the built files from the previous stage
COPY --from=builder /app/build .
COPY --from=caddy /usr/bin/caddy /usr/bin/caddy



# Install ffmpeg
RUN apt-get update && apt-get install -y libpq-dev gcc python3-dev # Install libpq-dev for pg_config
RUN pip install -U pip wheel

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app

COPY backend/ /app
COPY ./run.sh /run.sh
COPY ./Caddyfile /Caddyfile
EXPOSE 80
EXPOSE 4000
CMD ["bash","/run.sh"]
