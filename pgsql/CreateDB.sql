CREATE ROLE postgres WITH LOGIN PASSWORD 'root';
ALTER ROLE postgres SUPERUSER;

/* drop DATABASE if exists db_matcha; */
/* CREATE DATABASE if NOT EXISTS db_matcha; */


\c db_matcha;

/***************************	USER	***************************************/

drop schema if exists users CASCADE;
create schema users;
set search_path to users;

drop table if exists users CASCADE;
create table users
(
	id						serial primary key,

	email					varchar(255)	NOT NULL	UNIQUE,
	username				varchar(255)	NOT NULL	UNIQUE,
	password				varchar(512)	NOT NULL,
	birthday 				date			NOT NULL,
	lastname				varchar(255)	NOT NULL,
	firstname				varchar(255)	NOT NULL,
	biography 				TEXT,

	gender					varchar(10)		NOT NULL,
	love_m					boolean 		NOT NULL			DEFAULT TRUE,
	love_f					boolean 		NOT NULL			DEFAULT TRUE,
	love_nb					boolean 		NOT NULL			DEFAULT TRUE,

	access_token			TEXT						UNIQUE,

	created_at				TIMESTAMP 		NOT NULL			DEFAULT CURRENT_TIMESTAMP,
	email_token				TEXT						UNIQUE,

	email_reset_value		varchar(255)				UNIQUE,
	email_reset_token		TEXT						UNIQUE,
	email_reset_at			TIMESTAMP,

	password_reset_token	TEXT						UNIQUE,
	password_reset_at		TIMESTAMP,

	last_connection_at		TIMESTAMP,
	is_online				boolean 		NOT NULL			DEFAULT FALSE,

	picture_1				TEXT,
	picture_2				TEXT,
	picture_3				TEXT,
	picture_4				TEXT,
	picture_5				TEXT,

	latitude				DECIMAL(11, 8)	NOT NULL			DEFAULT 0.0,
	longitude				DECIMAL(11, 8)	NOT NULL			DEFAULT 0.0,
	city					varchar(255),
	country					varchar(255),
	postal_code				INT
);

/*
	fame					INT				NOT NULL	DEFAULT 0,
	height					INT,
	weight					INT,
	is_admin				boolean 		NOT NULL	DEFAULT FALSE,
*/


/***************************	TAGS	***************************************/

drop table if exists tags CASCADE;
create table tags
(
	id			serial primary key,
	name		varchar(255)  NOT NULL	UNIQUE,
	category	varchar(255)
);

/***************************	TAGS_USERS	***********************************/

drop table if exists tags_users CASCADE;
create table tags_users
(
	id		serial primary key,
	tag_id	INT NOT NULL,
	user_id	INT NOT NULL,

	CONSTRAINT fk_tag	FOREIGN KEY(tag_id)		REFERENCES tags(id),
	CONSTRAINT fk_user	FOREIGN KEY(user_id)	REFERENCES users(id)

);

/***************************	NOTIFICATIONS	*******************************/
/* genre : LIKE | UNLIKE | MATCH ? | VISIT | MESSAGE */

drop table if exists notifications CASCADE;
create table notifications
(
	id			serial primary key,
	target_id	INT				NOT NULL,
	sender_id	INT				NOT NULL,
	created_at	TIMESTAMP					DEFAULT CURRENT_TIMESTAMP,
	is_read		INT				NOT NULL	DEFAULT 0,
	genre		varchar(128)	NOT NULL,

	CONSTRAINT fk_target	FOREIGN KEY(target_id)	REFERENCES users(id),
	CONSTRAINT fk_sender	FOREIGN KEY(sender_id)	REFERENCES users(id)
);


/***************************	MESSAGES	***********************************/
/* 2 users qui matchent peuvent s'envoyer des messages */
/* is_read ??????????????????????????????????????????????????? */

drop table if exists messages CASCADE;
create table messages
(
	id			serial primary key,
	sender_id	INT				NOT NULL,
	target_id	INT				NOT NULL,
	created_at	TIMESTAMP					DEFAULT CURRENT_TIMESTAMP,
	is_read		INT				NOT NULL	DEFAULT 0,
	content		TEXT 			NOT NULL,

	CONSTRAINT fk_sender	FOREIGN KEY(sender_id)	REFERENCES users(id),
	CONSTRAINT fk_target	FOREIGN KEY(target_id)	REFERENCES users(id)
);

/***************************	LIKES	***************************************/

drop table if exists likes CASCADE;
create table likes
(
	id			serial primary key,
	sender_id	INT NOT NULL,
	target_id	INT NOT NULL,
	created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT fk_sender FOREIGN KEY(sender_id) REFERENCES users(id),
	CONSTRAINT fk_target FOREIGN KEY(target_id) REFERENCES users(id)

);

/***************************	VISITS	***************************************/
/* Quand un user visite le profil d'un autre user */

drop table if exists visits CASCADE;
create table visits
(
	id serial primary key,
	sender_id INT			NOT NULL,
	target_id INT			NOT NULL,
	created_at TIMESTAMP	DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT fk_sender	FOREIGN KEY(sender_id)	REFERENCES users(id),
	CONSTRAINT fk_target	FOREIGN KEY(target_id)	REFERENCES users(id)
);


/***************************	BLOCKS	***************************************/
/* Quand un user bloque un autre user */

drop table if exists blocks CASCADE;
create table blocks
(
	id			serial primary key,
	sender_id	INT			NOT NULL,
	target_id	INT			NOT NULL,
	created_at	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT fk_sender	FOREIGN KEY(sender_id)	REFERENCES users(id),
	CONSTRAINT fk_target	FOREIGN KEY(target_id)	REFERENCES users(id)
);


/***************************	FAKE	***************************************/
/* Quand un user signal un autre user comme Fake */

drop table if exists fakes CASCADE;
create table fakes
(
	id			serial primary key,
	sender_id	INT			NOT NULL,
	target_id	INT			NOT NULL,
	created_at	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT fk_sender	FOREIGN KEY(sender_id)	REFERENCES users(id),
	CONSTRAINT fk_target	FOREIGN KEY(target_id)	REFERENCES users(id)
);



