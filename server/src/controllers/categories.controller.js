import Category from "../models/Category.js";
import Template from "../models/Template.js";
import Candidate from "../models/Candidate.js";
import fs from "fs";

export const createCategory = async (req, res) => {
   const { name, description, authorId } = req.fields;

   const standardizedName = standardizeValue(name);
   const categoryFound = await Category.findOne({ name: standardizedName });
   if (categoryFound) return res.json({ error: "Esta categoria ya existe" });

   const categoryCreated = await new Category({
      name: standardizedName,
      uri: replaceSpacesWithHyphens(standardizedName),
      description: description,
      createdBy: authorId
   }).save();

   res.json(categoryCreated)
}

export const getCategories = async (req, res) => {
   const categoriesFound = await Category.find();
   res.json(categoriesFound);
}

export const getCategoryById = async (req, res) => {
   const categoryUri = req.params.categoryId;

   const categoryFound = await Category.findOne({ uri: categoryUri });
   if (!categoryFound) return res.json({ error: "Esta categoria no existe" });

   res.json(categoryFound);
}

export const updateCategoryById = async (req, res) => {
   const categoryUri = req.params.categoryId;
   const categoryExistsByUri = await Category.findOne({ uri: categoryUri });
   if (!categoryExistsByUri) return res.json({ error: "Esta categoria ya no existe" });

   const { name, description, authorId } = req.fields;
   const standardizedName = standardizeValue(name);

   const categoryExistsByName = await Category.findOne({ name: standardizedName });
   if (standardizeValue(categoryUri) !== standardizedName &&
      categoryExistsByName.name === standardizedName) return res.json({ error: "Esta categoria ya existe" });

   const categoryUpdated = await Category.findOneAndUpdate(
      { uri: categoryUri },
      {
         name: standardizedName,
         uri: standardizedName.toLowerCase().replace(/\s/g, "-"),
         description: description,
         updatedBy: authorId
      },
      {
         new: true
      }
   )

   // Updates all templates corresponding to this category
   await Template.updateMany({ category: categoryUri }, { category: categoryUpdated.uri });

   res.json(categoryUpdated);
}

export const deleteCategoryById = async (req, res) => {
   const categoryUri = req.params.categoryId;
   const categoryExists = await Category.findOne({ uri: categoryUri });
   if (!categoryExists) return res.json({ error: "Esta categoria ya no existe" });

   const categoryDeleted = await Category.findOneAndDelete({ uri: categoryUri });

   // Finds and deletes all template files corresponding to this category
   /*
   * Uncomment this if you want to delete the files
   const templatesFound = await Template.find({ category: categoryUri });
   for (let i = 0; i < templatesFound.length; i++) {
      if (fs.existsSync(templatesFound[i].examplePath)) {
         fs.unlinkSync(templatesFound[i].examplePath);
      }
   }
   */
   /*
   const candidatesWithCategoryExist = await Candidate.find({ name: categoryDeleted.name });
   if (candidatesWithCategoryExist) {

   }
*/
   // Deletes all templates corresponding to this category
   await Template.deleteMany({ category: categoryUri });

   /**
    * TODO: check if there are candidates using this category before deleting
    * * if there are candidates, then add this category to "deletedCategories" collection
    * * this will avoid creating categories with the same name
    */


   res.json(categoryDeleted);
}

function standardizeValue(value) {
   return value[0].toString().toUpperCase() +
      value.toString().toLowerCase().substring(1).replace(/-/g, ' ');
}

function replaceSpacesWithHyphens(value) {
   return value.toLowerCase().replace(/\s/g, "-");
}