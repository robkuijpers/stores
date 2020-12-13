FROM nginx
COPY nginx/conf.d /etc/nginx/conf.d/
COPY dist/apps/bike-store /usr/share/nginx/html/
EXPOSE 80

# https://kiltedcode.github.io/posts/2017/angular-docker-nginx.html

# FROM node:alpine AS build-stage

# WORKDIR /app

# # to use cache on node_modules
# COPY package*.json /app/
# RUN npm install

# COPY . /app/
# RUN npm run build --prod

# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/nginx.conf

# COPY --from=build-stage /app/dist/ /usr/share/nginx/html/

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
