import path from "path"
import { readRecipes, writeRecipes } from "../helpers/index.js"

const recipesPath = path.resolve("./data/recipes.json")

// ============================================
// GET ALL RECIPES
// ============================================
// Cette méthode est fournie comme EXEMPLE de référence
// Étudiez-la pour comprendre la structure générale

export const getRecipes = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)
		res.json(recipes)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ============================================
// GET ONE RECIPE BY ID
// ============================================
// TODO: Récupérer UNE recette spécifique par son ID
// 1. Lire toutes les recettes avec readRecipes(recipesPath)
// 2. Récupérer l'id depuis req.params.id
// 3. Chercher la recette avec Array.find() - attention: convertir l'id en nombre avec parseInt()
// 4. Si la recette est trouvée: renvoyer la recette avec res.json()
// 5. Si la recette n'existe pas: renvoyer une erreur 404 avec res.status(404).json()

export const getRecipeById = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)
		const id = parseInt(req.params.id)
		const recipe = recipes.find((r) => r.id === id)

		if (recipe) {
			res.json(recipe)
		} else {
			res.status(404).json({ message: "Recette non trouvée" })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ============================================
// CREATE A NEW RECIPE
// ============================================
// TODO: Créer une nouvelle recette
// 1. Lire toutes les recettes existantes
// 2. Créer un nouvel objet recette qui contient:
//    - id: utilisez Date.now() pour générer un ID unique
//    - toutes les propriétés de req.body (name, ingredients, instructions, prepTime, etc.)
//    Conseil: utilisez l'opérateur spread { id: Date.now(), ...req.body }
// 3. Ajouter la nouvelle recette au tableau de recettes (utilisez .push())
// 4. Sauvegarder le tableau modifié avec writeRecipes(recipesPath, recipes)
// 5. Renvoyer la recette créée avec le status 201 (Created)

export const createRecipe = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)
		const newRecipe = {
			id: Date.now(),
			...req.body,
		}

		recipes.push(newRecipe)
		writeRecipes(recipes, recipesPath)
		res.status(201).json(newRecipe)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ============================================
// UPDATE A RECIPE
// ============================================
// TODO: Mettre à jour une recette existante
// 1. Lire toutes les recettes
// 2. Récupérer l'id depuis req.params.id et le convertir en nombre
// 3. Trouver l'INDEX de la recette avec Array.findIndex()
// 4. Si l'index est -1 (recette non trouvée): renvoyer une erreur 404
// 5. Mettre à jour la recette à cet index en fusionnant les données:
//    recipes[index] = { ...recipes[index], ...req.body, id: parseInt(id) }
//    Note: on garde l'id original, on ne le modifie pas
// 6. Sauvegarder les modifications avec writeRecipes()
// 7. Renvoyer la recette mise à jour

export const updateRecipe = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)
		const id = parseInt(req.params.id)
		const index = recipes.findIndex((r) => r.id === id)

		if (index === -1) {
			return res.status(404).json({ message: "Recette non trouvée" })
		}

		const updatedRecipe = {
			...recipes[index],
			...req.body,
			id: id,
		}

		recipes[index] = updatedRecipe
		writeRecipes(recipes, recipesPath)
		res.json(updatedRecipe)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ============================================
// DELETE A RECIPE
// ============================================
// TODO: Supprimer une recette
// 1. Lire toutes les recettes
// 2. Récupérer et convertir l'id depuis req.params.id
// 3. Trouver l'index de la recette à supprimer avec findIndex()
// 4. Si la recette n'existe pas (index === -1): renvoyer une erreur 404
// 5. Créer un nouveau tableau SANS cette recette (utilisez Array.filter())
// 6. Sauvegarder le nouveau tableau avec writeRecipes()
// 7. Renvoyer un message de confirmation avec status 200
//    Exemple: { message: "Recette supprimée avec succès" }

export const deleteRecipe = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)
		const id = parseInt(req.params.id)
		const index = recipes.findIndex((r) => r.id === id)

		if (index === -1) {
			return res.status(404).json({ message: "Recette non trouvée" })
		}

		const newRecipes = recipes.filter((r) => r.id !== id)
		writeRecipes(newRecipes, recipesPath)
		res.status(200).json({ message: "Recette supprimée avec succès" })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ============================================
// BONUS (Optionnel - pour aller plus loin)
// ============================================
// TODO: Rechercher des recettes par nom
// Cette fonction permet de filtrer les recettes dont le nom contient un terme de recherche
// 1. Lire toutes les recettes
// 2. Récupérer le terme de recherche depuis req.query.search
// 3. Si aucun terme de recherche: renvoyer toutes les recettes
// 4. Sinon: filtrer les recettes avec Array.filter() et includes()
//    Conseil: utilisez .toLowerCase() pour une recherche insensible à la casse
// 5. Renvoyer les recettes filtrées

export const searchRecipes = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)
		const { search } = req.query

		if (!search) {
			return res.json(recipes)
		}

		const lowerSearch = search.toLowerCase()
		const filteredRecipes = recipes.filter((r) =>
			r.name.toLowerCase().includes(lowerSearch)
		)
		res.json(filteredRecipes)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
