FROM node:18.4.0
## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

RUN npm install -g @nestjs/cli@9.0.0 npm@8.15.0

USER node

WORKDIR /home/node/app

CMD [ "/wait" ,"tail", "-f" , "/dev/null" ]