FROM node:22.8.0-alpine3.20

WORKDIR /app-front

COPY *.json /app-front

RUN npm install

COPY . /app-front

EXPOSE 5173

ENTRYPOINT ["npm", "run"]
CMD ["dev --host 0.0.0.0 --port 5173"]