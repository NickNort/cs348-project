import * as db from '../db.js';
import sequelize from '../orm.js';
import Recipe from '../models/recipe.js';

export const createRecipe = async (req, res) => {
	console.log("\n===createRecipe===\n");
	const t = await sequelize.transaction();
	try {
		// DEBUGGING:
		console.log(req.body);
		console.log("db in createRecipe: ", sequelize);

		await Recipe.create({
			recipeName: req.body.recipeName,
			category: req.body.category,
			estimated_time: req.body.estimatedTime,
			ingredients: req.body.ingredients,
			instructions: req.body.instructions
		}, { transaction: t });

		await t.commit();

		return res.send('Recipe created!');
	} catch (error) {
		console.log(error);
		await t.rollback();
		return res.send("An error occurred. Please try again.");
	}
};

export const getRecipes = (req, res) => {
	console.log("===getRecipes===");
	try {
		db.all('SELECT r.id as id, r.creator_id as creator_id, c.categoryName as category, r.recipeName as recipeName, r.estimated_time as estimated_time, r.ingredients as ingredients, r.instructions as instructions FROM recipes r JOIN categories c ON r.category = c.id').then((rows) => {
			return res.json(rows);
		});
	} catch (error) {
		console.log(error);
		return res.send("An error occurred. Please try again.");
	}
};

export const getRecipe = (req, res) => {
	console.log("===getRecipe===");
	try {
		db.all('SELECT r.id as id, r.creator_id as creator_id, c.categoryName as category, r.recipeName as recipeName, r.estimated_time as estimated_time, r.ingredients as ingredients, r.instructions as instructions FROM recipes r JOIN categories c ON r.category = c.id WHERE r.id = ?', [req.query.recipe_id]).then((rows) => {
			return res.json(rows);
		});
	} catch (error) {
		console.log(error);
		return res.send("An error occurred. Please try again.");
	}
}

export const getRecipesSimple = (req, res) => {
	console.log("===getRecipesSimple===");
	try {
		db.all('SELECT r.id as id, c.categoryName as categoryName, r.recipeName as recipeName FROM recipes r JOIN categories c ON r.category = c.id ORDER BY r.id ASC').then((rows) => {
			return res.json(rows);
		});
	} catch (error) {
		console.log(error);
		return res.send("An error occurred. Please try again.");
	}
}

export const getRecipeSimple = (req, res) => {
	console.log("===getRecipeSimple===");
	try {
		db.all('SELECT r.id as id, c.categoryName as categoryName, r.recipeName as recipeName FROM recipes r JOIN categories c ON r.category = c.id WHERE r.id = ?', [req.query.recipe_id]).then((rows) => {
			return res.json(rows);
		});
	} catch (error) {
		console.log(error);
		return res.send("An error occurred. Please try again.");
	}
}

export const getRecipesByCategory = (req, res) => {
	console.log("===getRecipesByCategory===");
	try {
		db.all('SELECT r.id as id, r.creator_id as creator_id, c.categoryName as categoryName, r.recipeName as recipeName, r.estimated_time as estimated_time, r.ingredients as ingredients, r.instructions as instructions FROM recipes r JOIN categories c ON r.category = c.id WHERE c.categoryName = ? ORDER BY r.id ASC', [req.query.category]).then((rows) => {
			return res.json(rows);
		});
	} catch (error) {
		console.log(error);
		return res.send("An error occurred. Please try again.");
	}
}

export const getRecipesByCategorySimple = (req, res) => {
	console.log("===getRecipesByCategorySimple===");
	try {
		db.all('SELECT r.id as id, c.categoryName as categoryName, r.recipeName as recipeName FROM recipes r JOIN categories c ON r.category = c.id WHERE c.categoryName = ? ORDER BY r.id ASC', [req.query.category]).then((rows) => {
			return res.json(rows);
		});
	} catch (error) {
		console.log(error);
		return res.send("An error occurred. Please try again.");
	}
}

export const deleteRecipe = async (req, res) => {
	console.log("===deleteRecipe===");
	const t = await sequelize.transaction();
	try {
		await Recipe.destroy({
			where: { id: req.query.recipe_id },
			transaction: t
		});

		await t.commit();

		return res.send('Recipe deleted!');
	} catch (error) {
		console.log(error);
		await t.rollback();
		return res.send("An error occurred. Please try again.");
	}
};

export const updateRecipe = async (req, res) => {
	console.log("===updateRecipe===");
	const t = await sequelize.transaction();
	try {
		console.log(req.body);
		await Recipe.update({
			name: req.body.name,
			category: req.body.category,
			estimated_time: req.body.estimatedTime,
			ingredients: req.body.ingredients,
			instructions: req.body.instructions
		}, {
			where: { id: req.query.recipe_id },
			transaction: t
		});

		await t.commit();

		return res.send('Recipe updated!');
	} catch (error) {
		console.log(error);
		await t.rollback();
		return res.send("An error occurred. Please try again.");
	}
}