/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/
/***************************	XXXXXXXXXXXX	*******************************/



/***************************	USER	***************************************/

insert into users(gender, love_m, love_f, love_nb, birthday, password, username, email,  lastname, firstname,  biography)
values

('F',	TRUE,	FALSE,	FALSE,	'2001-08-20',	'pass2encrypt!!',	'Marie',			'marie@geek.fr',				'Marie',	'Marie',			'Geek passionné par les univers fantastiques, à la recherche d''une personne pour explorer ensemble les galaxies infinies de la vie.'),
('F',	TRUE,	FALSE,	FALSE,	'2000-10-05',	'pass2encrypt!!',	'Chaton66',			'chaton66@geek.fr',				'Alou',		'Fred',				NULL),
('F',	TRUE,	FALSE,	FALSE,	'2003-10-05',	'pass2encrypt!!',	'Ursula',			'Ursula@geek.fr',				'Lala',		'Ursula',			'Si vous préférez les LAN parties aux soirées en boîte, nous pourrions bien être un match parfait.'),
('F',	TRUE,	FALSE,	FALSE,	'2001-08-20',	'pass2encrypt!!',	'Mag',				'Mag@geek.fr',					'Taylor',	'XXXXXX',			NULL),
('F',	TRUE,	FALSE,	FALSE,	'2002-10-05',	'pass2encrypt!!',	'Mikasa',			'Mikasa@geek.fr',				'XXXXXXX',	'XXXXXX',			NULL),
('F',	TRUE,	FALSE,	FALSE,	'1990-05-22',	'pass2encrypt!!',	'GamerGirl42',		'gamer@geekmail.com',			'Johnson',	'Emily',			'Accro aux jeux vidéo, je recherche un coéquipier pour des sessions de gaming intenses et des discussions sur les derniers RPG.'),
('F',	TRUE,	FALSE,	FALSE,	'1997-08-15',	'pass2encrypt!!',	'GalacticGazer',	'gazer@geekmail.com',			'Murphy',	'Emma',				'Astronome passionnée par les étoiles et les constellations, à la recherche d''un copilote pour explorer l''univers nocturne.'),
('F',	TRUE,	FALSE,	FALSE,	'1997-08-07',	'pass2encrypt!!',	'VRVoyager33',		'vrdasd@geekmail.com',			'Peters',	'Olivia',			'Exploratrice virtuelle à la recherche d''un partenaire pour des aventures en réalité virtuelle et des mondes numériques.'),
('F',	TRUE,	FALSE,	FALSE,	'1996-07-22',	'pass2encrypt!!',	'MysticMage',		'mystice@geekmail.com',			'Brown',	'Mia',				'Sorcière mystique cherchant un acolyte pour étudier les arts occultes et lancer des sorts en tandem.'),
('F',	TRUE,	FALSE,	FALSE,	'1989-02-14',	'pass2encrypt!!',	'SciFiSiren',		'scifis@geekmail.com',			'Parker',	'Isabella',			'Écrivaine de science-fiction cherchant un compagnon pour discuter des étoiles, des paradoxes temporels et des mondes extraterrestres.'),
('F',	TRUE,	FALSE,	FALSE,	'1995-03-17',	'pass2encrypt!!',	'AnimeAdventurer',	'animeer@geekmail.com',			'Lopez',	'Sophia',			'Aventurière anime en quête d''un partenaire pour des cosplay époustouflants et des marathons d''anime.'),
('F',	TRUE,	FALSE,	FALSE,	'1993-11-19',	'pass2encrypt!!',	'StarshipCaptain',	'statain@geekmail.com',			'Harris',	'Lily',				'Capitaine de vaisseau spatial en quête d''un co-capitaine pour explorer des galaxies lointaines.'),
('F',	TRUE,	FALSE,	FALSE,	'1989-02-25',	'pass2encrypt!!',	'VRValkyrie',		'vrvrie@geekmail.com',			'Gomez',	'Ava',				'Guerrière virtuelle à la recherche d''un guerrier pour des batailles épiques en réalité virtuelle.'),
('F',	TRUE,	FALSE,	FALSE,	'1993-09-09',	'pass2encrypt!!',	'CosplayQueen',		'cosyer@geekmail.com',			'Wilson',	'Samantha',			'Maquillage, costumes et conventions font partie de ma vie. À la recherche d''un cosplayeur passionné pour créer des tenues épiques ensemble.'),
('F',	TRUE,	FALSE,	FALSE,	'1998-04-11',	'pass2encrypt!!',	'PixelPrincess',	'pixel@geekmail.com',			'Miller',	'Lindsay',			'Artiste numérique passionnée par les pixels et les jeux rétro, en quête d''un compagnon créatif pour des projets artistiques.'),
('F',	TRUE,	FALSE,	FALSE,	'1995-03-14',	'pass2encrypt!!',	'TechieTina',		'tina@geekmail.com',			'Roberts',	'Tina',				'Inventrice de génie à la recherche d''un partenaire pour coder, bricoler et conquérir le monde de la technologie ensemble.'),
('F',	TRUE,	FALSE,	FALSE,	'2001-08-20',	'pass2encrypt!!',	'Alixxx',			'Alixxx@geek.fr',				'XXXXXXX',	'XXXXXX',			'Si tu aimes les discussions enflammées sur Star Wars, les marathons de séries jusqu''à l''aube et les soirées jeux de société, alors nous sommes faits pour nous rencontrer.'),
('F',	TRUE,	FALSE,	FALSE,	'1989-09-07',	'pass2encrypt!!',	'AnimeMaster89',	'animester89@geekmail.com',		'King',		'Mia',				'Maître de l''anime en quête d''un disciple pour des aventures époustouflantes.'),
('F',	TRUE,	FALSE,	FALSE,	'1988-01-18',	'pass2encrypt!!',	'TechInnovator47',	'techinnovator47@geekmail.com',	'Bennett',	'Lucia',			'Innovatrice technologique cherchant un collaborateur pour des découvertes révolutionnaires.'),
('F',	TRUE,	FALSE,	FALSE,	'1991-07-27',	'pass2encrypt!!',	'PixelPioneer33',	'pixelpioneer33@yahoo.com',		'Thompson',	'Ava',				 NULL),
('F',	TRUE,	FALSE,	FALSE,	'1987-04-13',	'pass2encrypt!!',	'VRVoyager21',		'vrvoyager21@hotmail.com',		'Harris',	'Sarah',			'Exploratrice virtuelle à la recherche d''aventures en réalité augmentée.'),
('F',	TRUE,	FALSE,	FALSE,	'1997-02-18',	'pass2encrypt!!',	'TechieTina8',		'techietina8@geekmail.com',		'Robinson',	'Emma'	,			 NULL),
('F',	TRUE,	FALSE,	FALSE,	'1988-10-05',	'pass2encrypt!!',	'WizardWanderer55',	'wizarwanderer55@gmail.com',	'Lopez',	'Lucia',			'Exploratrice des mondes magiques cherchant un compagnon de sorts.'),
('F',	TRUE,	FALSE,	FALSE,	'1987-11-24',	'pass2encrypt!!',	'Luigi77',			'luigi77@geekmail.com',			'Martinez',	'Ava',				'Passionné de jeux rétro et d''aventures geek en quête d''une âme sœur.'),
('F',	TRUE,	FALSE,	FALSE,	'1990-12-10',	'pass2encrypt!!',	'TechTitan66',		'techtitan66@geekmail.com',		'Parker',	'Ella',				'Titan de la technologie cherchant une partenaire pour coder et créer des inventions révolutionnaires.'),
('F',	TRUE,	FALSE,	FALSE,	'1991-04-07',	'pass2encrypt!!',	'PixelPrincess99',	'pixelprincess99@gmail.com',	'Garcia',	'Sophia',			'Artiste numérique passionnée par les pixels et les jeux rétro.'),
('F',	TRUE,	FALSE,	FALSE,	'1986-11-19',	'pass2encrypt!!',	'GalacticGazer81',	'galacticgazer81@yahoo.com',	'Smith',	'Ella',				'Astronome passionnée par les étoiles et les constellations, à la recherche d''un co-pilote pour explorer l''univers nocturne.'),
('F',	TRUE,	FALSE,	FALSE,	'1989-02-25',	'pass2encrypt!!',	'VRValkyrie17',		'vrvalkyrie17@hotmail.com',		'Gomez',	'Ava',				'Guerrière virtuelle à la recherche d''un guerrier pour des batailles épiques en réalité virtuelle.'),
('F',	TRUE,	FALSE,	FALSE,	'1993-11-19',	'pass2encrypt!!',	'StarshipCaptain5',	'starshipcaptain51@yahoo.com',	'Hernandez','Lily',				'Capitaine de vaisseau spatial en quête d''un co-capitaine pour explorer des galaxies lointaines.'),
('F',	TRUE,	FALSE,	FALSE,	'1986-10-20',	'pass2encrypt!!',	'RoboticsRuler18',	'roboticsruler18@gmail.com',	'Garcia',	'Ava',				'Ingénieure robotique cherchant un collègue pour concevoir des robots qui changeront le monde.'),
('F',	TRUE,	FALSE,	FALSE,	'1997-02-18',	'pass2encrypt!!',	'TechieTina46',		'techietina46@geekmail.com',	'Robinson',	'Emma',				 NULL),

