FROM node

WORKDIR /app
COPY ./data/package*.json ./

RUN npm install

COPY ./data ./

ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}


RUN npm run build

CMD ["npm", "start"]