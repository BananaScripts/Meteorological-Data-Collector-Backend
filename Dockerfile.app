# Stage 1: Build the application
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /seth-backend

# Install net-tools for arp command
RUN apt-get update && apt-get install -y net-tools

# Copy the .gitmodules and .git directory to the container
COPY .gitmodules ./
COPY .git ./.git

# Initialize the submodule and switch to the development branch
RUN git submodule init && \
    git submodule update && \
    cd db && \
    git checkout Development && \
    cd ..

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install Prisma dependencies separately
RUN npm install @prisma/client prisma

# Install the remaining dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the Prisma schema file
COPY db/src/prisma/schema.prisma prisma/schema.prisma

# Generate Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma

# Compile TypeScript code
RUN npm run build

# Stage 2: Run the application
FROM node:18

# Set the working directory in the container
WORKDIR /seth-backend

# Install net-tools for arp command
RUN apt-get update && apt-get install -y net-tools

# Copy the built application from the builder stage
COPY --from=builder /seth-backend /seth-backend

# Set the PORT environment variable
ENV PORT=8080

# Command to start the application
CMD ["npm", "run", "dev:Controller"]