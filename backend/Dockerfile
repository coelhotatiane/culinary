from node:16-alpine
workdir /build
copy . .
run npm ci
run npm run build
run npm prune --production
workdir /app
run cp -r /build/dist/* .
run mv /build/node_modules ./node_modules
run rm -rf /build
entrypoint ["node", "main.js"]
