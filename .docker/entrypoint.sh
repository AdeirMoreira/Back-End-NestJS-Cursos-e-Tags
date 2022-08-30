#!/bin/bash

npm i
npm run build
npm run typeorm migration:run
npm run start:dev