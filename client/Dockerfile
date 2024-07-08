FROM node:18-alpine AS base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
COPY next.config.js ./

# Install dependencies including devDependencies
# This will be cached unless package.json or package-lock.json change
ENV NODE_ENV=development
RUN npm install

# Set the environment back to production for the final build
ENV NODE_ENV=production
EXPOSE 3000

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM base AS production
WORKDIR /app

# Ensure we are in production mode
ENV NODE_ENV=production
# Install only production dependencies
RUN npm ci --only=production

# Setup non-root user for better security
RUN addgroup -g 1001 -S nodejs && \
	adduser -S nextjs -u 1001
USER nextjs

# Copy necessary files from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/postcss.config.js ./postcss.config.js

CMD ["npm", "start"]

FROM base AS dev
WORKDIR /app
ENV NODE_ENV=development
# No need to run npm install again as it was done in the base stage
COPY . .
CMD ["npm", "run", "dev"]