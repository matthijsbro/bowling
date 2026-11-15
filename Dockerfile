FROM node:26-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && mkdir -p data && chown node data
ENV PORT=8080
EXPOSE 8080
USER node
CMD ["node", "src/server/index.ts"]
