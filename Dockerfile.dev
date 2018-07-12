# This dockerfile uses multi-stage builds
# to build both nginx frontend and backend
# and orchestrate them to work in production
# as well as development

### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:8.1.4-alpine as builder
WORKDIR /temp
COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
# RUN npm i webpack@2.2.1 webpack-cli@2.0.9
RUN npm i && mkdir /app && cp -R ./node_modules ./app
# RUN npm i

WORKDIR /app
COPY . .
# RUN npm run build


### FINAL STAGE: Deploy ###
FROM node:8.1.4-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /app /usr/src/app
COPY . /usr/src/app

ENV NODE_ENV=production \
    MONGODB_URI=mongodb://moneysaveio-devops:moneysaveio-devops@ds145118.mlab.com:45118/moneysaveioweb-test \
    FACEBOOK_ID=366456830466669 \
    FACEBOOK_SECRET=a0ea7d529938af085399555a3e7c4fb3 \
    FACEBOOK_LOGIN_CALLBACK=https://moneysave.io/api/auth/facebook/callback \
    GOOGLE_ID=355321929536-ggshnpnmgaeu1g7rtgj1gg1hr1p4uh6c.apps.googleusercontent.com \
    GOOGLE_SECRET=5PoF5M_YX2ZslyJcv3D3nCmi \
    GOOGLE_LOGIN_CALLBACK=https://moneysave.io/api/auth/google/callback \
    GOOGLE_SCOPE=https://www.googleapis.com/auth/plus.login

EXPOSE 8080
CMD [ "node", "server/index.js" ]
