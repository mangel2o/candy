import Mongoose from "mongoose";
import Template from "../models/Template.js";
import Category from "../models/Category.js";
import fs from "fs";
import path from "path";
import Document from "../models/Document.js";

/**
 * * Creates a new template
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createTemplate = async (req, res) => {
   // * Initializes values
   const categoryId = req.params.categoryId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.example;

   // * Checks if the category exists
   const categoryExist = await Category.findById(categoryId);
   if (!categoryExist) return res.json({ warning: "Esta categoría no existe" });

   // * Creates a new template
   const newId = new Mongoose.Types.ObjectId();
   const templateCreated = await new Template({
      _id: newId,
      name: name,
      description: description,
      category: categoryId,
      examplePath: path.join(process.cwd(), "uploads", "templates", newId + ".pdf"),
      createdBy: authorId,
   }).save();

   // * Adds the new template id to the category
   await Category.findByIdAndUpdate(categoryId, { $push: { templates: templateCreated._id } },);

   // * Creates the file in the current working directory
   fs.writeFileSync(templateCreated.examplePath, fs.readFileSync(tempFile.path));
   fs.unlinkSync(tempFile.path);

   // * Sends the created template as response
   res.json(templateCreated);
}

/**
 * * Gets all existing templates
 * @param {*} req 
 * @param {*} res 
 */
export const getTemplates = async (req, res) => {
   // * Gets the parameters
   const categoryId = req.params.categoryId;

   // * Finds all templates from the respective category
   const templatesFound = await Template.find({ category: categoryId });

   // * Creates a new array of templates with the data of the corresponding filepaths
   let templatesComputed = [];
   for (let i = 0; i < templatesFound.length; i++) {
      templatesComputed.push({ ...templatesFound[i]._doc, example: fs.readFileSync(templatesFound[i]._doc.examplePath) });
   }

   // * Sends the templates as response
   res.json(templatesComputed);
}

/**
 * * Updates template by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const updateTemplateById = async (req, res) => {
   // * Initializes values
   const categoryId = req.params.categoryId;
   const templateId = req.params.templateId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.example;

   // * Checks if the category exists
   const categoryExist = await Category.findById(categoryId);
   if (!categoryExist) return res.json({ error: "Esta categoria ya no existe" });

   // * Check if the template exists, if not then delete the temporal file
   const templateExist = await Template.findById(templateId);
   if (!templateExist) {
      if (tempFile) {
         fs.unlinkSync(tempFile.path);
      }
      return res.json({ error: "Este documento ya no existe" });
   }

   // * Updates the template with new values
   const templateUpdated = await Template.findByIdAndUpdate(
      templateId,
      {
         name: name,
         description: description,
         updatedBy: authorId
      },
      { new: true }
   )

   // * If theres a temporal file, updates the file corresponding to this template
   if (tempFile) {
      // * Creates a new file
      fs.writeFileSync(templateUpdated.examplePath, fs.readFileSync(tempFile.path));

      // * Deletes the temporal file
      fs.unlinkSync(tempFile.path);
   }

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}

/**
 * * Deletes template by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const deleteTemplateById = async (req, res) => {
   // * Gets the parameters
   const categoryId = req.params.categoryId;
   const templateId = req.params.templateId;

   // * Checks if the category exists
   const categoryExist = await Category.findById(categoryId);
   if (!categoryExist) return res.json({ error: "Esta categoria ya no existe" });

   // * Checks if the template exists
   const templateExist = await Template.findById(templateId);
   if (!templateExist) return res.json({ error: "Este documento ya no existe" });

   // * Checks if there are no documents created with this template
   const documentsExist = await Document.findOne({ template: templateId });
   if (documentsExist) {
      return res.json({ error: "Este documento no se puede eliminar" });
   } else {
      // * Deletes the template
      const templateDeleted = await Template.findByIdAndDelete(templateId);

      // * Deletes the file
      fs.unlinkSync(templateDeleted.examplePath);

      // * Removes the template id from the corresponding category
      await Category.findByIdAndUpdate(categoryId, { $pull: { templates: templateId } });
   }

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}