('F',	FALSE,	TRUE,	FALSE,	'2000-10-05',	'pass2encrypt!!',	'Adrien',				'adrien@geek.fr',				'Momori',	'Adrien',			'Chercheur d''amour dans le monde virtuel, à la recherche d''une partenaire pour partager des quêtes épiques et des soirées de jeux endiablées.'),
('F',	FALSE,	TRUE,	FALSE,	'1988-01-18',	'pass2encrypt!!',	'TechInnovator99',	'techinnovator99@geekmail.com',	'Bennett',	'Lucia',			'Innovatrice technologique cherchant un collaborateur pour des découvertes révolutionnaires.'),
('F',	FALSE,	TRUE,	FALSE,	'1986-11-19',	'pass2encrypt!!',	'GalacticGazer47',	'galacticgazer47@yahoo.com',	'Smith',	'Ella',				'Astronome passionnée par les étoiles et les constellations, à la recherche d''un co-pilote pour explorer l''univers nocturne.'),
('F',	FALSE,	TRUE,	FALSE,	'1991-04-07',	'pass2encrypt!!',	'PixelPrincess67',	'pixelprincess67@gmail.com',	'Garcia',	'Sophia',			'Artiste numérique passionnée par les pixels et les jeux rétro.'),
('F',	FALSE,	TRUE,	FALSE,	'1989-02-25',	'pass2encrypt!!',	'VRValkyrie78',		'vrvalkyrie78@hotmail.com',		'Gomez',	'Ava',				'Guerrière virtuelle à la recherche d''un guerrier pour des batailles épiques en réalité virtuelle.'),
('F',	FALSE,	TRUE,	FALSE,	'1993-11-19',	'pass2encrypt!!',	'StarshipCaptain6',	'starshipcaptain64@yahoo.com',	'Hernandez','Lily',				'Capitaine de vaisseau spatial en quête d''un co-capitaine pour explorer des galaxies lointaines.'),
('F',	FALSE,	TRUE,	FALSE,	'1986-10-20',	'pass2encrypt!!',	'RoboticsRuler29',	'roboticsruler29@gmail.com',	'Garcia',	'Ava',				'Ingénieure robotique cherchant un collègue pour concevoir des robots qui changeront le monde.'),
('F',	FALSE,	TRUE,	FALSE,	'1988-10-05',	'pass2encrypt!!',	'WizardWanderer66',	'wizardwanderer66@gmail.com',	'Lopez',	'Lucia',			'Exploratrice des mondes magiques cherchant un compagnon de sorts.'),
('F',	FALSE,	TRUE,	FALSE,	'1991-07-27',	'pass2encrypt!!',	'PixelPioneer22',	'pixelpioneer22@yahoo.com',		'Thompson',	'Ava',			 	NULL),
('F',	FALSE,	TRUE,	FALSE,	'1987-04-13',	'pass2encrypt!!',	'VRVoyager48',		'vrvoyager48@hotmail.com',		'Harris',	'Sarah',			'Exploratrice virtuelle à la recherche d''aventures en réalité augmentée.'),

