import { Router } from "express";
import * as categoriesController from "../controllers/categories.controller";
import * as templatesController from "../controllers/templates.controller";

const router = Router();

// CATEGORIES
router.get('/', categoriesController.getCategories);
router.post('/', categoriesController.createCategory);
router.get('/:categoryId', categoriesController.getCategoryById);
router.put('/:categoryId', categoriesController.updateCategoryById);
router.delete('/:categoryId', categoriesController.deleteCategoryById);

// TEMPLATES
router.get('/:categoryId/templates', templatesController.getTemplates);
router.post('/:categoryId/templates', templatesController.createTemplate);
router.put('/:categoryId/templates/:templateId', templatesController.updateTemplateById);
router.delete('/:categoryId/templates/:templateId', templatesController.deleteTemplateById);

export default router;