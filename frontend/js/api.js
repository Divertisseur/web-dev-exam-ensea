// ============================================
// API.JS - SERVICE LAYER (DATA ACCESS)
// ============================================
// Ce fichier contient toutes les fonctions qui communiquent avec le backend
//
// IMPORTANT: Ce fichier ne touche JAMAIS au DOM
// Il retourne uniquement des données (ou des erreurs)
//
// Architecture:
// - api.js fait les appels fetch
// - main.js utilise ces fonctions et met à jour le DOM
// - ui.js génère le HTML

// ============================================
// CONFIGURATION DE L'API
// ============================================
const API_BASE_URL = "http://localhost:3000/api/recipes"

// ============================================
// GET ALL RECIPES
// ============================================
// Cette fonction est fournie comme EXEMPLE de référence
// Étudiez-la pour comprendre le pattern fetch avec async/await

/**
 * Récupère toutes les recettes depuis l'API
 * @returns {Promise<Array>} - Tableau de recettes
 */
export const getAllRecipes = async () => {
	try {
		// 1. Faire la requête HTTP GET
		const response = await fetch(API_BASE_URL)

		// 2. Vérifier que la requête a réussi
		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`)
		}

		// 3. Extraire les données JSON
		const recipes = await response.json()

		// 4. Retourner les données
		return recipes
	} catch (error) {
		console.error("Erreur lors de la récupération des recettes:", error)
		throw error // Propager l'erreur pour que main.js puisse la gérer
	}
}

// ============================================
// CREATE A NEW RECIPE
// ============================================
// TODO: Compléter cette fonction pour créer une nouvelle recette

/**
 * Crée une nouvelle recette via l'API
 * @param {Object} recipeData - Les données de la recette (name, ingredients, instructions, prepTime)
 * @returns {Promise<Object>} - La recette créée avec son ID
 */
export const createRecipe = async (recipeData) => {
	try {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(recipeData),
		}

		const response = await fetch(API_BASE_URL, options)

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`)
		}

		const newRecipe = await response.json()
		return newRecipe
	} catch (error) {
		console.error("Erreur lors de la création de la recette:", error)
		throw error
	}
}

export const getOneRecipe = async (recipeId) => {
	try {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
		const url = `${API_BASE_URL}/${recipeId}`

		const response = await fetch(url, options)

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`)
		}

		const recipe = await response.json()
		return recipe
	} catch (error) {
		console.error("Erreur lors de la récupération de la recette:", error)
		throw error
	}
}

export const deletOneRecipe = async (recipeId) => {
	try {
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}
		const url = `${API_BASE_URL}/${recipeId}`

		const response = await fetch(url, options)

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`)
		}

		const result = await response.json()
		return result
	} catch (error) {
		console.error("Erreur lors de la suppression de la recette:", error)
		throw error
	}
}
