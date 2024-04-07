C_NOR =	\033[0m
C_BLA = \033[1;30m
C_RED = \033[1;31m
C_GRE = \033[1;32m
C_YEL = \033[1;33m
C_BLU = \033[1;34m
C_MAG = \033[1;35m
C_CYA = \033[1;36m
C_WHI = \033[1;37m


all : up



## //!! GIT_KEEP 
logs :
	@echo "\n\n$(C_YEL)docker-compose logs -fmatcha-postgres matcha-frontend  matcha-backend :$(C_YEL)\n\n"
	@docker-compose logs -f matcha-postgres matcha-frontend  matcha-backend # Affiche et suit en temps réel les logs du service frontend
	#@echo "\n\n$(C_YEL)docker-compose logs -f matcha-backend :$(C_YEL)\n\n"
	#@docker-compose logs -f matcha-backend   # Affiche et suit en temps réel les logs du service backend
	

## //!! GIT_KEEP 
up :
	@clear
	@echo "\n\n$(C_CYA)make up :$(C_NOR)\n\n"
	@echo "\n\n$(C_YEL)docker compose -f ./docker-compose.yml up --build -d :$(C_YEL)\n\n"
	@docker compose -f ./docker-compose.yml up --build -d
	@make logs


	
up2 :
	@docker compose -f ./docker-compose.yml up

down :
	@docker compose -f ./docker-compose.yml down

stop :
	@docker compose -f ./docker-compose.yml stop

start :
	@docker compose -f ./docker-compose.yml start


clear : down stop
	docker system prune -f

re : clear up




ps:
	@ echo "\n\n$(C_CYA)make ps :$(C_NOR)\n\n"

	@ echo "$(C_YEL)docker images ps :$(C_NOR)"
	@ docker images ps

	@ echo "$(C_YEL)docker container ps :$(C_NOR)"
	@ docker container ps

	@ echo "$(C_YEL)docker volume ls :$(C_NOR)"
	@ docker volume ls

	@ echo ""




clean:
	clear
	@ echo "\n\n$(C_CYA)make clean :$(C_NOR)\n\n"

	@ echo "$(C_YEL)docker-compose -f docker-compose.yml down -v :$(C_NOR)"
	@ docker-compose -f docker-compose.yml down -v

	@ echo "$(C_YEL)docker volume prune -f :$(C_NOR)"
	@ docker volume prune -f

	@ echo "$(C_YEL)docker system prune -a -f :$(C_NOR)"
	@ docker system prune -a -f

	@ echo ""

	@make ps
