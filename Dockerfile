# Use Node.js v19
FROM node:19

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN mkdir -p /app/prisma
COPY .env /app/

# Copy the Prisma schema file and the migrations folder into the container
COPY ./prisma/schema.prisma /app/prisma/
COPY ./prisma/migrations /app/prisma/migrations

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build your Next.js application
RUN npm run build

RUN npx prisma migrate dev --name init

# Expose the port your Next.js app is running on
EXPOSE 3000

# Start your Next.js app
CMD ["npm", "start"]
