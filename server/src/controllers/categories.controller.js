import Category from "../models/Category";
import Template from "../models/Template";
import fs from "fs";

export const createCategory = async (req, res) => {
   const { name, description, authorId } = req.fields;

   const categoryFound = await Category.findOne({ name: name });
   if (categoryFound) return res.json({ warning: "Esta categoria ya existe" });

   const categoryCreated = await new Category({
      name: name,
      uri: name.toLowerCase().replace(/\s/g, "-"),
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
   if (!categoryFound) return res.json({ warning: "Esta categoria no existe" });

   res.json(categoryFound);
}

export const updateCategoryById = async (req, res) => {
   const categoryUri = req.params.categoryId;
   const { name, description, authorId } = req.fields;

   const categoryExists = await Category.findOne({ name: name });
   if (categoryExists) return res.json({ warning: "Esta categoria ya existe" });

   const categoryUpdated = await Category.findOneAndUpdate(
      { uri: categoryUri },
      {
         name: name,
         uri: name.toLowerCase().replace(/\s/g, "-"),
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
   if (!categoryExists) return res.json({ warning: "Esta categoria ya no existe" });

   const categoryDeleted = await Category.findOneAndDelete({ uri: categoryUri });

   // Finds and deletes all template files corresponding to this category
   const templatesFound = await Template.find({ category: categoryUri });
   for (let i = 0; i < templatesFound.length; i++) {
      if (fs.existsSync(templatesFound[i].examplePath)) {
         fs.unlinkSync(templatesFound[i].examplePath);
      }
   }

   // Deletes all templates corresponding to this category
   await Template.deleteMany({ category: categoryUri });

   res.json(categoryDeleted);
}



