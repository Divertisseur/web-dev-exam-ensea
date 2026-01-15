import { Router } from "express"
import {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes,
} from "../controllers/recipesController.js"

const router = Router()

router.get("/search", searchRecipes)
router.get("/", getRecipes)
router.get("/:id", getRecipeById)
router.post("/", createRecipe)
router.put("/:id", updateRecipe)
router.delete("/:id", deleteRecipe)

export default router
