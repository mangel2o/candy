import Mongoose from "mongoose";
import Template from "../models/Template.js";
import Category from "../models/Category.js";
import fs from "fs";
import path from "path";
import Document from "../models/Document.js";
import createAction from "../libs/actionCreator.js";


export const createTemplate = async (req, res) => {
   // * Initializes values
   const categoryId = req.params.categoryId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.example;

   // * Checks if the category exists
   const categoryExist = await Category.findById(categoryId).lean();
   if (!categoryExist) return res.status(500).json("Esta categoría no existe");

   // * Creates a new template
   const newId = new Mongoose.Types.ObjectId();
   const templateCreated = await new Template({
      _id: newId,
      name: name,
      description: description,
      category: categoryId,
      examplePath: path.join(process.cwd(), "uploads", "templates", newId + ".pdf"),
      createdBy: authorId,
   }).save().then(template => template.populate('createdBy'));

   // * Adds the new template id to the category
   await Category.findByIdAndUpdate(categoryId, { $push: { templates: templateCreated._id } }).lean();

   // * Creates the file in the current working directory
   const templateComputed = { ...templateCreated._doc };
   templateComputed.example = fs.readFileSync(tempFile.path)
   fs.writeFileSync(templateCreated.examplePath, templateComputed.example);
   fs.unlinkSync(tempFile.path);

   // * Creates an action
   createAction("template", "create", "Creación de plantilla", JSON.stringify(templateCreated), authorId, {})

   // * Sends the created template as response
   res.json(templateComputed);
}


export const getTemplates = async (req, res) => {
   // * Gets the parameters
   const categoryId = req.params.categoryId;
   if (!Mongoose.Types.ObjectId.isValid(categoryId)) return res.status(500).json("Esta categoria no existe");

   // * Finds all templates from the respective category
   const templatesFound = await Template.find({ category: categoryId }).populate(["createdBy", "updatedBy"]).lean();

   // * Creates a new array of templates with the data of the corresponding filepaths
   const templatesComputed = [];
   for (let i = 0; i < templatesFound.length; i++) {
      templatesComputed.push({ ...templatesFound[i], example: fs.readFileSync(templatesFound[i].examplePath) });
   }

   // * Sends the templates as response
   res.json(templatesComputed);
}


export const updateTemplateById = async (req, res) => {
   // * Initializes values
   const categoryId = req.params.categoryId;
   const templateId = req.params.templateId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.example;

   // * Checks if the category exists
   const categoryExist = await Category.findById(categoryId).lean();
   if (!categoryExist) return res.status(500).json("Esta categoria ya no existe");

   // * Check if the template exists, if not then delete the temporal file
   const templateExist = await Template.findById(templateId).lean();
   if (!templateExist) {
      if (tempFile) {
         fs.unlinkSync(tempFile.path);
      }
      return res.status(500).json("Este documento ya no existe");
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
   ).populate(["createdBy", "updatedBy"]).lean();

   // * If theres a temporal file, updates the file corresponding to this template
   if (tempFile) {
      // * Creates a new file
      fs.writeFileSync(templateUpdated.examplePath, fs.readFileSync(tempFile.path));

      // * Deletes the temporal file
      fs.unlinkSync(tempFile.path);
   }

   // * Reads the archive file
   const templateComputed = { ...templateUpdated };
   templateComputed.example = fs.readFileSync(templateComputed.examplePath);

   // * Creates an action
   createAction("template", "update", "Actualización de plantilla", JSON.stringify(templateUpdated), authorId, {})

   // * Sends a success response
   res.json(templateComputed);
}


export const deleteTemplateById = async (req, res) => {
   // * Gets the parameters
   const categoryId = req.params.categoryId;
   const templateId = req.params.templateId;
   const { authorId } = req.fields;

   // * Checks if the category exists
   const categoryExist = await Category.findById(categoryId).lean();
   if (!categoryExist) return res.json({ error: "Esta categoria ya no existe" });

   // * Checks if the template exists
   const templateExist = await Template.findById(templateId).lean();
   if (!templateExist) return res.json({ error: "Este documento ya no existe" });

   // * Checks if there are no documents created with this template
   const documentsExist = await Document.findOne({ template: templateId }).lean();
   if (documentsExist) {
      return res.json({ error: "Este documento no se puede eliminar" });
   } else {
      // * Deletes the template
      const templateDeleted = await Template.findByIdAndDelete(templateId).lean();

      // * Deletes the file
      fs.unlinkSync(templateDeleted.examplePath);

      // * Removes the template id from the corresponding category
      await Category.findByIdAndUpdate(categoryId, { $pull: { templates: templateId } }).lean();

      // * Creates an action
      createAction("template", "delete", "Eliminación de plantilla", JSON.stringify(templateDeleted), authorId, {})

      // * Sends a success response
      return res.json(templateDeleted);
   }
}