('F',	TRUE,	TRUE,	FALSE,	'1990-12-10',	'pass2encrypt!!',	'TechTitan21',		'techtitan21@geekmail.com',		'Parker',	'Ella',				'Titan de la technologie cherchant une partenaire pour coder et créer des inventions révolutionnaires.'),
('F',	TRUE,	TRUE,	FALSE,	'1988-10-05',	'pass2encrypt!!',	'WizardWanderer27',	'wizardwanderer27@gmail.com',	'Lopez',	'Lucia',			'Exploratrice des mondes magiques cherchant un compagnon de sorts.'),
('F',	TRUE,	TRUE,	FALSE,	'1991-07-27',	'pass2encrypt!!',	'PixelPioneer88',	'pixelpioneer88@yahoo.com',		'Thompson',	'Ava',				 NULL),
('F',	TRUE,	TRUE,	FALSE,	'1991-05-14',	'pass2encrypt!!',	'TechTitan',		'techtitan@gmail.com',			'Brown',	'Ava',				'Titan de la technologie en quête d''un héros pour coder et construire des inventions révolutionnaires.'),
('F',	TRUE,	TRUE,	FALSE,	'1990-03-15',	'pass2encrypt!!',	'GeekyGoddess',		'geekygoddess@example.com',		'Smith',	'Alice',			'Amatrice de jeux de plateau, de science-fiction et de jeux vidéo, je cherche un compagnon pour des aventures geek sans fin.'),
('F',	TRUE,	TRUE,	FALSE,	'1990-07-20',	'pass2encrypt!!',	'TechSavvy21',		'techsavvy21@geekmail.com',		'Smith',	'Emma',			 	NULL),
('F',	TRUE,	TRUE,	FALSE,	'1982-12-10',	'pass2encrypt!!',	'RetroGamerX',		'retrogamerx@example.com',		'Brown',	'Sophie',			'Collectionneuse de consoles rétro et de jeux vintage, je recherche un partenaire pour des soirées de jeu nostalgiques.'),
('F',	TRUE,	TRUE,	FALSE,	'2001-12-02',	'pass2encrypt!!',	'CosplayKing',		'cosplayking@gmail.com',		'Williams',	'Sophia',		 	NULL),

('F',	TRUE,	FALSE,	TRUE,	'1997-09-08',	'pass2encrypt!!',	'VRAdventurer',		'vradventurer@hotmail.com',		'Garcia',	'Laura',			'Exploratrice virtuelle à la recherche de partenaires de jeu.'),
('F',	TRUE,	FALSE,	TRUE,	'1990-03-07',	'pass2encrypt!!',	'AnimeEnthusiast',	'animeenthusst@hotmail.com',	'Taylor',	'Olivia',			'Amatrice de mangas et d''anime en quête d''un partenaire de cosplay.'),
('F',	TRUE,	FALSE,	TRUE,	'1988-07-19',	'pass2encrypt!!',	'WizardWanderer',	'wizardwander@geekmail.com',	'Lopez',	'Isabella',			'Exploratrice des mondes magiques cherchant un compagnon de sorts.'),

('F',	FALSE,	TRUE,	TRUE,	'1990-12-10',	'pass2encrypt!!',	'TechTitan36',		'techtitan36@geekmail.com',		'Parker',	'Ella',				'Titan de la technologie cherchant une partenaire pour coder et créer des inventions révolutionnaires.'),
('F',	FALSE,	TRUE,	TRUE,	'1987-04-13',	'pass2encrypt!!',	'VRVoyager39',		'vrvoyager39@hotmail.com',		'Harris',	'Sarah',			'Exploratrice virtuelle à la recherche d''aventures en réalité augmentée.'),
('F',	FALSE,	TRUE,	TRUE,	'1987-11-24',	'pass2encrypt!!',	'Luigi83',			'luigi83@geekmail.com',			'Martinez',	'Ava',				'Passionné de jeux rétro et d''aventures geek en quête d''une âme sœur.'),

('F',	TRUE,	TRUE,	TRUE,	'1990-03-29',	'pass2encrypt!!',	'GameGoddess17',	'gamegodess17@geekmail.com',	'Davis',	'Sophia',			'Déesse des jeux vidéo cherchant un dieu pour régner sur les mondes virtuels.'),
('F',	TRUE,	TRUE,	TRUE,	'1998-05-12',	'pass2encrypt!!',	'CyberNinja88',		'cyberninja88@gmail.com',		'Morales',	'Ella',				 NULL),
('F',	TRUE,	TRUE,	TRUE,	'1989-11-23',	'pass2encrypt!!',	'PixelPirate22',	'pixelpirate22@yahoo.com',		'Perez',	'Mia',			 	NULL),

