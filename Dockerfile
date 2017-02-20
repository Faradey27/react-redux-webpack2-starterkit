FROM node:boron

# Make ssh dir
RUN mkdir /root/.ssh/

# Copy over private key, and set permissions
ADD id_rsa /root/.ssh/id_rsa

# Create known_hosts
RUN touch /root/.ssh/known_hosts
# Add bitbuckets key
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

# Create app directory
RUN mkdir -p /usr/src/react-redux-webpack2-starterkit
WORKDIR /usr/src/react-redux-webpack2-starterkit

# Install app dependencies
COPY package.json /usr/src/react-redux-webpack2-starterkit/
RUN npm install

# Bundle app source
COPY . /usr/src/react-redux-webpack2-starterkit

EXPOSE 3001

CMD [ "npm", "run", "testserver" ]
