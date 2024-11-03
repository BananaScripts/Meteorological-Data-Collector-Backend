FROM node:alpine 

WORKDIR /app
COPY package*.json ./
RUN npm install

RUN cd ./db
RUN git submodule init
RUN git submodule update
RUN git switch development
RUN cd /src/prisma
RUN npx prisma generate
RUN cd..
RUN cd..
RUN cd..

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]