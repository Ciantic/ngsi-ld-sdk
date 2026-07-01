FROM docker.io/library/node:22
RUN corepack enable pnpm && corepack prepare pnpm --activate
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
