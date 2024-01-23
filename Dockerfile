# Use the official Node.js base image
FROM node:14

# Install Meteor
RUN curl https://install.meteor.com/ | sh

# Set the working directory inside the container
WORKDIR /app

# Copy the application source code to the container
COPY . /app

# Create a non-root user
RUN useradd -ms /bin/bash meteoruser

# Set ownership of the app directory to the non-root user
RUN chown -R meteoruser:meteoruser /app

# Switch to the non-root user
USER meteoruser

# Install dependencies
RUN npm install

# Expose the port your Meteor app is running on
EXPOSE 3000

# Start the Meteor app
CMD ["meteor", "run"]