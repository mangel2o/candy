import Template from "../models/Template.js";
import Category from "../models/Category.js";
import fs from "fs";
import path from "path";

export const createTemplate = async (req, res) => {
   const categoryUri = req.params.categoryId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.example;

   const standardizedName = standardizeValue(name);
   const templateCreated = await new Template({
      name: standardizedName,
      description: description,
      category: categoryUri,
      createdBy: authorId,
   });
   const examplePath = path.join(process.cwd(), "uploads", "templates", templateCreated._id + ".pdf");
   templateCreated.examplePath = examplePath;
   templateCreated.save();

   fs.writeFileSync(examplePath, fs.readFileSync(tempFile.path));
   fs.unlinkSync(tempFile.path);

   // Updates category by adding ID of new template
   await Category.findOneAndUpdate(
      { uri: categoryUri },
      {
         $push: {
            templates: templateCreated._id
         }
      },
      {
         new: true
      }
   );

   res.json(templateCreated);
}


export const getTemplates = async (req, res) => {
   const categoryUri = req.params.categoryId;
   const templatesFound = await Template.find({ category: categoryUri });

   // Creates a new array of templates with the data of the corresponding filepaths
   let templatesComputed = [];
   for (let i = 0; i < templatesFound.length; i++) {
      templatesComputed.push({ ...templatesFound[i]._doc, example: fs.readFileSync(templatesFound[i]._doc.examplePath) });
   }

   res.json(templatesComputed);
}

export const updateTemplateById = async (req, res) => {
   const templateId = req.params.templateId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.example;

   const templateExists = await Template.findById(templateId);
   if (!templateExists) {
      fs.unlinkSync(tempFile.path);
      return res.json({ error: "Este documento ya no existe" });
   }

   const standardizedName = standardizeValue(name);
   const examplePath = path.join(process.cwd(), "uploads", "templates", templateId + ".pdf");
   const templateUpdated = await Template.findByIdAndUpdate(
      templateId,
      {
         name: standardizedName,
         description: description,
         examplePath: examplePath,
         updatedBy: authorId
      },
      {
         new: true
      }
   )

   // Finds and deletes previous file
   fs.unlinkSync(templateExists.examplePath);

   // Creates new file
   fs.writeFileSync(examplePath, fs.readFileSync(tempFile.path));

   // Deletes temporal file
   fs.unlinkSync(tempFile.path);

   res.json(templateUpdated);
}

export const deleteTemplateById = async (req, res) => {
   const categoryUri = req.params.categoryId;
   const templateId = req.params.templateId;

   const templateExists = await Template.findById(templateId);
   if (!templateExists) return res.json({ error: "Este documento ya no existe" });

   // Deletes existing file
   /*
   * Uncomment if you want to delete file
   if (fs.existsSync(templateExists.examplePath)) {
      fs.unlinkSync(templateExists.examplePath);
   }
   */

   const templateDeleted = await Template.findByIdAndDelete(templateId);

   // Updates category by removing ID of deleted template
   await Category.findOneAndUpdate(
      { uri: categoryUri },
      {
         $pull: {
            templates: templateId
         }
      }
   )

   res.json(templateDeleted);
}

function standardizeValue(value) {
   return value[0].toString().toUpperCase() +
      value.toString().toLowerCase().substring(1).replace(/-/g, ' ');
}

