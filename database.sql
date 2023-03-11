--Initial table creation
CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250),
	"date" VARCHAR (10),
  	"complete" BOOLEAN DEFAULT FALSE
);

--Sample item for table creation.
INSERT INTO "tasks" 
	("task", "date", "complete") 
VALUES 
	('Wash all the dishes', '8-9-2016', 'FALSE');

--Get the updated list of items from the database. (GET)
SELECT * FROM "tasks"
    ORDER BY "date" DESC;

--Insert items to the database using query parameterization. (POST)
INSERT INTO "tasks"
        ("task", "date", "complete")
        VALUES
        ($1, $2, $3);

--Modify an item in the database to be marked complete. using query parameterization (PUT)
UPDATE tasks SET "complete" = TRUE WHERE id=$1;

--Delete items from the database using query parameterization(DELETE)
DELETE FROM tasks WHERE id=$1;