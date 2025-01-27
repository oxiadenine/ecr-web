FROM oven/bun:1.2-alpine

WORKDIR /app

COPY .next/standalone .
COPY .next/static .next/static
COPY public public

RUN chown -R bun:bun /app

USER bun

EXPOSE 3000

CMD ["bun", "--bun", "run", "server.js"]
