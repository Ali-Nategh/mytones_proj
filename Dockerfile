FROM node:16.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev --name whateverName

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
