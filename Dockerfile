# base image
FROM node:16-alpine

# establish working directory
WORKDIR /app
RUN mkdir /app/ui

# copy package-lock and install dependencies
COPY ui/package.json ui/package-lock.json ./ui/
RUN npm ci --prefix ./ui ./ui

# copy and build application
COPY . .
RUN npm run build --prefix ./ui

# expose the relevant port
EXPOSE 3000


# serve
WORKDIR /app/ui
CMD ["npm", "start"]