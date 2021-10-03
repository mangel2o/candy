import Mongoose from "mongoose";
import fs from "fs";
import Category from "../models/Category.js";
import Template from "../models/Template.js";
import Candidate from "../models/Candidate.js";
import { standardizeValue } from "../libs/utils.js";

/**
 * * Creates a new category
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createCategory = async (req, res) => {
   // * Initializes values
   const { name, description, authorId } = req.fields;
   const standardizedName = standardizeValue(name);

   // * Checks if category's name is in use
   const categoryExist = await Category.findOne({ name: standardizedName }).lean();
   if (categoryExist) return res.json({ error: "Esta categoria ya existe" });


   // * Creates a new category
   const categoryCreated = await new Category({
      name: standardizedName,
      description: description,
      createdBy: authorId
   }).save();

   // * Sends the new category as response
   res.json(categoryCreated)
}

/**
 * * Gets all existing categories
 * @param {*} req 
 * @param {*} res 
 */
export const getCategories = async (req, res) => {
   // * Finds all categories and sends them to the client
   const categoriesFound = await Category.find().lean();
   res.json(categoriesFound);
}

/**
 * * Gets category by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCategoryById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const categoryId = req.params.categoryId;
   if (!Mongoose.Types.ObjectId.isValid(categoryId)) return res.json({ error: "Esta categoria no existe" });

   // * Checks if the category exists
   const categoryExist = await Category.findById(categoryId).lean();
   if (!categoryExist) return res.json({ error: "Esta categoria no existe" });

   // * Sends the category as response
   res.json(categoryExist);
}

/**
 * * Updates category by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const updateCategoryById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const categoryId = req.params.categoryId;
   if (!Mongoose.Types.ObjectId.isValid(categoryId)) return res.json({ error: "Esta categoria no existe" });

   // * Gets values
   const { name, description, authorId, } = req.fields;

   // * Checks if the category exists
   const categoryExist = await Category.findById(categoryId).lean();
   if (!categoryExist) return res.json({ error: "Esta categoria ya no existe" });

   // * Checks if the new category's name isn't used already
   const standardizedName = standardizeValue(name);
   const categoryExistByName = await Category.findOne({ _id: { $ne: categoryId }, name: standardizedName }).lean();
   if (categoryExistByName) return res.json({ error: "Esta categoria ya existe" });

   // * Updates the existing category with the new values
   const categoryUpdated = await Category.findByIdAndUpdate(
      categoryId,
      {
         name: standardizedName,
         description: description,
         updatedBy: authorId
      },
      { new: true }
   ).lean();

   // * Sends the updated category as response
   res.json(categoryUpdated);
}

/**
 * * Deletes category by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const deleteCategoryById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const categoryId = req.params.categoryId;
   if (!Mongoose.Types.ObjectId.isValid(categoryId)) return res.json({ error: "Esta categoria no existe" });

   // * Checks if the category exists
   const categoryExist = await Category.findById(categoryId).lean();
   if (!categoryExist) return res.json({ error: "Esta categoria ya no existe" });

   // * If there are no candidates created with this category, then the category can be deleted
   const candidatesExist = await Candidate.findOne({ categories: { $in: categoryId } }).lean();
   if (candidatesExist) {
      return res.json({ error: "Esta categoria no se puede eliminar" });
   } else {
      // * Deletes the category
      await Category.findByIdAndDelete(categoryId).lean();

      // * Deletes the files corresponding to this category
      const templatesFound = await Template.find({ category: categoryId }).lean();
      for (const template of templatesFound) {
         fs.unlinkSync(template.examplePath);
      }

      // * Deletes all templates corresponding to this category
      await Template.deleteMany({ category: categoryId });
   }

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}

