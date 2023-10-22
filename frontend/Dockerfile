FROM mhart/alpine-node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
ARG REACT_APP_BASE_URL
RUN sh create-env-file.sh REACT_APP_BASE_URL=$REACT_APP_BASE_URL
RUN npm run build
CMD cp -r build result_build
