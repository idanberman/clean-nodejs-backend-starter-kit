FROM node:12


WORKDIR /app 

COPY package.json /app 
COPY yarn.lock /app
RUN yarn install 
COPY . /app 
RUN yarn run build

ENTRYPOINT [ "yarn run start:prod" ]
