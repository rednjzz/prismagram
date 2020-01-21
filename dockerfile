FROM node:12
COPY package.json /project/package.json
RUN cd /project; yarn install; npm install -g prisma
COPY . /project
WORKDIR /project
# RUN yarn prisma
EXPOSE 4000

CMD yarn dev
