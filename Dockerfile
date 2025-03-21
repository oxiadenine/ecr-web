FROM oven/bun:1.2.5-alpine

ARG user

ENV USER=${user:-root}

WORKDIR /ecr-web

COPY .next/standalone .
COPY .next/static .next/static
COPY public public

RUN chown -R $USER:$USER /ecr-web

USER $USER:$USER

EXPOSE 3000

CMD ["bun", "--bun", "run", "server.js"]
