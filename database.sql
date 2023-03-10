--Initial table creation
CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"date" DATE NOT NULL,
  	"complete" BOOLEAN DEFAULT FALSE);

--Insert items to the database (POST)
INSERT INTO "tasks" 
	("task", "date", "complete") 
VALUES 
	('Wash all the dished', '8-9-2016', 'T');