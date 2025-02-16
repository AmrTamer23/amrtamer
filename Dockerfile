# Use the official Node.js 22 image as a base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the project
RUN pnpm run build

# Expose the port that the app runs on
EXPOSE 4321

# Command to run the application
CMD ["pnpm", "start"]