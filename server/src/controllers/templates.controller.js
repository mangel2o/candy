import Template from "../models/Template";
import Category from "../models/Category";
import fs from "fs";
import path from "path";

export const createTemplate = async (req, res) => {
   const categoryName = req.params.categoryName;
   const { name, description, author } = req.fields;
   const tempFile = req.files.file;

   const trimmedName = name.toLowerCase().replace(/\s/g, "-");
   const examplePath = path.join(process.cwd(), "uploads", "templates", trimmedName + ".pdf");

   console.log(tempFile.path);

   const templateExists = await Template.findOne({ name: trimmedName });
   if (templateExists) return res.json({ warningTemplate: "Este documento ya existe" });

   const newTemplate = await new Template({
      name: trimmedName,
      description: description,
      category: categoryName,
      examplePath: examplePath,
      author: author,
   }).save();

   await Category.findOneAndUpdate(
      { name: categoryName },
      {
         $push: {
            templates: newTemplate._id
         }
      }
   )
   fs.writeFileSync(examplePath, fs.readFileSync(tempFile.path));
   fs.unlinkSync(tempFile.path);
   res.json({
      name: trimmedName,
      file: fs.readFileSync(examplePath)
   }
   );
}

export const getTemplates = async (req, res) => {
   const categoryName = req.params.categoryName;
   const templates = await Template.find({ category: categoryName });
   res.json(templates);
}

export const updateTemplateById = async (req, res) => {

}

export const deleteTemplateById = async (req, res) => {

}



