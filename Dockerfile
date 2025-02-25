FROM oven/bun:1.2-alpine

ARG user

ENV USER=${user:-root}

WORKDIR /app

COPY .next/standalone .
COPY .next/static .next/static
COPY public public

RUN chown -R $USER:$USER /app

USER $USER

EXPOSE 3000

CMD ["bun", "--bun", "run", "server.js"]
