CREATE TABLE IF NOT EXISTS recipes(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	creator_id INTEGER,
	category INTEGER,
	recipeName TEXT NOT NULL,
	estimated_time INTEGER,
	ingredients TEXT NOT NULL,
	instructions TEXT NOT NULL,
	FOREIGN KEY (creator_id) REFERENCES Users(id),
	FOREIGN KEY (category) REFERENCES Categories(id)
);

CREATE TABLE IF NOT EXISTS categories(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	categoryName TEXT NOT NULL
);

INSERT INTO categories(categoryName)
	VALUES
	('Appetizer'),
	('Breakfast'),
	('Dessert'),
	('Dinner'),
	('Drink'),
	('Lunch'),
	('Salad'),
	('Sandwich'),
	('Side'),
	('Snack'),
	('Soup');

CREATE UNIQUE INDEX IF NOT EXISTS idx_recipeName ON recipes(id, recipeName, category);

CREATE TABLE IF NOT EXISTS users(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT NOT NULL,
	pword TEXT NOT NULL,
	email TEXT NOT NULL
);

INSERT INTO users(username, pword, email)
	VALUES
	('test', 'test', 'test@test.com');

CREATE TABLE IF NOT EXISTS ratings(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	recipe_id INTEGER,
	user_id INTEGER,
	rating INTEGER,
	FOREIGN KEY (recipe_id) REFERENCES Recipes(id),
	FOREIGN KEY (user_id) REFERENCES Users(id)
);