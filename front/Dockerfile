FROM	node:18 AS build

WORKDIR	/app

COPY	package.json ./
# COPY	package-lock.json ./

RUN		npm install

RUN		npm install -D eslint prettier eslint-config-prettier		## ADDED in package.json
RUN		npm install eslint --init		## ADDED in package.json
RUN		npm install date-fns		## ADDED in package.json
RUN		npm install dotenv		## ADDED in package.json


## npm install jsonwebtoken
## npm install nodemailer

#* pour l'erreur "EACCES: permission denied, mkdir 'app/node_modules/.cache"  sur mon portqble
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY	. .

EXPOSE	3009

CMD		["npm", "start"]