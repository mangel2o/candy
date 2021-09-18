import Template from "../models/Template";
import Category from "../models/Category";
import fs from "fs";
import path from "path";

export const createTemplate = async (req, res) => {
   const categoryName = req.params.categoryName;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.example;

   const trimmedName = name.toLowerCase().replace(/\s/g, "-");
   const examplePath = path.join(process.cwd(), "uploads", "templates", trimmedName + ".pdf");

   const templateExists = await Template.findOne({ name: trimmedName });
   if (templateExists) return res.json({ warning: "Este documento ya existe" });

   const templateCreated = await new Template({
      name: trimmedName,
      description: description,
      category: categoryName,
      examplePath: examplePath,
      createdBy: authorId,
   }).save();

   fs.writeFileSync(examplePath, fs.readFileSync(tempFile.path));
   fs.unlinkSync(tempFile.path);

   // Updates category by adding ID of new template
   await Category.findOneAndUpdate(
      { name: categoryName },
      {
         $push: {
            templates: templateCreated._id
         }
      }
   );

   //file: fs.readFileSync(examplePath)
   res.json(templateCreated);
}


export const getTemplates = async (req, res) => {
   const categoryName = req.params.categoryName;
   const templatesFound = await Template.find({ category: categoryName });

   let templatesComputed = [];
   for (let i = 0; i < templatesFound.length; i++) {
      templatesComputed.push({ ...templatesFound[i]._doc, example: fs.readFileSync(templatesFound[i]._doc.examplePath) });
   }

   res.json(templatesComputed);
}

export const updateTemplateById = async (req, res) => {
   const categoryName = req.params.categoryName;
   const templateId = req.params.templateId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.example;

   const trimmedName = name.toLowerCase().replace(/\s/g, "-");
   const examplePath = path.join(process.cwd(), "uploads", "templates", trimmedName + ".pdf");

   const templateExists = await Template.findOne({ name: trimmedName });
   if (templateExists) return res.json({ warning: "Este documento ya existe" });

   const templateUpdated = await Template.findOneAndUpdate(
      { _id: templateId },
      {
         name: trimmedName,
         description: description,
         category: categoryName,
         examplePath: examplePath,
         updatedBy: authorId
      },
      {
         new: true
      }
   )

   // Deletes previous file
   fs.unlinkSync(templateExists.examplePath);

   // Creates new file
   fs.writeFileSync(examplePath, fs.readFileSync(tempFile.path));

   // Deletes temporal file
   fs.unlinkSync(tempFile.path);

   res.json(templateUpdated);
}

export const deleteTemplateById = async (req, res) => {
   const categoryName = req.params.categoryName;
   const templateId = req.params.templateId;

   const templateExists = await Template.findOne({ _id: templateId });
   if (!templateExists) return res.json({ warning: "Este documento ya no existe" });

   const templateDeleted = await Template.findOneAndDelete({ _id: templateId });

   // Deletes existing file file
   fs.unlinkSync(templateExists.examplePath);

   // Updates category by deleting ID of deleted template
   await Category.findOneAndUpdate(
      { name: categoryName },
      {
         $pull: {
            templates: templateId
         }
      }
   )

   res.json(templateDeleted);
}



