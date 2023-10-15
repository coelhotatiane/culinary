from node:16-alpine as build
workdir /build
copy . .
run npm ci
run npm run build
workdir /app
run cp -r /build/dist/frontend/* .
run rm -rf /build

from nginx:1.25.2
workdir /app
COPY --from=build /app .
COPY default.conf /etc/nginx/conf.d/default.conf