('M',	FALSE,	TRUE,	FALSE,	'1983-10-05',	'pass2encrypt!!',	'Gero',				'gero@geek.fr',					'Nimo',		'Gero',				'Amateur de jeux vidéo, de science-fiction et de cosplay, je cherche quelqu''un avec qui vivre des aventures dignes d''un manga.'),
('M',	FALSE,	TRUE,	FALSE,	'2001-08-20',	'pass2encrypt!!',	'ChaudLapin42',		'chaudlapin@geek.fr',			'Martino',	'Seb',				NULL),
('M',	FALSE,	TRUE,	FALSE,	'2001-10-05',	'pass2encrypt!!',	'Neo',				'Neo@geek.fr',					'XXXXXXX',	'XXXXXX',			NULL),
('M',	FALSE,	TRUE,	FALSE,	'1998-10-05',	'pass2encrypt!!',	'morféhuss',		'morféhuss@geek.fr',			'XXXXXXX',	'XXXXXX',			NULL),
('M',	FALSE,	TRUE,	FALSE,	'2001-08-20',	'pass2encrypt!!',	'LolLover',			'LolLover@geek.fr',				'XXXXXXX',	'XXXXXX',			NULL),
('M',	FALSE,	TRUE,	FALSE,	'1947-08-01',	'pass2encrypt!!',	'GOJO',				'GOJO@geek.fr',					'Duchamp',	'Georgie',			'À la recherche de mon coéquipier pour conquérir le monde, un donjon à la fois.'),
('M',	FALSE,	TRUE,	FALSE,	'1988-10-05',	'pass2encrypt!!',	'Pricillia',		'Pricillia@geek.fr',			'XXXXXXX',	'XXXXXX',			NULL),
('M',	FALSE,	TRUE,	FALSE,	'2000-10-05',	'pass2encrypt!!',	'MarieT',			'marittt@geek.fr',				'XXXXXXX',	'Marie-Therese',	NULL),
('M',	FALSE,	TRUE,	FALSE,	'1991-12-03',	'pass2encrypt!!',	'ZeldaFanatic',		'link@geekmail.com',			'Turner',	'Link',				'Héro du royaume d''Hyrule en quête d''une princesse à sauver et d''un cœur à conquérir.'),
('M',	FALSE,	TRUE,	FALSE,	'1982-02-27',	'pass2encrypt!!',	'DungeonMaster',	'master@geekmail.com',			'Garcia',	'Carlos',			'Maître du donjon à la recherche d''aventuriers intrépides pour des quêtes légendaires et des soirées de jeu de rôle.'),
('M',	FALSE,	TRUE,	FALSE,	'1993-11-28',	'pass2encrypt!!',	'CyberNinja',		'cybenja@geekmail.com',			'Johnson',	'Aiden',			'Maître de la réalité virtuelle en quête d''une partenaire pour des duels cybernétiques et des aventures futuristes.'),
('M',	FALSE,	TRUE,	FALSE,	'1992-12-10',	'pass2encrypt!!',	'CodeCrusader',		'coader@geekmail.com',			'Gonzalez',	'Diego',			'Chevalier du code cherchant une codeuse talentueuse pour résoudre des énigmes algorithmiques.'),
('M',	FALSE,	TRUE,	FALSE,	'1991-06-03',	'pass2encrypt!!',	'D20Dreamer',		'd20drer@geekmail.com',			'Clark',	'Nathan',			'Joueur de rôle passionné en quête de coéquipiers pour des aventures légendaires et des lancers de dés épiques.'),
('M',	FALSE,	TRUE,	FALSE,	'1990-12-17',	'pass2encrypt!!',	'PixelPirate',		'pixelte@geekmail.com',			'Turner',	'Oliver',			'Pirate numérique en quête d''une première matelote pour piller des trésors virtuels et naviguer sur les mers électroniques.'),
('M',	FALSE,	TRUE,	FALSE,	'1994-07-12',	'pass2encrypt!!',	'GameGoddess',		'gamess@geekmail.com',			'Davis',	'Benjamin',			'Dieu des jeux vidéo cherchant une déesse pour régner sur les royaumes virtuels.'),
('M',	FALSE,	TRUE,	FALSE,	'1987-06-08',	'pass2encrypt!!',	'VRVoyager',		'vr@geekmail.com',				'Smith',	'Noah',				'Explorateur virtuel à la recherche d''une compagne pour des aventures en réalité augmentée.'),
('M',	FALSE,	TRUE,	FALSE,	'1996-09-27',	'pass2encrypt!!',	'SwordSorcerer',	'sword@geekmail.com',			'Lee',		'Ethan',			'Sorcier de l''épée cherchant une partenaire pour des duels légendaires et des quêtes épiques.'),
('M',	FALSE,	TRUE,	FALSE,	'1994-11-16',	'pass2encrypt!!',	'AnimeAdventurer4',	'animeadventur44@geekail.com',	'Clark',	'Daniel',			'Aventurier anime en quête d''une partenaire pour des cosplay époustouflants et des marathons d''anime.'),
('M',	FALSE,	TRUE,	FALSE,	'1992-07-08',	'pass2encrypt!!',	'CodeCrusader29',	'codecrusader29@gmail.com',		'Roberts',	'Liam',				'Chevalier du code cherchant une codeuse talentueuse pour résoudre des énigmes algorithmiques.'),
('M',	FALSE,	TRUE,	FALSE,	'1984-03-30',	'pass2encrypt!!',	'TimeTraveler75',	'timetraveler75@gmail.com',		'Williams',	'William',			'Voyageur temporel cherchant une compagne pour explorer le passé et le futur à bord de sa machine à remonter le temps.'),
('M',	FALSE,	TRUE,	FALSE,	'1990-12-17',	'pass2encrypt!!',	'PixelPirate61',	'pixelpirate61@yahoo.com',		'Turner',	'Oliver',			'Pirate numérique en quête d''une première matelote pour piller des trésors virtuels et naviguer sur les mers électroniques.'),
('M',	FALSE,	TRUE,	FALSE,	'1994-12-14',	'pass2encrypt!!',	'AnimeEnthusiast3',	'animeenthusiast34@gmail.com',	'Martinez',	'Lucas',			'Fanatique de l''anime en quête d''un compagnon de visionnage.'),
('M',	FALSE,	TRUE,	FALSE,	'1991-06-03',	'pass2encrypt!!',	'D20Dreamer36',		'd20dreamer36@geekmail.com',	'Yamamoto',	'Lucas',			'Joueur de rôle passionné en quête de coéquipiers pour des aventures légendaires et des lancers de dés épiques.'),
('M',	FALSE,	TRUE,	FALSE,	'1993-01-30',	'pass2encrypt!!',	'AnimeAddict75',	'animeaddict75@geekmail.com',	'Wilson',	'Daniel',			'Amateur de mangas et d''anime en quête d''une partenaire de cosplay.'),
('M',	FALSE,	TRUE,	FALSE,	'1996-02-25',	'pass2encrypt!!',	'SwordSorcerer57',	'swordsorcerer57@gmail.com',	'Carter',	'Liam',				'Sorcier de l''épée cherchant des duels légendaires et des quêtes épiques.'),
('M',	FALSE,	TRUE,	FALSE,	'1988-07-05',	'pass2encrypt!!',	'CosmicExplorer84',	'cosmicexplorer84@yahoo.com',	'Morales',	'Noah',				'Explorateur cosmique en quête de compagnon pour des voyages interstellaires.'),
('M',	FALSE,	TRUE,	FALSE,	'1992-06-14',	'pass2encrypt!!',	'GameWizard22',		'gamewizard22@gmail.com',		'Cruz',		'Liam',			 	NULL),

