FROM node:16.13.1-alpine3.15

USER node

WORKDIR /home/node/app

CMD [ "/home/node/app/start.sh" ]

# CMD [ "tail", "-f", "/dev/null" ]
