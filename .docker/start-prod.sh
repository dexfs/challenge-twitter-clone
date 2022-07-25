#!/bin/bash

npm install --silent
#tail -f /dev/null;

npm run db:migrate
npm run db:seed:all
npm run build
npm run start:prod
