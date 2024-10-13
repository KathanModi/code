# Use Node.js image
FROM node:14

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port 5000 for the backend API
EXPOSE 5000

# Command to run when the container starts
CMD ["node", "app.js"]
