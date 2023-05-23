FROM node:14-alpine AS BUILDER
ENV WEB_ROOT=/app/AnimeTrix
RUN apk add --no-cache git curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
WORKDIR /app
RUN git clone https://github.com/ShivaBhattacharjee/AnimeTrix.git
WORKDIR $WEB_ROOT
RUN find .  -type f -exec sed -i 's/\r$//' {} +
RUN npm install --verbose
RUN npm run build
RUN rm -rf .git .github .gitignore .dockerignore .vscode LICENSE README.md
RUN node-prune node_modules
RUN chmod -R 777 .

FROM node:14-alpine
ENV WEB_ROOT=/app/AnimeTrix
RUN mkdir /app
RUN mkdir $WEB_ROOT
WORKDIR $WEB_ROOT
COPY --from=BUILDER $WEB_ROOT .
EXPOSE 3000
CMD npm start
