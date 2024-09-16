FROM node:22.8.0-alpine3.20

WORKDIR /app-back

COPY *.json /app-back

RUN npm install

COPY . /app-back

ENTRYPOINT ["npm", "run"]
CMD ["dev"]