('M',	TRUE,	FALSE,	FALSE,	'1994-07-12',	'pass2encrypt!!',	'GameGoddess36',	'gamegoddess36@geekmail.com',	'Davis',	'Benjamin',			'Déesse des jeux vidéo cherchant un dieu pour régner sur les royaumes virtuels.'),
('M',	TRUE,	FALSE,	FALSE,	'1994-12-14',	'pass2encrypt!!',	'AnimeEnthusiast4',	'animeenthusiast42@gmail.com',	'Martinez',	'Lucas',			'Fanatique de l''anime en quête d''un compagnon de visionnage.'),
('M',	TRUE,	FALSE,	FALSE,	'1996-02-25',	'pass2encrypt!!',	'SwordSorcerer63',	'swordsorcerer63@gmail.com',	'Carter',	'Liam',				'Sorcier de l''épée cherchant des duels légendaires et des quêtes épiques.'),
('M',	TRUE,	FALSE,	FALSE,	'1993-01-30',	'pass2encrypt!!',	'AnimeAddict77',	'animeaddict77@geekmail.com',	'Wilson',	'Daniel',			'Amateur de mangas et d''anime en quête d''une partenaire de cosplay.'),
('M',	TRUE,	FALSE,	FALSE,	'1988-07-05',	'pass2encrypt!!',	'CosmicExplorer79',	'cosmicexplorer79@yahoo.com',	'Morales',	'Noah',				'Explorateur cosmique en quête de compagnon pour des voyages interstellaires.'),
('M',	TRUE,	FALSE,	FALSE,	'1998-02-05',	'pass2encrypt!!',	'Luigi66',			'Luigi66@geek.fr',				'XXXXXXX',	'XXXXXX',			'Passionné par la programmation, les jeux rétro et les soirées à thème, je recherche une âme geek sœur pour créer notre propre monde fantastique.'),
('M',	TRUE,	FALSE,	FALSE,	'1994-12-14',	'pass2encrypt!!',	'AnimeEnthusast9',	'animeenthuast99@gmail.com',	'Hernandez','Oliver',			'Fanatique de l''anime en quête d''un compagnon de visionnage.'),
('M',	TRUE,	FALSE,	FALSE,	'1993-01-30',	'pass2encrypt!!',	'AnimeAddict13',	'animeddict13@geekmail.com',	'Wilson',	'Daniel',			'Amateur de mangas et d''anime en quête d''une partenaire de cosplay.'),
('M',	TRUE,	FALSE,	FALSE,	'1988-07-05',	'pass2encrypt!!',	'CosmicExplorer25',	'cosmixplorer25@yahoo.com',		'Morales',	'Noah',				'Explorateur cosmique en quête de compagnon pour des voyages interstellaires.'),
('M',	TRUE,	FALSE,	FALSE,	'1992-06-14',	'pass2encrypt!!',	'GameWizard32',		'gamewizard32@gmail.com',		'Cruz',		'Liam',				 NULL),
('M',	TRUE,	FALSE,	FALSE,	'1996-03-12',	'pass2encrypt!!',	'VRHero5',			'vrhero5@hotmail.com',			'Ward',		'Ethan',			'Héros virtuel en quête d''un co-héros pour des exploits en réalité augmentée.'),
('M',	TRUE,	FALSE,	FALSE,	'1995-01-15',	'pass2encrypt!!',	'GeekyGamer42',		'geekygamer42@gmail.com',		'Doe',		'John',				'Nouvel utilisateur à la recherche de nouvelles amitiés geek.'),
('M',	TRUE,	FALSE,	FALSE,	'1988-08-03',	'pass2encrypt!!',	'CosmicExplorer',	'cosmicr@geekmail.com',			'Martinez',	'Lucas',			'Explorateur cosmique à la recherche d''une co-pilote pour des voyages interstellaires et des découvertes extraterrestres.'),
('M',	TRUE,	FALSE,	FALSE,	'1985-07-22',	'pass2encrypt!!',	'CaptainCosplay',	'captainsplay@example.com',		'Jones',	'Tom',				'Cosplayeur acharné en quête de sa cosplayeuse parfaite pour créer des costumes époustouflants et participer à des conventions.'),

('M',	TRUE,	TRUE,	FALSE,	'1990-09-05',	'pass2encrypt!!',	'GameMasterX',		'ggfm@geekmail.com',			'Smith',	'James',			'Créateur de jeux vidéo à la recherche d''un joueur passionné pour tester ses créations et former un duo gagnant.'),
('M',	TRUE,	TRUE,	FALSE,	'1988-03-10',	'pass2encrypt!!',	'SciFiFanatic',		'scififanatic@yahoo.com',		'Johnson',	'Michael',			'Amateur de jeux de rôle en quête d''aventures fantastiques.'),
('M',	TRUE,	TRUE,	FALSE,	'1988-04-01',	'pass2encrypt!!',	'PixelPioneer',		'pionr@geekmail.com',			'Wu',		'Liam',				'Explorateur de pixels à la recherche d''un artiste pour créer des chefs-d''œuvre en 8 bits.'),
('M',	TRUE,	TRUE,	FALSE,	'1984-03-30',	'pass2encrypt!!',	'TimeTraveler',		'timetrr@geekmail.com',			'Williams',	'William',			'Voyageur temporel cherchant une compagne pour explorer le passé et le futur à bord de sa machine à remonter le temps.'),
('M',	TRUE,	TRUE,	FALSE,	'1985-06-18',	'pass2encrypt!!',	'TrekkerTom',		'trekker@geekmail.com',			'Anderson',	'Tom',				'Explorateur interstellaire en quête d''une co-pilote pour des voyages aux confins de la galaxie.'),

