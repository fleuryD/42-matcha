FROM	node:18 AS build

WORKDIR	/app

COPY	package*.json ./

# RUN		npm install -g npm@10.2.4
RUN		npm install
RUN		npm install cors		## ADDED in package.json
RUN		npm install pg			## ADDED in package.json
RUN		npm install nodemon -g	## ADDED in package.json
RUN		npm install bcrypt
RUN		npm install @nestjs/jwt
RUN		npm install nodemailer
RUN		npm install dotenv


COPY	. .

EXPOSE	3008

CMD 	["nodemon", "run", "start-debug"]

# CMD	["npm", "start"]
# CMD 	["nodemon", "run", "app.js"]

