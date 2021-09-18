import Category from "../models/Category";
import Template from "../models/Template";

export const createCategory = async (req, res) => {
   const { name, description, authorId } = req.fields;
   const trimmedName = name.toLowerCase().replace(/\s/g, "-");

   const categoryFound = await Category.findOne({ name: trimmedName });
   if (categoryFound) return res.json({ warning: "Esta categoria ya existe" });

   const categoryCreated = await new Category({
      name: trimmedName,
      description: description,
      createdBy: authorId
   }).save();

   res.json(categoryCreated)
}

export const getCategories = async (req, res) => {
   const categoriesFound = await Category.find();
   res.json(categoriesFound);
}

export const getCategoryByName = async (req, res) => {
   const categoryName = req.params.categoryName;

   const categoryFound = await Category.findOne({ name: categoryName });
   if (!categoryFound) return res.json({ warning: "Esta categoria no existe" });

   res.json(categoryFound);
}

export const updateCategoryByName = async (req, res) => {
   const categoryName = req.params.categoryName;
   const { name, description, authorId } = req.fields;
   const trimmedName = name.toLowerCase().replace(/\s/g, "-");

   const categoryExists = await Category.findOne({ name: trimmedName });
   if (categoryExists) return res.json({ warning: "Esta categoria ya existe" });

   const categoryUpdated = await Category.findOneAndUpdate(
      { name: categoryName },
      {
         name: trimmedName,
         description: description,
         updatedBy: authorId
      },
      {
         new: true
      }
   )

   // UPDATES ALL TEMPLATES OF THIS CATEGORY
   await Template.updateMany({ category: categoryName }, { category: trimmedName });

   res.json(categoryUpdated);
}

export const deleteCategoryByName = async (req, res) => {
   const categoryName = req.params.categoryName;

   const categoryExists = await Category.findOne({ name: categoryName });
   if (!categoryExists) return res.json({ warning: "Esta categoria ya no existe" });

   const categoryDeleted = await Category.findOneAndDelete({ name: categoryName });

   // DELETES ALL TEMPLATES OF THIS CATEGORY
   await Template.deleteMany({ category: categoryName });

   res.json(categoryDeleted);
}