('M',	FALSE,	TRUE,	TRUE,	'1992-07-08',	'pass2encrypt!!',	'CodeCrusader72',	'codecrusader72@gmail.com',		'Roberts',	'Liam',				'Chevalier du code cherchant une codeuse talentueuse pour résoudre des énigmes algorithmiques.'),
('M',	FALSE,	TRUE,	TRUE,	'1991-06-03',	'pass2encrypt!!',	'D20Dreamer52',		'd20dreamer52@geekmail.com',	'Yamamoto',	'Lucas',			'Joueur de rôle passionné en quête de coéquipiers pour des aventures légendaires et des lancers de dés épiques.'),
('M',	FALSE,	TRUE,	TRUE,	'1984-03-30',	'pass2encrypt!!',	'TimeTraveler84',	'timetraveler84@gmail.com',		'Williams',	'William',			'Voyageur temporel cherchant une compagne pour explorer le passé et le futur à bord de sa machine à remonter le temps.'),
('M',	FALSE,	TRUE,	TRUE,	'1990-12-17',	'pass2encrypt!!',	'PixelPirate91',	'pixelpirate91@yahoo.com',		'Turner',	'Oliver',			'Pirate numérique en quête d''une première matelote pour piller des trésors virtuels et naviguer sur les mers électroniques.'),

('M',	TRUE,	FALSE,	TRUE,	'1996-03-12',	'pass2encrypt!!',	'VRHero88',			'vrhero88@hotmail.com',			'Ward',		'Ethan',			'Héros virtuel en quête d''un co-héros pour des exploits en réalité augmentée.'),
('M',	TRUE,	FALSE,	TRUE,	'1994-11-16',	'pass2encrypt!!',	'AnimeAdventurer9',	'animdventurer91@geekmail.com',	'Clark',	'Daniel',			'Aventurier anime en quête d''une partenaire pour des cosplay époustouflants et des marathons d''anime.'),

('M',	FALSE,	FALSE,	TRUE,	'1993-02-08',	'pass2encrypt!!',	'MysticMage7',		'mysticmage7@geekmail.com',		'Hernandez','Lucas',			'Sorcier mystique en quête d''une co-sorcière pour jeter des sorts en tandem.'),
('M',	FALSE,	FALSE,	TRUE,	'1986-07-17',	'pass2encrypt!!',	'VRValkyrie42',		'vrvalkyrie42@gmail.com',		'Gomez',	'Aiden',			'Guerrière virtuelle en quête d''un guerrier pour des batailles en réalité virtuelle.'),

('M',	TRUE,	TRUE,	TRUE,	'1995-10-05',	'pass2encrypt!!',	'Xav',				'Xav@geek.fr',					'XXXXXXX',	'XXXXXX',			NULL),
('M',	TRUE,	TRUE,	TRUE,	'1994-10-05',	'pass2encrypt!!',	'Sherpa',			'sherpa@geek.fr',				'Sher',		'Pas',				NULL),
('M',	TRUE,	TRUE,	TRUE,	'1988-07-31',	'pass2encrypt!!',	'WizGeek',			'wizard@geekmail.com',			'Smith',	'Harry',			'Étudiant en magie et passionné de jeux de rôle, à la recherche d''une sorcière ou d''un sorcier pour partager des potions magiques et des aventures épiques.'),
('M',	TRUE,	TRUE,	TRUE,	'1993-06-25',	'pass2encrypt!!',	'PixelWizard',		'pixelwizard@geekmail.com',		'Brown',	'David',			'Artiste numérique passionné par les mondes virtuels.'),

('NB',	FALSE,	FALSE,	TRUE,	'1987-08-07',	'pass2encrypt!!',	'Greg',				'Greg@geek.fr',					'XXXXXXX',	'XXXXXX',			'À la recherche de quelqu''un avec qui créer notre propre histoire d''amour, inspirée par les jeux de rôle et les univers geek.'),
('NB',	FALSE,	FALSE,	TRUE,	'1986-10-20',	'pass2encrypt!!',	'RoboticsRuler',	'roboter@geekmail.com',			'Baker',	'Ella',				'Ingénieure robotique cherchant un collègue pour concevoir des robots qui changeront le monde.'),
('NB',	FALSE,	FALSE,	TRUE,	'2002-10-05',	'pass2encrypt!!',	'Val',				'val@geek.fr',					'Gigiro',	'valentin',			NULL),
('NB',	FALSE,	FALSE,	TRUE,	'1978-10-05',	'pass2encrypt!!',	'Camixxx',			'schrouphete66@geek.fr',		'Koutcher',	'Camille',			NULL),

('NB',	FALSE,	TRUE,	FALSE,	'1985-05-27',	'pass2encrypt!!',	'StarshipCapain1',	'starshipcaain12@yahoo.com',	'Taylor',	'Benjamin',			'Capitaine de vaisseau spatial cherchant une co-capitaine intrépide.'),
('NB',	FALSE,	TRUE,	FALSE,	'1996-02-25',	'pass2encrypt!!',	'SwordSorcerer9',	'swordsorcerer9@gmail.com',		'Carter',	'Liam',				'Sorcier de l''épée cherchant des duels légendaires et des quêtes épiques.'),

