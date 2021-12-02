FROM node:16

ADD package.json package-lock.json /
RUN npm ci
ADD index.js /
RUN chmod +x /index.js

ENTRYPOINT ["node", "/index.js"]