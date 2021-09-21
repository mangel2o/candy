import Template from "../models/Template";
import Category from "../models/Category";
import fs from "fs";
import path from "path";

export const createTemplate = async (req, res) => {
   const categoryUri = req.params.categoryId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.example;

   const templateCreated = await new Template({
      name: name,
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
   const something = await Category.findOneAndUpdate(
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

   console.log(something);

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

   const templateExists = await Template.findOne({ _id: templateId });
   if (!templateExists) {
      fs.unlinkSync(tempFile.path);
      return res.json({ warning: "Este documento ya no existe" });
   }

   const examplePath = path.join(process.cwd(), "uploads", "templates", templateExists._id + ".pdf");
   const templateUpdated = await Template.findOneAndUpdate(
      { _id: templateId },
      {
         name: name,
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

   const templateExists = await Template.findOne({ _id: templateId });
   if (!templateExists) return res.json({ warning: "Este documento ya no existe" });

   // Deletes existing file
   if (fs.existsSync(templateExists.examplePath)) {
      fs.unlinkSync(templateExists.examplePath);
   }

   const templateDeleted = await Template.findOneAndDelete({ _id: templateId });

   // Updates category by deleting ID of deleted template
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



