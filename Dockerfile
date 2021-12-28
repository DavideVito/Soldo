FROM node:17

ENV PORT=8080
ENV NODE_ENV=development

EXPOSE 8080

COPY . .

RUN npm install

CMD ["node", "index.js"]