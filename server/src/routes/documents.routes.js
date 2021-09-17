import { Router } from "express";
import * as categoriesController from "../controllers/categories.controller";
import * as templatesController from "../controllers/templates.controller";

const router = Router();

// CATEGORIES
router.get('/', categoriesController.getCategories);
router.post('/', categoriesController.createCategory);
router.get('/:categoryName', categoriesController.getCategoryById);
router.put('/:categoryName', categoriesController.updateCategoryById);
router.delete('/:categoryName', categoriesController.deleteCategoryById);

// TEMPLATES
router.get('/:categoryName/templates', templatesController.getTemplates);
router.post('/:categoryName/templates', templatesController.createTemplate);
router.put('/:categoryName/templates/:templateId', templatesController.updateTemplateById);
router.delete('/:categoryName/templates/:templateId', templatesController.deleteTemplateById);

export default router;