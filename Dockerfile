# https://hub.docker.com/_/node
FROM node:15-slim

# set default environment variables
ENV NAME John Wick
ENV AGE 40
ENV REDIS_URL 127.0.0.1
ENV REDIS_PASSWD VerySecure

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package.json ./
COPY package-lock.json ./

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN npm ci --only=production

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "node", "index.js" ]
