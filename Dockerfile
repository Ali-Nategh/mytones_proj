FROM node:16.16.0

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