('NB',	TRUE,	FALSE,	TRUE,	'1989-09-07',	'pass2encrypt!!',	'AnimeMaster59',	'animemaster59@geekmail.com',	'King',		'Mia',				'Maître de l''anime en quête d''un disciple pour des aventures époustouflantes.'),
('NB',	TRUE,	FALSE,	TRUE,	'2000-10-05',	'pass2encrypt!!',	'Itadori',			'Itadori@geek.fr',				'Nimea',	'Robert',			NULL),
('NB',	TRUE,	FALSE,	TRUE,	'1994-07-12',	'pass2encrypt!!',	'GameGoddess63',	'gamegoddess63@geekmail.com',	'Davis',	'Benjamin',			'Déesse des jeux vidéo cherchant un dieu pour régner sur les royaumes virtuels.'),

('NB',	TRUE,	FALSE,	FALSE,	'2001-08-20',	'pass2encrypt!!',	'Kistof',			'Kistof@geek.fr',				'XXXXXXX',	'XXXXXX',			'Que diriez-vous de partager des pizzas, des comics et des câlins devant la console ? Si cela vous tente, discutons !'),
('NB',	TRUE,	FALSE,	FALSE,	'2001-08-20',	'pass2encrypt!!',	'Trinity',			'Trinity@geek.fr',				'XXXXXXX',	'XXXXXX',			NULL),

('NB',	TRUE,	TRUE,	TRUE,	'1978-10-05',	'pass2encrypt!!',	'Manu',				'manu@geek.fr',					'Subaru',	'Emmanuel',			NULL),
('NB',	TRUE,	TRUE,	TRUE,	'1994-10-25',	'pass2encrypt!!',	'AnimeAddict',		'anime@geekmail.com',			'Yamamoto',	'Ryu',				'Amateur de mangas et d''anime, à la recherche d''une âme sœur pour des soirées cosplay et des marathons d''épisodes.'),
('NB',	TRUE,	TRUE,	TRUE,	'2001-08-20',	'pass2encrypt!!',	'smith',			'smith@geek.fr',				'Smith',	'XXXXXXX',			'Amoureux de la technologie et des récits de science-fiction, je cherche un compagnon de voyage pour explorer l''univers infini de l''amour geek.'),
('NB',	TRUE,	TRUE,	TRUE,	'1997-02-18',	'pass2encrypt!!',	'TechieTina55',		'techietina55@geekmail.com',	'Robinson',	'Emma',				 NULL);




/***************************	MESSAGES	***********************************/



insert into messages(sender_id, target_id, content)
values
(1, 2, 'kikou'),
(2, 1, 'Salut'),
(10, 2, 'Awefa ghsfghsf gdjghjdgh'),
/*
(33, 30, 'Awfghdfg hdfghdfghhjdgh'),
(22, 54, 'Awejfghjfghj fghjfghjghghjdgh'),
(52, 45, 'Ahhjdgh'),
(55, 1, 'Awhdghjjghjdgh'),
(4, 2, 'jghjgjf gdjghjdgh'),
(4, 3, 'jjjh'),
(1, 7, 'Ajghdjdgh'),
(21, 5, 'Aweftertgh'),
*/
(10, 26, 'hdfgh dfghdfghdfghAwefa ghsfghsf gdjghjdgh');






/***************************	LIKES	***************************************/




insert into likes(sender_id, target_id)
values
(1, 2),
(2, 1),
(10, 2),
(2, 10),
(33, 30),
(30, 33),
(22, 54),
(54, 22),
(52, 45),
(45, 54),
(55, 1),
(1, 55),
(4, 2),
(2, 4),
(4, 3),
(3, 4),
(1, 7),
(7, 1),
(21, 5),
(5, 21),
(10, 55),
(55, 10),
(1, 5),
(1, 10),
(1, 22),
(1, 33),
(1, 55),
(2, 22),
(2, 66),
(2, 11),
(2, 12),
(2, 33),
(2, 26);







/***************************	TAGS	***************************************/

insert into tags(category, name)
values
('Gaming',	'LoL'),
('Gaming',	'CoC'),
('Gaming',	'WoW'),
('Gaming',	'Zelda'),
('Gaming',	'Mario'),
('Gaming',	'Fortnite'),
('Gaming',	'Minecraft'),
('Gaming',	'Consoles Nitendo'),
('Gaming',	'Consoles Playstation'),
('Gaming',	'Consoles Xbox'),
('Gaming',	'Jeux PC'),
('Gaming',	'Atari'),
('Gaming',	'VR'),
('Jeux de societe',		'Loup Garou'),
('Jeux de societe',		'Blanc Manger Coco'),
('Jeux de societe',		'Wanted'),
('Jeux de societe',		'La bonne paye'),
('Jeux de societe',		'Monopoly'),
('Jeux de societe',		'Poker des cafards'),
('Jeux de societe',		'Captain Sonar'),
('Jeux de societe',		'Dixit'),
('Jeux de societe',		'Terraforming Mars'),
('Jeux de societe',		'SubTerra'),
('Jeux de societe',		'Magic'),
('Jeux de societe',		'D&D'),
('TV',		'Mangas'),
('TV',		'Netflix'),
('TV',		'Amazon Prime'),
('TV',		'Disney Plus'),
('TV',		'DCU'),
('TV',		'MCU'),
('TV',		'Star Wars'),
('TV',		'Star Trek'),
('TV',		'Doctror Who'),
('TV',		'Harry Potter'),
('Bectance',	'Pizza'),
('Bectance',	'Pates au Ketchup'),
('Bectance',	'Kebab'),
('Bectance',	'Taccos'),
('Divers',		'Android'),
('Divers',		'Apple'),
('Divers',		'Cosplay'),
('Divers',		'Escape Games'),
('Divers',		'BD');
('Divers',		'K-Pop');





/***************************	TAGS_USERS	***************************************/



insert into tags_users(tag_id, user_id)
values
(10, 22),
(11, 1),
(3,  21),
(40, 23),
(10, 32),
(1,  42),
(3,  52),
(5,  62),
(1,  27),
(31, 22),
(1,  22),
(21, 22),
(31, 21),
(11, 12),
(12, 13),
(1,  14),
(14, 32),
(8,  31),
(18, 30);

