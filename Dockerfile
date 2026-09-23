# Stage 1: Build the Vite application
FROM node:22-alpine AS build

# Create application directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the project source code
COPY . .

# Build the Vite application
RUN npm run build


# Stage 2: Serve the application
FROM nginx:alpine

# Copy the Vite production build to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx uses port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]