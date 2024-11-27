# Stage 1: Build the application
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

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



# Stage 2: Run the application
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the installed dependencies and application code from the build stage
COPY --from=builder /usr/src/app /usr/src/app

# Expose the ports the application will run on
EXPOSE 30015
EXPOSE 30105
EXPOSE 8080

# Command to start the application
CMD ["npm", "run", "dev"]