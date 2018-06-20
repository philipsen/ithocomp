FROM node:8

# Create app directory
WORKDIR /app

# Install app dependencies
RUN npm install -g nodemon

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . ./app

ENV PORT 8080
EXPOSE 8080

CMD [ "npm", "start" ]